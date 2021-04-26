import { toggleTinyPlayer } from "../detail/audio/player/myTinyPlayer.js";
import { createFilters, toggleFilter } from "./myFilters.js";
import { createLogo, toggleLogo } from "./myLogo.js";

export function createUtils() {
    const container = document.createElement("div");

    container.id = "utils";
    document.querySelector("#app").prepend(container);

    createFilters();
    createLogo();
}

export function toggleUtils() {
    const utils = document.querySelector("#utils");
    const player = document.querySelector("#tiny-player");

    if (utils.getAttribute("style")) {
        utils.removeAttribute("style");
        toggleFilter();
        toggleLogo();
        if (player)
            toggleTinyPlayer();
    }

    else {
        toggleFilter();
        toggleLogo();
        if (player) {
            document.querySelector("audio").pause();
            toggleTinyPlayer();
        }
        setTimeout(() => {
           utils.style.display = "none";
            if (player) {
                player.remove();
                document.querySelector("audio").remove();
            }
        }, 1000)
    }
}