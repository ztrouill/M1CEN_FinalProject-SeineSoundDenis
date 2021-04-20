import createAudioPlayer from "./audioplayer/myAudioPlayer.js"

function createSilouhette() {
    let  img = document.createElement("img");
    let  imgContainer = document.createElement("div");

    //img.src = require("../../assets/basilique.svg");
    img.width = 150;
    imgContainer.id = "silouhette-container";

    imgContainer.appendChild(img);
    document.querySelector("#right-container").appendChild(imgContainer);
}

export default function createDetail() {
    let contentContainer = document.createElement("div");
    let rightContainer = document.createElement("div");
    
    rightContainer.id = "right-container";
    contentContainer.id = "content-container";

    document.querySelector("#app").appendChild(contentContainer);
    document.querySelector("#content-container").appendChild(rightContainer);

    createAudioPlayer();
    createSilouhette();
}