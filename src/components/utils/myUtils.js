import { toggleTinyPlayer } from "../detail/audio/player/myTinyPlayer.js";
import { createFilters, toggleFilter } from "./filters/myFilters.js";
import { createLogo, toggleLogo } from "./myLogo.js";
import { createMenu } from "./myMenu.js";

export function createUtils() {
    const container = document.createElement("div");

    container.id = "utils";
 //   container.className = "fade-out";
    document.querySelector("#app").prepend(container);

    createFilters();
    createLogo();
    createMenu();
}

export function toggleUtils(start) {
    const utils = document.querySelector("#utils");
    const player = document.querySelector("#tiny-player");

    if (utils.getAttribute("style")) {
        utils.removeAttribute("style");
        setTimeout(() => {
            toggleFilter();
            toggleLogo();
            if (player)
                toggleTinyPlayer();
        }, 100);
    }

    else {
        toggleFilter();
        toggleLogo();
        if (player) {
            document.querySelector("audio").pause();
            toggleTinyPlayer();
        }
        if (!start) {
            setTimeout(() => {
                utils.style.display = "none";
                 if (player) {
                     player.remove();
                     document.querySelector("audio").remove();
                 }
             }, 1000)
        }
    }
}