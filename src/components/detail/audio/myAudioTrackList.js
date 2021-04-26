import { redrawWave } from "./waveform/drawWave.js";

function createEvent(content, color) {
    let trackEl = document.querySelectorAll(".name-track");

    for (let i = 0; i < trackEl.length; i++) {
        trackEl[i].addEventListener("click", (e) => {
            if (e.id === "active-track")
                return;
            else {
                let audio = document.querySelector("audio");
                let key = trackEl[i].innerHTML;
                audio.setAttribute("track", i);
                const isPaused = audio.paused;
                if (!isPaused)
                    audio.pause();
                const audioSrc = require(`/src/assets/content/${content[key]}`);
                audio.src = audioSrc;
                redrawWave(audioSrc, trackEl[i], i);
                let title = document.querySelector("#title-sound-track");
                title.innerHTML = trackEl[i].innerHTML;
                setTimeout(() => {
                    audio.play();
               }, 100);
            }
        })
    }
}

export function createTrackList(content, color) {
    let arrContent = Object.keys(content);
    let container = document.createElement("div");

    container.id = "track-list-container";
    container.className = "fade-in";
    
    for (let i = 0; i < arrContent.length; i++) {
        let trackContainer = document.createElement("div");
        let track = document.createElement("span");

        track.innerHTML = arrContent[i];
        track.className = "name-track";
        if (i == 0) {
            track.id = "active-track";
            track.style.color = color;
        }
        else {
            track.classList.add("inactive-track");
        }
        trackContainer.appendChild(track);
        container.appendChild(trackContainer);
    }

    document.querySelector("#left-container").appendChild(container);
    
    createEvent(content, color);
}