import { goBack } from "../map/cameraMvt.js";
import { map } from "../map/MyMap";
import { toggleUtils } from "../utils/myUtils.js";
import { createTinyPlayer } from "./audio/player/myTinyPlayer.js";
import { createAudioEvent } from "./audio/myAudio.js";
import { createListenEvent } from "./audio/player/myPlayPauseButton.js";

function createEvents(color) {
    const arrow = document.querySelector("#back-arrow");

    arrow.addEventListener("click", () => {
        const contentContainer = document.querySelector("#content-container");
        contentContainer.classList.add("fade-out");

        if (!document.querySelector("audio").paused)
            createTinyPlayer(color);
        goBack();
        map.once("zoomend", () => {
            if (document.querySelector("#tiny-player")) {
                createAudioEvent(color);
                createListenEvent();
            }
            toggleUtils();
            contentContainer.remove();
        });
    });
}

function createElements() {
    const container = document.createElement("a");
    const backArrow = document.createElement("img");

    backArrow.src = require("/src/assets/back.svg");
    
    container.append(backArrow);
    container.id = "back-arrow";

    document.querySelector("#content-container").append(container);
}

export default function createBackArrow(color) {
    createElements();
    createEvents();
}