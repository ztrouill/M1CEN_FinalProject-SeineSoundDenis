import { letsDance } from "./waveform/drawWave.js"
import { getCurrentTime } from "./waveform/myWaveform.js"
/// Audio Element ///



function createAudioElement(url) {
    let audio = document.createElement("audio");

    audio.src = url;
    audio.id = "audio-container";
    audio.preload = "metadata";

    document.querySelector("#waveform-container").appendChild(audio);

    return audio;
}

/// Play/Pause Button ///

function switchIconButton(i, button) {
    const icons = ["play", "pause"];
    const ctaClass = `cta-audio-action far ${icons[i]}`;
   
    button.src = require(`/src/assets/${icons[i]}.svg`);
}

function createButton() {
    const button = document.createElement("img");
    
    switchIconButton(0, button);

    document.querySelector("#player-container").prepend(button);
    return button;
}

/// Audio Info ///

function createTime(){
    let time = {
        currentTime: document.createElement("span"),
        slash: document.createElement("span"),
        duration: document.createElement("span")
    };

    time.currentTime.id = "current-time";
    time.duration.id = "duration";
    time.slash.id = "time-slash";

    time.slash.innerHTML = "/";
  
    return time;
}

function createTitle(name) {
    let title = document.createElement("div");

    title.id = "title-sound-track";
    title.innerHTML = name;

    document.querySelector("#player-container").prepend(title);

    return title;
}

export function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);

    if (minutes <= 9)
        minutes = `0${parseInt(minutes)}`;

    if (seconds < 10)
        seconds = `0${parseInt(seconds)}`;

    return `${minutes}:${seconds}`
}

export function createAudio(url, color, title) {
    let audio = createAudioElement(url);
    let button = createButton();
    let time = createTime();
    createTitle(title);
    let audioInfoContainer = document.querySelector("#info-audio-container");
    let timeContainer = document.createElement("div");
    let reqAnim = null;

    timeContainer.id = "time-container";
    audio.setAttribute("track", 0)
    for (let i = 0; i < Object.values(time).length; i++)
        timeContainer.appendChild(Object.values(time)[i]);

    audioInfoContainer.appendChild(button);
    audioInfoContainer.appendChild(timeContainer);

    audio.addEventListener("loadedmetadata", function() {
        time.duration.innerHTML = formatTime(audio.duration.toFixed(2));
        time.currentTime.innerHTML = formatTime(audio.currentTime.toFixed(2));
    });

    button.addEventListener("click", function() {
        let reqTime = null;
        if (audio.paused) {
            audio.play();
            reqTime = requestAnimationFrame(getCurrentTime);
            reqAnim = letsDance(color, audio.getAttribute("track"));
        }
        else {
            audio.pause();
            time.currentTime.innerHTML = audio.currentTime;
        }
    });

    audio.addEventListener("play", () => {
        switchIconButton(1, button);
    });

    audio.addEventListener("pause", () => {
        switchIconButton(0, button);
    });
}