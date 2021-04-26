export function toggleTinyPlayer() {
    const player = document.querySelector("#tiny-player");

    player.classList.toggle("fade-in");
    player.classList.toggle("fade-out");
}

export function createTinyPlayer(color) {
    const title = document.querySelector("#title-sound-track");
    const time = document.querySelector("#time-container");
    const button = document.querySelector("#listen-button");

    const titleNode = title.cloneNode(true);
    const timeNode = time.cloneNode(true);
    const buttonNode = button.cloneNode(true);


    const container = document.createElement("div");

    container.id = "tiny-player";
    
    container.append(buttonNode);
    container.append(titleNode);
    container.append(timeNode);

    // button.remove();
    // title.remove();
    // time.remove();

    container.className = "fade-out";

    document.querySelector("#utils").append(container);
}