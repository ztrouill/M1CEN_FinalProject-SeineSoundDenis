import { map } from "./MyMap.js"
import createDetail from "../detail/myDetail.js"

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

    console.log("coordinqtes = " + options.pitch)

    map.flyTo(options);
}

function createListenCTA(lgtLat, color) {
    const container = document.createElement("div");
    const listen = document.createElement("a");

    listen.innerHTML = "Écouter";
    listen.className = "cta-listen";
    listen.style.background = color;
    container.className = "cta-container";
    console.log("lgt = " + lgtLat)

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

function createImg() {
    //const container = document.createElement("div");
    const img = document.createElement("img");

    // container.className = "img-pop-up";
    // container.appendChild(img);
    img.src = require("../../assets/places/main_d_oeuvres/img/0.jpg");

    return img;

}

export function createPopUp(feature, color) {
    const popUp = document.createElement("div");
    const close = document.createElement("i");
    console.log(feature.properties.content)
    const content = createContent(feature, color);
    const lgtLat = feature.geometry.coordinates;

    console.log("properties = " + JSON.stringify(feature.properties));
    popUp.id = "pop-up";
    if (feature.properties.content) {
        const img = createImg();
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
        flyToDestination(lgtLat);
        createDetail();
        map.on("zoomend", function () {
            console.log("hello"); turnAround(0)
        });
    });

    popUpContainer.addEventListener("click", function (e) {
        console.log("e.target = " + e.target.id);
        if (e.target.id == "pop-up-container" || e.target.classList.contains("close"))
            popUpContainer.remove(popUp);
    })


    //  let ctaListen = document.querySelector("cta-listen")
}