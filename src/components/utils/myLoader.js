import "@lottiefiles/lottie-player";

function createMyElement() {
    return new Promise((resolve) => {
        const loader = document.createElement("lottie-player");
        const container = document.querySelector("#app");

        loader.src = require("../../assets/loader.json");
        loader.autoplay = true;
        loader.loop = true;
        loader.style.position = "absolute";
        loader.style.zIndex = 999999;
        loader.style.top = 0;

        container.appendChild(loader);

        resolve(loader);
    });
}

export function createLoader() {
    createMyElement()
    .then((loader) => {
        console.log(loader);
        const animContainer = loader.shadowRoot.children[0];
        const anim = animContainer.children[0];
        const svgPath = anim.children[0].children[1];
        let svgTop = 0;
        let topPos = 0;
        
        animContainer.style.height = 30 + "%";
        svgTop = svgPath.getBoundingClientRect().top;
        topPos = window.innerHeight / 2 - svgTop;
        loader.style.top = topPos + "px";
        loader.style.display = "none";

    })
}

export function toggleLoader(bool) {
    const loader = document.querySelector("lottie-player");

    if (bool)
        loader.style.display = "block";
    else
        loader.style.display = "none";
}