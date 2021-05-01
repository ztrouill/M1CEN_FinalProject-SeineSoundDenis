import { createAudioPlayer } from "./audio/player/myAudioPlayer.js"
import createSlider from "./slider/mySlider.js"
import { createTrackList } from "./audio/myAudioTrackList.js"
import { files } from "/src/index.js"
import { themes } from '../themes.js'
import createFutureTabs from "./futurTab/myFuturTab.js"
import createBackArrow from "./myBackArrow.js"
import { createMobileFutureTabs } from "./futurTab/myMobileFuturTab.js"

const portrait = window.innerWidth <= window.innerHeight ? true : false;

function addPoiToTitle(layer) {
    const container = document.createElement("div");
    const titleContainer = document.querySelector("#place-container");
    const poiContainer = document.createElement("div");
    const poi = document.createElement("img");

    poiContainer.id = "poi-title";
    poi.src = require(`/src/assets/pois/${layer}.svg`);
    container.id = "title-place-container-mobile";

    poiContainer.append(poi);
    container.append(poiContainer);
    container.append(titleContainer);

    document.querySelector("#left-container").prepend(container);
}

function createTitle(name, color, layer) {
    let placeName = document.createElement("div");
    let theme = document.createElement("div");
    let container = document.createElement("div");

    placeName.innerHTML = name;
    theme.innerHTML = layer;

    placeName.id = "place-name";
    theme.id = "place-theme";
    container.id = "place-container";

    placeName.style.color = color;

    container.append(placeName);
    container.appendChild(theme);
    document.querySelector("#left-container").append(container);
}

function createContainer() {
    let contentContainer = document.createElement("div");
    let rightContainer = document.createElement("div");
    let leftContainer = document.createElement("div");
    rightContainer.id = "right-container";
    leftContainer.id = "left-container";
    rightContainer.className = "both-container";
    leftContainer.className = "both-container";

    contentContainer.id = "content-container";

    document.querySelector("#app").appendChild(contentContainer);
    document.querySelector("#content-container").appendChild(leftContainer);
    document.querySelector("#content-container").appendChild(rightContainer);
}

function createYear(layer) {
    let container = document.createElement("div");
    let imgContainer = document.createElement("div");
    let img = document.createElement("img");
    let year = document.createElement("div");

    container.id = "year-container";
    container.className = "fade-in";
    imgContainer.id = "poi-year";
    year.id = "year-text";

    img.src = require(`/src/assets/pois/${layer}.svg`);
    year.innerHTML = "2021";

    imgContainer.appendChild(img);
    container.appendChild(imgContainer);
    container.appendChild(year);
    document.querySelector("#left-container").appendChild(container);
}

export default function createDetail(path, name, layer) {
    const place = files[path];
    const color = themes[layer].color;
    const theme = themes[layer].name;

    createContainer();
    createAudioPlayer(place["son"], color);
    createTitle(name, color, theme);
    createYear(layer);
    createTrackList(place["son"], color);
    createSlider(place["img"], path);
    createBackArrow(layer);
    createFutureTabs(color);

    if (portrait) {
        createMobileFutureTabs(color);
        addPoiToTitle(layer);
    }
}