import { createWaveform } from "./waveform/myWaveform";
import createAudio from "./myAudio.js"

function createContainers() {
    let playerContainer = document.createElement("div");
    let waveContainer = document.createElement("div");
    let infoAudioContainer = document.createElement("div");
    
    playerContainer.id = "player-container";
    waveContainer.id = "waveform-container";
    infoAudioContainer.id = "info-audio-container";

  //  playerContainer.className = "hide";

    document.querySelector("#app").appendChild(playerContainer);
    playerContainer.appendChild(waveContainer);
    playerContainer.appendChild(infoAudioContainer);
}


export default function createAudioPlayer() {
    const url = require("../../../assets/sons/main_d_oeuvre/interculturalite.wav");

    createContainers();
    createWaveform(url);
    createAudio(url);
}