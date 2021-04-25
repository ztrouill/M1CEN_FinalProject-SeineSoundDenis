import { createWaveform } from "./waveform/myWaveform";
import { createAudio } from "./myAudio.js"
import { getAllAudioData } from "./waveform/audioProcessing.js"

function  createContainers() {
    let   playerContainer = document.createElement("div");
    let   waveContainer = document.createElement("div");
    let   infoAudioContainer = document.createElement("div");
    
    playerContainer.id = "player-container";
    waveContainer.id = "waveform-container";
    infoAudioContainer.id = "info-audio-container";

  //  playerContainer.className = "hide";

    document.querySelector("#right-container").prepend(playerContainer);
    playerContainer.appendChild(waveContainer);
    playerContainer.appendChild(infoAudioContainer);
}


export function createAudioPlayer(content, color) {

    const audio = require(`/src/assets/content/${content[Object.keys(content)[0]]}`);
    const audioData = [];

    console.log(audio);


    createContainers();
    createAudio(audio, color, Object.keys(content)[0]);
    //getAllAudioData(content)
      //.then(() => {
    createWaveform(audio, Object.keys(content)[0]);
      //});

}