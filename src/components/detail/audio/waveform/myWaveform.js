import { getAudioData } from "./audioProcessing.js"
import { drawLinee, changeCurrentTime } from "./drawWave.js";

function createCanvas(layer) {
  let canvas = document.createElement('canvas');
  canvas.id = `waveform-canvas-${layer}`;
  canvas.className = `waveform-canvas`;
  document.querySelector("#waveform-container").prepend(canvas);

  canvas.width = canvas.offsetWidth * 2;
  canvas.height = canvas.offsetHeight;
  const ctx = canvas.getContext("2d");
  ctx.translate(0, (canvas.height / 2));

  if (layer === "foreground")
    canvas.addEventListener("click", (e) => {
      if (!document.querySelector("audio").paused)
        changeCurrentTime(e.pageX);
    });
}

export function createWaveform(file, name, content) {
  let audioData = JSON.parse(sessionStorage.getItem(name));
  createCanvas("foreground"); // beige
  getAudioData(file, name, content)
    .then(response => {
      audioData = response;
      drawLinee(audioData, "foreground", false);
      
      document.querySelector("#content-container")
    });
}