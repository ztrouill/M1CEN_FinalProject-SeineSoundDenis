import { toggleMapControlers, map } from "./MyMap.js"
import { createDetail, toggleDetail } from "../detail/myDetail.js"
import { flyToDestination } from "./cameraMvt.js"
import { toggleUtils } from "../utils/myUtils.js";
import { toggleFilterButton } from "../utils/filters/myResponsiveFilters.js";

function createListenCTA(color) {
    const container = document.createElement("div");
    const listen = document.createElement("a");

    listen.innerHTML = "Écouter";
    listen.className = "cta-listen";
    listen.style.background = color;
    container.className = "cta-container";

    container.appendChild(listen);

    return container;
}

function createContent(feature, color) {
    const container = document.createElement("div");
    const title = document.createElement("div");
    const paragraphe = document.createElement("p");
    const listen = createListenCTA(color);

    container.className = "content";
    title.className = "title";
    title.innerHTML = feature.properties.name;
    title.style.color = color;
    paragraphe.innerHTML = feature.properties.description;

    container.appendChild(title);
    container.appendChild(paragraphe);
    container.appendChild(listen);

    return container;
}

function preloadImg(path) {
    const preloadLink = document.createElement("link");
    preloadLink.href = require(`../../assets/content/${path}/img/illu.jpg`);
    preloadLink.rel = "preload";
    preloadLink.as = "image";

    document.head.appendChild(preloadLink);
}

function createImg(path) {
    const img = document.createElement("img");

    preloadImg(path);

    img.src = require(`../../assets/content/${path}/img/illu.jpg`);

    return img;

}

export function createPopUp(feature, color, layer) {
    const popUp = document.createElement("div");
    const close = document.createElement("i");
    const content = createContent(feature, color);
    const lgtLat = feature.geometry.coordinates;

    popUp.id = "pop-up";
    popUp.name = layer;

    const img = createImg(feature.properties.content);
    popUp.appendChild(img);   

    img.addEventListener("load", () => {
        if (img.offsetHeight > img.offsetWidth) {
            if (window.innerWidth > window.innerHeight)
                img.style.maxWidth = 25 +"%";
            else {
                img.style.maxWidth = 50 + "%";
                img.style.margin = 0 + " auto";
            }    
        }
        popUpContainer.classList.remove("fade-out");
        popUpContainer.classList.add("fade-in");
    });

    close.className = "close fas fa-times-circle";

    popUp.appendChild(close);
    popUp.appendChild(content);


    const popUpContainer = document.createElement("div");

    popUpContainer.prepend(popUp);

    popUpContainer.classList.add("fade-out");

    popUpContainer.id = "pop-up-container";
    document.querySelector("#app").prepend(popUpContainer);

    setTimeout(() => {
        popUpContainer.classList.remove("fade-out");
        popUpContainer.classList.add("fade-in");
    }, 250);
    let listen = document.querySelector(".cta-listen");

    listen.addEventListener("click", () => {
        if (feature.properties.content !== "main_d_oeuvres")
            return;
        popUpContainer.classList.add("fade-out");
        toggleUtils(false);
        flyToDestination(lgtLat);
        createDetail(feature.properties.content, feature.properties.name, layer);
        map.once("zoomend", () => {
            popUpContainer.remove(popUp);
            map.setLayoutProperty(layer, "visibility", "none");
            toggleDetail(true);
            
    });

    });
    
    popUpContainer.addEventListener("click", function (e) {
        if (e.target.id == "pop-up-container" || e.target.classList.contains("close")) {
            popUpContainer.classList.add("fade-out");
            popUpContainer.classList.remove("fade-in");
            setTimeout(() => {
                popUpContainer.remove(popUp);
                if (document.querySelector("#show-filters"))
                    toggleFilterButton(document.querySelector("#show-filters"));
                toggleMapControlers();
            }, 250);
        }
    })
}