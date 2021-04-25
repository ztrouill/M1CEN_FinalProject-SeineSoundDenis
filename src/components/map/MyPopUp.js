import { map } from "./MyMap.js"
import createDetail from "../detail/myDetail.js"


// Découper le popup en plusieurs petits composants 
// 1. listenButton
// etc
function turnAround() {
    map.easeTo({
        bearing: map.getBearing() - 10,
        duration: 3000,
        easing: x => x
    });

    requestAnimationFrame(turnAround);
}

function flyToDestination(coordinates) {
    const options = {
        center: coordinates,
        zoom: 20,
        pitch: 80,
    }

    map.flyTo(options);
}

function createListenCTA(lgtLat, color) {
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
    const listen = createListenCTA(feature.geometry.coordinates, color);

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

function createImg(url) {
    //const container = document.createElement("div");
    const img = document.createElement("img");

    // container.className = "img-pop-up";
    // container.appendChild(img);
    img.src = require(`/src/assets/content/${url}/img/illu.jpg`);

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
        popUpContainer.classList.add("fade-out");
        document.querySelector("#filters-container").style.display = "none";
        createDetail(feature.properties.content, feature.properties.name, layer);
        flyToDestination(lgtLat);
        map.on("zoomend", function () {
            popUpContainer.remove(popUp);
            //turnAround(0);
        });
    });

    popUpContainer.addEventListener("click", function (e) {
        if (e.target.id == "pop-up-container" || e.target.classList.contains("close"))
            popUpContainer.remove(popUp);
    })


    //  let ctaListen = document.querySelector("cta-listen")
}