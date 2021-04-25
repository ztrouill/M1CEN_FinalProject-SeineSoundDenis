import { getAudioData } from "./waveform/audioProcessing";
import { drawLinee, letsDance } from "./waveform/drawWave.js";
import { getCurrentTime } from "./waveform/myWaveform.js"

function redrawWave(src, el) {
    getAudioData(src, el.innerHTML)
    .then(response => {
        drawLinee(response, "foreground", true);
        let oldTrack = document.querySelector("#active-track");
        let color = oldTrack.getAttribute("style");
        oldTrack.classList.add("inactive-track");
        oldTrack.removeAttribute("id");
        oldTrack.removeAttribute("style");
        el.id = "active-track";
        el.classList.remove("inactive-track");
        el.setAttribute("style", color);
     })
}

function createEvent(content, color) {
    let trackEl = document.querySelectorAll(".name-track");

    for (let i = 0; i < trackEl.length; i++) {
        trackEl[i].addEventListener("click", (e) => {
            if (e.id === "active-track")
                return;
            else {
                let audio = document.querySelector("audio");
                console.log("audio = " + audio);
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
                    letsDance(color);
                    requestAnimationFrame(getCurrentTime);
                }, 100);
            }
        })
    }
}

export function createTrackList(content, color) {
    let arrContent = Object.keys(content);
    let container = document.createElement("div");

    container.id = "track-list-container";

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