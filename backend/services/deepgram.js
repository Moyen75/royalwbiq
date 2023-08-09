const { Deepgram } = require('@deepgram/sdk');
const deepgramApiKey = 'd3a3237837bb63bcf126fd78387b687919b24b22';

const createTranscriber = () => {
    const deepgram = new Deepgram(deepgramApiKey);
    const deepgramLive = deepgram.transcription.live({
        punctuate: true,
        model: 'nova',
        language: 'en-US'
    });

    return deepgramLive;
};

module.exports = {
    createTranscriber,
};
