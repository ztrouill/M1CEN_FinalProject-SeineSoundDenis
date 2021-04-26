import { getAudioData } from "./audioProcessing.js"
import { drawLinee, changeCurrentTime } from "./drawWave.js";

function createCanvas(layer) {
    let canvas = document.createElement('canvas');
    canvas.id = `waveform-canvas-${layer}`;
    canvas.className = `waveform-canvas`;
    document.querySelector("#waveform-container").prepend(canvas);
    const dpr = window.devicePixelRatio || 1;

    canvas.width = canvas.offsetWidth * dpr * 2;
    canvas.height = canvas.offsetHeight * dpr;
    const ctx = canvas.getContext("2d");
    ctx.translate(0, (canvas.height / 2)); // Ici enlever le /2 => Rend uniquement les valeurs positives == herbes ? Element de déco ?

    if (layer === "foreground")
      canvas.addEventListener("click", (e) => {
        if (!document.querySelector("audio").paused)
          changeCurrentTime(e.pageX); 
      });
}

export function createWaveform(file, name) {
   let audioData = JSON.parse(sessionStorage.getItem(name));
    createCanvas("foreground"); // beige
    getAudioData(file, name)
            .then(response => {
                audioData = response;
                drawLinee(audioData, "foreground", false);
            });
}