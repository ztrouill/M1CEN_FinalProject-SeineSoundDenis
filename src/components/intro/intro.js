function createVideo() {
    const video = document.createElement("video");
    const container = document.createElement("div");
    const source = document.createElement("source");

    container.id = "video-container";
    container.className = "fade-message-in";
    
    source.src = require("../../assets/intro.mp4");
    source.type = "video/mp4";

    video.autoplay = true;
    video.preload = "auto";

    video.append(source);
    container.append(video);

    document.querySelector("#app").prepend(container);
    
    return video;
}

function toggleElement(el) {
    el.classList.toggle("fade-message-in");
    el.classList.toggle("fade-message-out");
}

function creatVideoMessage() {
    const container = document.createElement("div");
    const headphone = document.createElement("i");
    const message = document.createElement("div");
    const text = `Pour profiter de la meilleure expérience,
                    <br/>
                    un casque audio ou des écouteurs sont conseillés.`
    container.className = "intro-message fade-message-out";
    headphone.className = "fas fa-headphones-alt";
    message.innerHTML = text;

    container.append(message);
    container.append(headphone);
    document.querySelector("#video-container").append(container);

    return container
}

function createPlayButton(video) {
    const container = document.createElement("div");
    const icon = document.createElement("i");

    icon.className = "fas fa-play";
    container.id = "play-video"
    container.className = "fade-message-out intro-message";
    container.style.pointerEvents = "none";

    container.append(icon);
    document.querySelector("#video-container").append(container);

    return container;
}

function createSkipButton() {
    const container = document.createElement("div");
    const icon = document.createElement("i");

    icon.className = "fas fa-times";
    container.className = "close-video fade-message-out";

    container.append(icon);
    
    document.querySelector("#video-container").append(container);
    return container;
}

function playIntro(message, play) {
    setTimeout(() => {
        toggleElement(message);
        setTimeout(() => {
            toggleElement(message);
            setTimeout(() => {
                message.remove();
                toggleElement(play);
                play.style.pointerEvents = "auto";
            }, 1000);
        }, 3000)
    }, 100)
}

export function startIntro() {
    const video = createVideo();
    const message = creatVideoMessage();
    const play = createPlayButton(video);
    const skip = createSkipButton();

  
    playIntro(message, play)

    play.addEventListener("click", () => {
        toggleElement(play);
        setTimeout(() => {
            toggleElement(skip);
            video.play();
            play.remove();
        }, 500);
    })

    return new Promise((resolve) => {
        video.addEventListener("ended", () => {
            toggleElement(video);
            resolve();
        });
        skip.addEventListener("click", () => {
            toggleElement(video);
            toggleElement(skip);
            video.pause();
            setTimeout(() => {
                resolve();
            }, 750);
        });
    });
}