
function drawLineSegment(ctx, color, x, y, width, isEven) {
    let wave = new Path2D();

    ctx.lineWidth = 3;
    ctx.strokeStyle = color; // what color our line is
    //ctx.beginPath();
    y = isEven ? y : -y;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, y);
    ctx.arc(x + width / 2, y, width / 2, Math.PI, 0, isEven);
    ctx.lineTo(x + width, 0);
   // ctx.clip();
  //path.addPath(wave);
   ctx.stroke();
   // Voir >> https://stackoverflow.com/questions/18988118/how-can-i-clip-inside-a-shape-in-html5-canvas
}

export function drawLine(data, color, layer) {
    let canvas = document.querySelector(`#waveform-canvas-${layer}`);
    let ctx = canvas.getContext("2d");
    let path = new Path2D();
    const width = canvas.offsetWidth / data.length;
    console.log("length = " + data.length)
    for (let i = 0; i < data.length; i++) { // data len devient duration
        const x = width * i;
        let height = data[i] * canvas.offsetHeight;
        if (height < 0) {
            height = 0;
        }
        else if (height > canvas.offsetHeight / 2) {
            height = height > canvas.offsetHeight / 2;
        }
        drawLineSegment(ctx, color, x, height, width, (i + 1) % 2);
  }
  if (layer === 'foreground') {
  //  ctx.clearRect(10, -canvas.height / 2, canvas.width, canvas.height);
  }
  //  
   // ctx.clip(path);
   // createRectangle("#4BADB1")
}

let frame = 0;

function hideForeground(timestamp, canvas, ctx, audio) {
    let pxPerSec = canvas.width / audio.duration;
    
    //console.log("BEFORE // pxPerSec = " + pxPerSec);
  //  pxPerSec /= audio.currentTime;
    //console.log("AFTER // pxPerSec = " + pxPerSec);

    let currentTime = audio.currentTime;
  
    //console.log("Current time == " + currentTime + "audio = " + audio.currentTime)
 
    let x = pxPerSec * currentTime;


    ctx.clearRect(0, -canvas.height / 2, x, canvas.height);

    requestAnimationFrame((timestamp) => {
        hideForeground(timestamp, canvas, ctx, audio);
    });
}

export function letsDance() {
    let audio = document.querySelector("audio");
    let canvas = document.querySelector("#waveform-canvas-foreground");
    let ctx = canvas.getContext("2d");

    let duration = audio.duration;
    let width = canvas.offsetWidth;
    
    requestAnimationFrame((timestamp) => {
        hideForeground(timestamp, canvas, ctx, audio);
    });
    // Idée :
    // > Créer le clip path
    // > Créer le rectangle au fur et à mesure (x = voir cahier pour calcul)

    // Pb :
    // Le clip se fait à l'extérieur du path
}