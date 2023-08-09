const _ = require('lodash');
const root = require("app-root-path");
const sdk = require('microsoft-cognitiveservices-speech-sdk');
const blendShapeNames = require(`${root}/services/blendshapeNames`);

const createSSML = (text) => `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xml:lang="en-US">
<voice name="en-US-JennyNeural">
  <mstts:viseme type="FacialExpression"/>
  ${text}
</voice>
</speak>`;

const key = process.env.AZURE_KEY;
const region = process.env.AZURE_REGION;

const textToSpeech = async (text, type) => {
    return new Promise((resolve, reject) => {
        const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
        speechConfig.speechSynthesisOutputFormat = 5; // mp3
        let audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();

        let blendData = [];
        let timeStep = 1 / 60;
        let timeStamp = 0;

        const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

        if (type !== "audioOnly") {
            let blend = {};
            synthesizer.visemeReceived = function (s, e) {
                const animation = JSON.parse(e.animation);

                _.each(animation.BlendShapes, blendArray => {
                    _.each(blendShapeNames, (shapeName, i) => {
                        blend[shapeName] = blendArray[i];
                    });

                    blendData.push({
                        time: timeStamp,
                        blendshapes: { ...blend }
                    });
                    timeStamp += timeStep;
                });
            }
        }

        synthesizer.speakSsmlAsync(
            createSSML(text),
            async (result) => {
                synthesizer.close();
                let audioBuffer = new Uint8Array(result.audioData);
                resolve({ blendData, audioBuffer });
            },
            error => {
                synthesizer.close();
                reject(error);
            }
        );
    });
};

module.exports = { textToSpeech };
