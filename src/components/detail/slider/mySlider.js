const portrait = window.innerWidth <= window.innerHeight ? true : false;

function preloadImg(files) {
    for (const img in files) {
        const preloadLink = document.createElement("link");
        const srcImg = new Image();

        preloadLink.href = require(`../../../assets/content/${files[img]}`);
        preloadLink.rel = "preload";
        preloadLink.as = "image";

        srcImg.src = require(`../../../assets/content/${files[img]}`);
        document.head.appendChild(preloadLink);
    }
}

function checkOrientationImg(img) {
    let imgContainer = document.querySelector("#slider-img-container");

    if (portrait)
        return;
    img.addEventListener("load", () => {
        if (img.offsetHeight > img.offsetWidth)
            imgContainer.style.height = 50 + "%";
        else
            imgContainer.style.height = 100 + "%";
    });

    img.className = "fade-in";
    img.classList.remove("hidden");
}

function loadImg(files, i) {
    const arrFiles = Object.keys(files);
    const img = document.querySelector("#img-slider");
    const src = require(`../../../assets/content/${files[arrFiles[i]]}`);
    
    preloadImg(files);

    img.src = src;
  //  img.className = "hidden";

    checkOrientationImg(img);
}

function createContainers() {
    const container = document.createElement("div");
    const img = document.createElement("img");

    container.id = "slider-img-container";
    img.id = "img-slider";

    container.appendChild(img);
    document.querySelector("#slider-container").append(container);
}

function createArrows() {
    const arrows =  {
        left: document.createElement("img"),
        right: document.createElement("img")
    }

    arrows.left.className = "arrow-slider";
    arrows.right.className = "arrow-slider";
    
    arrows.left.src = require("../../../assets/left.svg");
    arrows.right.src = require("../../../assets/right.svg");

    arrows.left.id = "arrow-left";
    arrows.right.id = "arrow-right";

    arrows.left.style.visibility = "hidden";

    document.querySelector("#slider-img-container").prepend(arrows.left);
    document.querySelector("#slider-img-container").append(arrows.right);

    return arrows;
}

function createEvent(files) {
    let left = document.querySelector("#arrow-left");
    let right = document.querySelector("#arrow-right");
    let i = 0;

    left.addEventListener("click", () => {
        i--;
        if (i == 0)
            left.style.visibility = "hidden";
        if (i < Object.keys(files).length - 1)
            right.style.visibility = "visible";
        loadImg(files, i);
    });

    right.addEventListener("click", () => {
        i++;
        if (i >= Object.keys(files).length - 1)
            right.style.visibility = "hidden";
        if (i > 0)
            left.style.visibility = "visible";
        loadImg(files, i);
    })
}

export default function createSlider(files) {
    const slider = document.createElement("div");
    const len = Object.keys(files).length;

    slider.id = "slider-container";
    slider.classList = "fade-in showed-element";
    document.querySelector("#right-container").prepend(slider);

    preloadImg();
    createContainers();
    createArrows();
    loadImg(files, 0);
    createEvent(files);
}