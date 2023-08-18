const root = require("app-root-path");
const { chat } = require(`${root}/services/chat`);
const { populateId } = require(`${root}/services/utilities`);
const mongoConnect = require(`${root}/services/mongo-connect`);
const mongo = require(`${root}/services/mongo-crud`);

let conversation = [];

const sessions = new Map();

const handleSocketConnection = async (socket) => {
    console.log('Client connected');
    // const { db } = await mongoConnect();
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


    socket.on('start', () => {
        return socket.emit('ready')
    })

    socket.on('text', async ({ text, type, userId }) => {
        const session = sessions.get(socket.sessionId);
        // Add the message to the session's messages array
        session.messages.push({ role: 'user', message: text });

        const response = await generateResponse(text, userId);
        socket.emit('response', response);

        session.messages.push(response);
        // save the session in the db
        // await mongo.updateOne(db, "sessions", { sessionId }, session);
    });
};


async function generateResponse(text, connectionId) {
    conversation.push({
        role: "user",
        content: text
    })

    let startTime = Date.now();
    const response = await chat({ conversation, model: "gpt-3.5-turbo-0613" });


    console.log('response: ', Date.now() - startTime);
    console.log('Response size', response?.content?.length)

    conversation.push(response);
    return response;
}

module.exports = {
    handleSocketConnection,
};
