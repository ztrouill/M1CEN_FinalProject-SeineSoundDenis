import { createAudioPlayer } from "./audioplayer/myAudioPlayer.js"
import createSlider from "./slider/mySlider.js"
import { createTrackList } from "./audioplayer/myAudioTrackList.js"
import { files } from "/src/index.js"
import { themes } from '../themes.js'
import createAfter from "./myAfter.js"

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
    leftContainer.className = "both-container left-before";

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

    console.log(color);
    console.log(place)
    createContainer();
    createAudioPlayer(place["son"], color); // Ici createNamePiste
    createTitle(name, color, theme);
    createYear(layer);
    createTrackList(place["son"], color);
    createSlider(place["img"], path);
    createAfter(color);
}