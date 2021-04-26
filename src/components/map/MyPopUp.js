import { map } from "./MyMap.js"
import createDetail from "../detail/myDetail.js"
import { flyToDestination } from "./cameraMvt.js"
import { toggleUtils } from "../utils/myUtils.js";

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

function createImg(path) {
    const img = document.createElement("img");

    img.src = require(`/src/assets/content/${path}/img/illu.jpg`);

    return img;

}

export function createPopUp(feature, color, layer) {
    const popUp = document.createElement("div");
    const close = document.createElement("i");
    console.log(feature.properties.content)
    const content = createContent(feature, color);
    const lgtLat = feature.geometry.coordinates;

    popUp.id = "pop-up";
    popUp.name = layer;
    if (feature.properties.content) {
        const img = createImg(feature.properties.content);
        popUp.style.width = "50%";
        popUp.appendChild(img);
    }
    else 
        popUp.style.width = "33%";
    close.className = "close fas fa-times-circle";

    popUp.appendChild(close);
    popUp.appendChild(content);


    const popUpContainer = document.createElement("div");

    popUpContainer.id = "pop-up-container";
    popUpContainer.prepend(popUp);

    document.querySelector("#app").prepend(popUpContainer);
    let listen = document.querySelector(".cta-listen");

    listen.addEventListener("click", function () {
        if (!feature.properties.content)
            return;
        popUpContainer.classList.add("fade-out");
        toggleUtils();
        flyToDestination(lgtLat);
        map.once("zoomend", () => {
            popUpContainer.remove(popUp);
            createDetail(feature.properties.content, feature.properties.name, layer);
            //turnAround(0);
        });
    });

    popUpContainer.addEventListener("click", function (e) {
        if (e.target.id == "pop-up-container" || e.target.classList.contains("close"))
            popUpContainer.remove(popUp);
    })


    //  let ctaListen = document.querySelector("cta-listen")
}