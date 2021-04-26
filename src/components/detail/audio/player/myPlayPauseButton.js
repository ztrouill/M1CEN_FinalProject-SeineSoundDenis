export function switchIconButton(i, button) {
    const icons = ["play", "pause"];
   
    button.src = require(`/src/assets/${icons[i]}.svg`);
}

export function createListenEvent() {
    const button = document.querySelector("#listen-button");
    const audio = document.querySelector("audio");

    button.addEventListener("click", function() {
        if (audio.paused)
            audio.play();
        else
            audio.pause();
        });
}
  
export function createButton() {
    const button = document.createElement("img");
    
    switchIconButton(0, button);

    button.id = "listen-button";
    document.querySelector("#player-container").prepend(button);
    document.querySelector("#info-audio-container").prepend(button);
}