import { goBack } from "../map/cameraMvt.js";
import { toggleMapControlers, map } from "../map/MyMap";
import { toggleUtils } from "../utils/myUtils.js";
import { createTinyPlayer } from "./audio/player/myTinyPlayer.js";
import { createAudioEvent } from "./audio/myAudio.js";
import { createListenEvent } from "./audio/player/myPlayPauseButton.js";
import { toggleFilterButton } from "../utils/filters/myResponsiveFilters.js";
function createEvents(layer) {
    const arrow = document.querySelector("#back-arrow");

    arrow.addEventListener("click", () => {
        const contentContainer = document.querySelector("#content-container");
        contentContainer.classList.add("fade-out");

        if (!document.querySelector("audio").paused)
            createTinyPlayer();
        goBack();
        map.once("zoomend", () => {
            if (document.querySelector("#tiny-player")) {
                createAudioEvent();
                createListenEvent();
            }
            toggleUtils(false);
            contentContainer.remove();
            if (document.querySelector("#show-filters"))
                toggleFilterButton(document.querySelector("#show-filters"));
            toggleMapControlers();
            map.setLayoutProperty(layer, "visibility", "visible");
        });
    });
}

function createElements() {
    const container = document.createElement("a");
    const backArrow = document.createElement("img");

    backArrow.src = require("../../assets/back.svg");
    
    container.append(backArrow);
    container.id = "back-arrow";

    document.querySelector("#content-container").append(container);
}

export default function createBackArrow(layer) {
    createElements();
    createEvents(layer);
}