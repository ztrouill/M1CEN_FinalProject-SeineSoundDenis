import getAudioData from "./audioProcessing.js"
import { drawLine } from "./drawWave.js";

export function getCurrentTime(timestamp) {
  let el = document.querySelector("#current-time");
  let currentTime = document.querySelector("audio").currentTime;
  
  el.innerHTML = Math.round(currentTime);
  
  requestAnimationFrame(getCurrentTime);
}

function createCanvas(layer) {
    let canvas = document.createElement('canvas');
    canvas.id = `waveform-canvas-${layer}`;
    canvas.className = `waveform-canvas`;
    document.querySelector("#waveform-container").prepend(canvas);
    const dpr = window.devicePixelRatio || 1;

    canvas.width = canvas.offsetWidth * dpr * 2;
    canvas.height = canvas.offsetHeight * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.translate(0, (canvas.offsetHeight / 2)); // Ici enlever le /2 => Rend uniquement les valeurs positives == herbes ? Element de déco ?
}

export function createWaveform(url) {
    let audioData = null;
    let color = "#4BADB1";
    createCanvas("background"); // color 
    createCanvas("foreground"); // beige
    getAudioData(url)
            .then(response => {
                audioData = response;
                drawLine(audioData, "#EAE2DD", "foreground");
                drawLine(audioData, color, "background");
            });
}