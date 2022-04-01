import { createWaveform } from "../waveform/myWaveform";
import { createAudio, createAudioEvent } from "../myAudio.js"
import { createButton, createListenEvent } from "./myPlayPauseButton.js";
import { createMetaData } from "./myAudioMetadata.js";

function  createContainers() {
    let   playerContainer = document.createElement("div");
    let   waveContainer = document.createElement("div");
    let   infoAudioContainer = document.createElement("div");
    
    playerContainer.id = "player-container";
    playerContainer.className = "fade-in";
    waveContainer.id = "waveform-container";
    infoAudioContainer.id = "info-audio-container";

    document.querySelector("#right-container").prepend(playerContainer);
    playerContainer.appendChild(waveContainer);
    playerContainer.appendChild(infoAudioContainer);
}

export function createAudioPlayer(content, color) {

    const audio = require(`../../../../assets/content/${content[Object.keys(content)[0]]}`);

    createContainers();
    createAudio(content, audio, Object.keys(content)[0]);
    createMetaData(Object.keys(content)[0])
    createButton();
    createWaveform(audio, Object.keys(content)[0], content);

    createAudioEvent(color);
    createListenEvent();
}