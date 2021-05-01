import { createContent, createSocialMedia } from "./myFuturTab.js"; 

function createTabEvents(tabs, color) {
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener("click", () => {
            if (tabs[i].classList.contains("active-mobile-tab"))
                return;
            else {
                const active = document.querySelector(".active-mobile-tab");
                active.removeAttribute("style");
                active.classList.remove("active-mobile-tab");
                active.classList.add("inactive-mobile-tab");

                tabs[i].classList.add("active-mobile-tab");
                tabs[i].classList.remove("inactive-mobile-tab");
                tabs[i].style.background = color;

                if ((active == tabs[1] && i == 2) || (active == tabs[2] && i == 1))
                    return;
                else
                    toggleAfterContent(i);
            }
        })
    }
}

function toggleAfterContent(i) {
    const after = document.querySelector("#mobile-after-content");
    const middle = document.querySelector(".showed-element");
    const player = document.querySelector("#player-container");
    const time = i == 0 ? 750 : 0;

    after.classList.toggle("after-content-init-pos");
    after.classList.toggle("after-content-in");
    after.classList.toggle("after-content-out");


    setTimeout(() => {
        
        middle.classList.toggle("fade-in");
        middle.classList.toggle("fade-out");
        
        player.classList.toggle("fade-in");
        player.classList.toggle("fade-out");
    }, time);
}

function createAfterContent(color) {
    const container = document.createElement("div");

    container.id = "mobile-after-content";
    container.className = "after-content-init-pos after-content-out";

    createContent(container);
    createSocialMedia(container, color);

    document.querySelector("#right-container").append(container);
}

export function createMobileFutureTabs(color) {
    const container = document.createElement("div");
    const year = [ "2021", "2024", "Et après ?"];
    const tabs = [];
    container.id = "mobile-futur-tab-container";
    for (let i = 0; i < 3; i++) {
        const tab = document.createElement("div");
        tab.className = "mobile-futur-tab";

        if (i == 0) {
            tab.classList.add("active-mobile-tab");
            tab.style.background = color;
        }
        else
            tab.classList.add("inactive-mobile-tab");

        tab.innerHTML = year[i];
        tabs[i] = tab;
        container.append(tab);
    }

    document.querySelector("#left-container").prepend(container);

    createAfterContent(color);
    createTabEvents(tabs, color);
    
}