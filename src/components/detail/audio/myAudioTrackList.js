import { redrawWave } from "./waveform/drawWave.js";

export function createMenuTrackList() {
    const menu = document.createElement("i");
    const container = document.querySelector("#title-sound-track");

    menu.className = "menu-tracklist fas fa-bars fade-in";
    container.prepend(menu);

    menu.addEventListener("click", () => {
        const trackList = document.querySelector("#track-list-container-mobile");
        const trackListStyle = window.getComputedStyle(trackList);
        const isHidden = trackListStyle.getPropertyValue("display");
        const slider = document.querySelector("#slider-container");

        if (isHidden === "none") {
            slider.classList.toggle("fade-in");
            slider.classList.toggle("fade-out");
            slider.classList.toggle("showed-element");
            trackList.style.display = "flex";
            menu.classList.toggle("fade-in");
            menu.classList.toggle("fade-out");
            trackList.classList.toggle("showed-element");

            setTimeout(() => {
                trackList.classList.toggle("fade-in");
                trackList.classList.toggle("fade-out");
                menu.classList.toggle("fa-bars");
                menu.classList.toggle("fa-times");
                menu.classList.toggle("fade-in");
                menu.classList.toggle("fade-out");
            }, 250);
        }
        else {
            trackList.classList.toggle("showed-element");
            trackList.classList.toggle("fade-in");
            trackList.classList.toggle("fade-out");

            menu.classList.toggle("fade-in");
            menu.classList.toggle("fade-out");

            slider.classList.toggle("showed-element");

            setTimeout(() => {
                slider.classList.toggle("fade-in");
                slider.classList.toggle("fade-out");
                trackList.style.display = "none";
                menu.classList.toggle("fa-bars");
                menu.classList.toggle("fa-times");
                menu.classList.toggle("fade-in");
                menu.classList.toggle("fade-out");
            }, 250);
        }
    })
}

function createEvent(content) {
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
                const audioSrc = require(`../../../assets/content/${content[key]}`);
                audio.src = audioSrc;
                redrawWave(audioSrc, trackEl[i], audio);
            }
        })
    }
}

export function createTrackList(content, color, device) {
    let arrContent = Object.keys(content);
    let container = document.createElement("div");
    const fade = device === "desktop" ? "fade-in" : "fade-out";

    container.id = `track-list-container-${device}`;
    container.className = `${fade} track-list-container`;

    for (let i = 0; i < arrContent.length; i++) {
        let trackContainer = document.createElement("div");
        let track = document.createElement("span");

        trackContainer.className = "name-track-container";
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

    if (device === "mobile")
        createMenuTrackList();
}