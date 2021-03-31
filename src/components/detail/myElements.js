import { getCurrentTime } from "./myWave.js"



export function createElements(url, data) {

    audio.addEventListener("loadedmetadata", function() {
        document.querySelector("#duration").innerHTML = audio.duration;
    });

    button.addEventListener("click", function() {
        if (audio.paused) {
            switchCTA(1, button);
            audio.play();
            requestAnimationFrame(getCurrentTime);
            //drawLine(data);
        }
        else {
            switchCTA(0, button);
            audio.pause();
            document.querySelector("#current-time").innerHTML = audio.currentTime;
        }
    });


    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

}