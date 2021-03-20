import { map } from "../map/MyMap.js"

export function launchSound() {

    createCanvas();
    const poi = document.querySelector("#poi-svg-element");
    const clone = poi.cloneNode(true);

    let container = document.createElement("div");
    let canvas = document.createElement("canvas");
    let ctx = null;
    const width = clone.style.width;
    const height = clone.style.height;

    container.id = "content-container";

    canvas.width = width;
    canvas.height = height;
    
    ctx = canvas.getContext("2d");
    console.log("ctx = " + ctx);
    ctx.drawImage(clone, 0, 0, canvas.width, canvas.height);

    container.appendChild(canvas);
    let body = document.querySelector("body");
    body.appendChild(container)
}