// Pour faire la wave qui continue selon le temps :
// En faire deux :
    // 1 statique
    // 1 dynamique
        // Ici va falloir appeler le son et draw toutes les x ms
        // 

let audioData = null;

function drawLineSegment(timestamp, ctx, x, y, width, isEven) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#EAE2DD"; // what color our line is
    ctx.beginPath();
    y = isEven ? y : -y;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, y);
    ctx.arc(x + width / 2, y, width / 2, Math.PI, 0, isEven);
    ctx.lineTo(x + width, 0);
    ctx.stroke();

    requestAnimationFrame(function(timestamp) {
        drawLineSegment(timestamp, ctx, x, height, width, (i + 1) % 2);
    })
}

function drawLine(data) {
    let canvas = document.querySelector("#waveform-canvas");
    let ctx = canvas.getContext("2d");
    const width = canvas.offsetWidth / data.length;
    for (let i = 0; i < data.length; i++) {
        const x = width * i;
        let height = data[i] * canvas.offsetHeight;
        if (height < 0) {
            height = 0;
        } else if (height > canvas.offsetHeight / 2) {
            height = height > canvas.offsetHeight / 2;
    }
    requestAnimationFrame(function(timestamp) {
        drawLineSegment(timestamp, ctx, x, height, width, (i + 1) % 2);
    })
  }
}

function createElement(url, data) {
    let playerContainer = document.createElement("div");
    let waveContainer = document.createElement("div");
    let infoAudioContainer = document.createElement("div");

    playerContainer.id = "player-container";
    waveContainer.id = "waveform-container";
    infoAudioContainer.id = "info-audio-container";

    document.querySelector("#app").appendChild(playerContainer);
    playerContainer.appendChild(waveContainer);
    playerContainer.appendChild(infoAudioContainer);

    let canvas = createCanvas();
    let audio = createAudio(url);
    let button = createCTA(url);
    let title = document.createElement("span");
    let currentTime = document.createElement("span");
    let duration = document.createElement("span");

    currentTime.id = "current-time";
    duration.id = "duration";
    audio.id = "audio-container";

    audio.preload = "metadata";

    title.innerHTML = "Jean Eudes nous présente la Basilique";
    infoAudioContainer.appendChild(currentTime); 
    infoAudioContainer.appendChild(title);
    infoAudioContainer.appendChild(duration);

    waveContainer.appendChild(audio);
    waveContainer.prepend(button);

    document.querySelector("#current-time").innerHTML = audio.currentTime;
    audio.addEventListener("loadedmetadata", function() {
        document.querySelector("#duration").innerHTML = audio.duration;
    });

    button.addEventListener("click", function() {
        if (audio.paused) {
            switchCTA(1, button);
            audio.play();
            requestAnimationFrame(playSong);
            // requestAnimationFrame(function(timestamp) {
            //     drawLine(timestamp, data);
            // });
            drawLine(data);
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

export function createWave() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    
    const audioContext = new AudioContext();
    const url = require("../../assets/sons/main_d_oeuvre/interculturalite.wav");

    getAudioData(url, audioContext)
                .then(response => {
                    console.log("then data = " + audioData + "response = " + JSON.stringify(responsez));
                }) // Ici mettre data en variable globale ??? Et dans getAudioData renvoyer une promesse 
}