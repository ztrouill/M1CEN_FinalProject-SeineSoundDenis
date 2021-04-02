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
    const icons = ["fa-play-circle", "fa-pause-circle"];
    const ctaClass = `cta-audio-action far ${icons[i]}`;
   
    button.className = ctaClass;
}

function createButton() {
    const button = document.createElement("i");
    
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

function createTitle() {
    let title = document.createElement("div");

    title.id = "title-sound-track";
    title.innerHTML = "Jean Eudes nous présente la Basilique";

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

export function createAudio(url) {
    let audio = createAudioElement(url);
    let button = createButton();
    let time = createTime();
    let title = createTitle();
    let audioInfoContainer = document.querySelector("#info-audio-container");
    let timeContainer = document.createElement("div");
    
    timeContainer.id = "time-container";

    for (let i = 0; i < Object.values(time).length; i++)
        timeContainer.appendChild(Object.values(time)[i]);

    audioInfoContainer.appendChild(button);
    audioInfoContainer.appendChild(timeContainer);

    audio.addEventListener("loadedmetadata", function() {
        time.duration.innerHTML = formatTime(audio.duration.toFixed(2));
        time.currentTime.innerHTML = formatTime(audio.currentTime.toFixed(2));
    });

    button.addEventListener("click", function() {
        let reqDance = null;
        if (audio.paused) {
            switchIconButton(1, button);
            audio.play();
            requestAnimationFrame(getCurrentTime);
            letsDance();
        }
        else {
            switchIconButton(0, button);
            audio.pause();
            time.currentTime.innerHTML = audio.currentTime;
        }
    });
}