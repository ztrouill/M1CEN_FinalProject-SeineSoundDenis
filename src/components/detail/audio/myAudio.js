import { switchIconButton } from "./player/myPlayPauseButton.js";
import { formatTime, getCurrentTime } from "./player/myAudioMetadata.js";
import { letsDance } from "./waveform/drawWave.js";

function createAudioElement(url) {
    let audio = document.createElement("audio");

    audio.src = url;
    audio.id = "audio-container";
    audio.preload = "auto";

    document.querySelector("#utils").appendChild(audio);

    return audio;
}

export function createAudioEvent(color) {
    const audio = document.querySelector("audio");
    const button = document.querySelector("#listen-button");
    const duration = document.querySelector("#duration");
    const currentTime = document.querySelector("#current-time");

    audio.addEventListener("loadedmetadata", () => {
        duration.innerHTML = formatTime(audio.duration.toFixed(2));
        currentTime.innerHTML = formatTime(audio.currentTime.toFixed(2));
    });

    duration.innerHTML = formatTime(audio.duration.toFixed(2));
    currentTime.innerHTML = formatTime(audio.currentTime.toFixed(2));

    let req = null;
    
    audio.addEventListener("play", () => {
        switchIconButton(1, button);
        req = requestAnimationFrame(getCurrentTime);
        if (document.querySelector("#waveform-container"))
            letsDance(color, audio.getAttribute("track"));
    });

    audio.addEventListener("pause", () => {
        switchIconButton(0, button);
        cancelAnimationFrame(req);
        
    });
}

function preloadAudio(files) {
    for (const sound in files) {
        const preloadLink = document.createElement("link");
        const audio = new Audio();

        preloadLink.href = require(`../../../assets/content/${files[sound]}`);
        preloadLink.rel = "preload";
        preloadLink.as = "audio";

        audio.src = require(`../../../assets/content/${files[sound]}`);
        document.head.appendChild(preloadLink);
    }
}

export function createAudio(files, file, title) {
    preloadAudio(files);
    let audio = createAudioElement(file);
    
    if (!audio.getAttribute("track"))
        audio.setAttribute("track", 0)
}