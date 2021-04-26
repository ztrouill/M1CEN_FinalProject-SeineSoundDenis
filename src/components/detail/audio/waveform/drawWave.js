import { getAudioData } from "./audioProcessing.js";

export let wave = [ new Path2D(), new Path2D(), new Path2D()];

const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

function drawLineSegment(ctx, x, y, width, isEven, track) {
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = "#EAE2DD";

    y = isEven ? y : -y;
    wave[track].moveTo(x, 0);
    wave[track].lineTo(x, y);
    wave[track].arc(x + width / 2, y, width / 2, Math.PI, 0, isEven);
    wave[track].lineTo(x + width, 0);
   // ctx.clip();
  //  wave[track].addPath(path);
    ctx.stroke(wave[track]);
  // ctx.save();
}

function drawTest(ctx, color, x, y, width, isEven, canvas) {
    ctx.lineWidth = 1.2;
    ctx.fillStyle = color; // what color our line is
    //ctx.beginPath();
  //  y = isEven ? y : -y;
    wave.moveTo(x, 0);
    wave.lineTo(x, -y);
    wave.arc(x + width / 2, -y, width / 2, Math.PI, 0, false);
    wave.lineTo(x + width, y);
    wave.arc(x + width / 2, y, width / 2, 0, Math.PI, false);
    wave.lineTo(x, 0)
   // ctx.arc(x, y, width / 2, Math.PI, 0, isEven);
    //ctx.lineTo(x, 0);

  //path.addPath(wave);
    // if (canvas.id === "waveform-canvas-foreground")
    // {
    //     let path = new Path2D();
    //     path.rect(500, -canvas.height / 2, canvas.width, canvas.height)
    //     ctx.clip(path);
    // }

    ctx.fill(wave);
    ctx.save();
   // Voir >> https://stackoverflow.com/questions/18988118/how-can-i-clip-inside-a-shape-in-html5-canvas
}

export function drawLine(data, color, layer) {
    let canvas = document.querySelector(`#waveform-canvas-${layer}`);
    let ctx = canvas.getContext("2d");
    let path = new Path2D();
    const width = canvas.offsetWidth / data.length;

    console.log(wave);

    ctx.clearRect(0, -canvas.height / 2, canvas.width, canvas.height);

    for (let i = 0; i < data.length; i++) { // data len devient duration
        const x = width * i; // ici rajouter un padding pour espacer les samples quand on les display tous ?? 
        let height = data[i] * (canvas.offsetHeight / 4);
        if (height < 0) {
            height = 0;
        }
        if (height > canvas.offsetHeight) {
            height = canvas.offsetHeight / 2;
        }
        //console.log("data = " + data[i] + " height = " + height);
      //  drawLineSegment(ctx, color, x, height, width, (i + 1) % 2);
       if ((i + 1) % 2)
           drawTest(ctx, color, x, height, width, (i + 1) % 2, canvas);
       
        //    drawLineSegment(ctx, color, x, height, width, (i + 1) % 2);
  }
}


export function drawLinee(data, layer, newTrack) {
    let canvas = document.querySelector(`#waveform-canvas-${layer}`);
    let ctx = canvas.getContext("2d");
    let width = 0;
    const track = document.querySelector("audio").getAttribute("track");

    if (canvas.getAttribute("style"))
        canvas.removeAttribute("style");        
    
    width = canvas.offsetWidth / data.length;

    canvas.style.width = 100 + '%';
    if (newTrack)
        ctx.clearRect(0, -canvas.height / 2, canvas.width, canvas.height);

    for (let i = 0; i < data.length; i++) {
        const x = width * i;
        let height = data[i] * (canvas.offsetHeight / 4);
        if (height < 0) {
            height = 0;
        }
        if (height > canvas.offsetHeight) {
            height = canvas.offsetHeight / 2;
        }
        drawLineSegment(ctx, x, height, width, (i + 1) % 2, track);

  }
}

export function changeCurrentTime(pageX) {
    const canvas = document.querySelector("#waveform-canvas-foreground");
    const xPos = pageX - canvas.getBoundingClientRect().left;
    const audio = document.querySelector("audio");
    const newCurrentTime = (xPos * audio.duration) / canvas.offsetWidth;

    audio.currentTime = newCurrentTime;
}

function hideForeground(timestamp, canvas, ctx, audio, lastTime, color, track) {
    const pxPerSec = canvas.width / audio.duration;
    const currentTime = audio.currentTime; 
    const x = pxPerSec * currentTime;
    let path = [new Path2D(), new Path2D(), new Path2D()];
   
    
    if (lastTime > currentTime) {
        ctx.save();
        path[track].rect(x, -canvas.height / 2, canvas.width, canvas.height);
        ctx.clip(path[track]);
        ctx.strokeStyle = "#EAE2DD";
        ctx.stroke(wave[track]);
        ctx.restore();
    }
    if (lastTime <= currentTime) {
        ctx.save();
        path[track].rect(0, -canvas.height / 2, x, canvas.height);
        ctx.clip(path[track]);
        ctx.strokeStyle = color;
        ctx.stroke(wave[track]);
        ctx.restore();
    }

    let reqAnim = requestAnimationFrame((timestamp) => {
        hideForeground(timestamp, canvas, ctx, audio, currentTime, color, track);
    });

    if (audio.paused)
        cancelAnimationFrame(reqAnim);
}

export function letsDance(color) {
    const audio = document.querySelector("audio");
    const canvas = document.querySelector("#waveform-canvas-foreground");
    const ctx = canvas.getContext("2d");
    const track = audio.getAttribute("track");

    hideForeground(0, canvas, ctx, audio, audio.currentTime, color, track);
}

export function redrawWave(src, el) {
    getAudioData(src, el.innerHTML)
    .then(response => {
        drawLinee(response, "foreground", true);
        let oldTrack = document.querySelector("#active-track");
        let color = oldTrack.getAttribute("style");
        oldTrack.classList.add("inactive-track");
        oldTrack.removeAttribute("id");
        oldTrack.removeAttribute("style");
        el.id = "active-track";
        el.classList.remove("inactive-track");
        el.setAttribute("style", color);
     })
}