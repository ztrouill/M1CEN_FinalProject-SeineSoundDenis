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

function createInfo(){
    let infos = {
        currentTime : document.createElement("span"),
        title : document.createElement("span"),
        duration : document.createElement("span")
    };

    let container = document.querySelector("#info-audio-container");
    
    infos.currentTime.id = "current-time";
    infos.duration.id = "duration";

    infos.title.innerHTML = "Jean Eudes nous présente la Basilique";

       
    container.appendChild(infos.currentTime); 
    container.appendChild(infos.title);
    container.appendChild(infos.duration);

    return infos;
}

export default function createAudio(url) {
    let audio = createAudioElement(url);
    let button = createButton();
    let infos = createInfo();

    audio.addEventListener("loadedmetadata", function() {
        infos.duration.innerHTML = audio.duration.toFixed(2);
        infos.currentTime.innerHTML = audio.currentTime.toFixed(2);

        console.log("duration = " + infos.duration);
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
            infos.currentTime.innerHTML = audio.currentTime;
        }
    });
}