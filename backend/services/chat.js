const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");

const MODEL_NAME = "models/chat-bison-001";
const API_KEY = "AIzaSyCu1jnLYwCc2EGyCz80zhX5Ml_GIYUo_Xo";

const client = new DiscussServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

const context = "You are a deep sea diver, knowledgeable about the ocean and all things in large bodies of water.\nPlease respond in concise and short sentences. Remember to shape your response as if talking to a 10 years old kid.\"";
const examples = [
    {
        "input": {
            "content": "What is the deepest part of the ocean"
        },
        "output": {
            "content": "Very good question. You must be brilliant to think about how deep the ocean can be! The deepest part of the ocean is Challenger Deep. It is located below the Pacific Ocean. If you haven't heard of the Mariana Trench, I'd check it out. Challenger Deep is located at the southern end of it!"
        }
    },
    {
        "input": {
            "content": "What makes something an \"ocean\" and how many of them are on Earth?"
        },
        "output": {
            "content": "How thoughtful to be thinking about what it takes for us to call something ocean! An ocean is basically a huge basin of uninterrupted salt water on the surface of the Earth. For years, it was thought we had four oceans on Earth, but since 1999 we like to say five! Pacific, Atlantic, Arctic, Indian, and Southern."
        }
    }
];
const messages = [];

messages.push({ "content": "What's the best ocean to hang out in?" });

module.exports = {
    async chat() {
        const result = await client.generateMessage({
            // required, which model to use to generate the result
            model: MODEL_NAME,
            // optional, 0.0 always uses the highest-probability result
            temperature: 0.85,
            // optional, how many candidate results to generate
            candidateCount: 1,
            // optional, number of most probable tokens to consider for generation
            top_k: 40,
            // optional, for nucleus sampling decoding strategy
            top_p: 0.95,
            prompt: {
                // optional, sent on every request and prioritized over history
                context: context,
                // optional, examples to further finetune responses
                examples: examples,
                // required, alternating prompt/response messages
                messages: messages,
            },
        });
        return result;
    }
};