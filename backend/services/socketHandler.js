const root = require("app-root-path");
const { createTranscriber } = require((`${root}/services/deepgram`));
const { completeChat, azureOpenAiChat } = require(`${root}/services/openai`);
const { textToSpeech } = require(`${root}/services/azure`);
const { populateId } = require(`${root}/services/utilities`);
const mongoConnect = require(`${root}/services/mongo-connect`);
const mongo = require(`${root}/services/mongo-crud`);
const handleThirdPartyFunction = require(`${root}/services/third-party-apis`)

let conversation = [];

const sessions = new Map();

const handleSocketConnection = async (socket) => {
    console.log('Client connected');
    // const { db } = await mongoConnect();
    let deepgramLive = null
    const sessionId = populateId();
    const userId = socket.handshake.auth.userId;

    // Store session data in the map
    sessions.set(sessionId, {
        sessionId: sessionId,
        userId,
        messages: []
    });

    // Associate the session ID with the socket
    socket.sessionId = sessionId;

    const isTextOnly = socket.handshake.type === 'textOnly'
    if (!isTextOnly) {
        deepgramLive = createTranscriber();
    }
    let sendAudioInterval;

    socket.on('start', (payload) => {
        if (payload.type === 'textOnly') {
            return socket.emit('ready')
        }
        if (deepgramLive.getReadyState() === 1) {
            socket.emit('ready')
        } else {
            // Check ready state every 10 milliseconds until it's 1
            sendAudioInterval = setInterval(() => {
                if (deepgramLive.getReadyState() === 1) {
                    socket.emit('ready')
                    clearInterval(sendAudioInterval);
                }
            }, 10);
        }
    })

    socket.on('audio', (audioData) => {
        if (deepgramLive.getReadyState() === 1) {
            deepgramLive.send(audioData);
        }
    });

    socket.on('text', async ({ text, type, userId }) => {
        const session = sessions.get(socket.sessionId);
        // Add the message to the session's messages array
        session.messages.push({ role: 'user', message: text });

        const response = await generateResponse(text, userId);
        socket.emit('response', response);

        session.messages.push(response);
        if (type !== "textOnly") {
            let startTime = Date.now();
            const audio = await textToSpeech(response.content, type)
            console.log('Audio generated in: ', Date.now() - startTime);
            socket.emit('audio', audio);
        }
        // save the session in the db
        // await mongo.updateOne(db, "sessions", { sessionId }, session);
    });

    deepgramLive.addListener('transcriptReceived', (transcription) => {
        const received = JSON.parse(transcription);
        socket.emit('transcription', received?.channel?.alternatives[0]?.transcript);
    });

    deepgramLive.addListener('open', () => {
        console.log('Deepgram connection opened.');
    });

    deepgramLive.addListener('error', (error) => {
        console.log('Deepgram Error: ', error);
    });

    deepgramLive.addListener('close', () => {
        console.log('Deepgram connection closed.');
        clearInterval(sendAudioInterval); // Clear the interval if the connection closes
    });
};


async function generateResponse(text, connectionId) {
    conversation.push({
        role: "user",
        content: text
    })

    let startTime = Date.now();
    const response = await completeChat({ conversation, model: "gpt-3.5-turbo-0613" });

    if (response.function_call) {
        const args = JSON.parse(response.function_call.arguments);
        const apiResponse = await handleThirdPartyFunction(response.function_call.name, { ...args, connectionId })

        const newConversation = [...conversation, {
            "role": "function", "name": response.function_call.name, "content": JSON.stringify(apiResponse)
        }]
        const newResponse = await completeChat({ conversation: newConversation, model: "gpt-3.5-turbo-0613" });

        conversation.push(newResponse)
        return newResponse
    }

    console.log('Azure response: ', Date.now() - startTime);
    console.log('Response size', response?.content?.length)

    conversation.push(response);
    return response;
}

module.exports = {
    handleSocketConnection,
};
