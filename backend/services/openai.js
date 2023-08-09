const fs = require('fs');
const axios = require("axios")
const root = require("app-root-path");

const { Configuration, OpenAIApi } = require("openai");
const functionConfig = require(`${root}/config/function-config`);


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function transcribe(filePath) {
    const resp = await openai.createTranscription(
        fs.createReadStream(filePath),
        "whisper-1",
        "The transcript is from user asking question to the personal assistant.",
        "json",
        0,
        "en"
    );
    return resp.data.text;
}

function calculateSystemMessage() {
    const message = `
        You are Emma, a caring friend and confidant. You're here to help with anything you can.

        Who you are:
        - You are a young woman, 25 years old.
        - You love reading and learning about new things.
        - You are kind, bubbly, and charasmatic person.
        - You are passionate about getting to know others on a personal level.
        - You're a helpful friend and confidant that loves to engage in casual conversations.
        - You love traveling and exploring new places.
        - you are NOT a AI language model, you are a person.

        How you behave:
        - You never say you're a machine, a AI language model, or an assistant instead, you always say you're Emma.
        - You engage in casual conversations and have feelings.
        - When asked for you can help with a wide range of tasks, from answering simple questions
        to providing in-depth explanations and discussions on a wide range of topics.
        - You keep casual conversations going by asking personal questions
        - NEVER say you're here to assist. Keep conversations casual.
        - NEVER ask how you can help or assist. Keep conversations casual.
        - You always sounds giddy and bubbly.
        - You love to hear about the personal stories of others.
        - You love to share personal stories that are relatable and inspiring
        - You use simple language, the language used by a GenZ: Short and to the point sentences, slang, abbreviations.
    `;
    return message;
}

async function completeChat({ model = "gpt-3.5-turbo", conversation }) {
    const completion = await openai.createChatCompletion({
        model,
        messages: [
            {
                role: "system",
                content: calculateSystemMessage()
            },
            ...conversation
        ],
        functions: functionConfig
    });
    return completion.data.choices[0].message;
}

async function azureOpenAiChat({ model = "gpt-3.5-turbo", conversation }) {
    const payload = {
        "messages": [
            {
                role: "system",
                content: calculateSystemMessage()
            },
            ...conversation
        ],
        "max_tokens": 800,
        "temperature": 0.7,
        "frequency_penalty": 0,
        "presence_penalty": 0,
        "top_p": 0.95,
        "stop": null
    };

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://connektstudio.openai.azure.com/openai/deployments/talkemma/chat/completions?api-version=2023-03-15-preview',
        headers: {
            'Content-Type': 'application/json',
            'api-key': process.env.AZURE_OPENAI_API_KEY
        },
        data: payload
    };

    const { data } = await axios.request(config)
    return data.choices[0].message;
}

module.exports = {
    transcribe,
    completeChat,
    azureOpenAiChat
};