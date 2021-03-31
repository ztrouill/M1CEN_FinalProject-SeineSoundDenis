
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
  if (layer === 'foreground')
    createClip(canvas, ctx);
   // ctx.clip(path);
   // createRectangle("#4BADB1")
}

function createClip(canvas, ctx) {
   // ctx.rect(50, 0, canvas.width, canvas.height);
   // ctx.clip();
    ctx.strokeStyle = "#4BADB1";
   // ctx.stroke();
   ctx.clearRect(100, -canvas.height / 2, canvas.width, canvas.height);
}

export function letsDance() {
    let audio = document.querySelector("audio");
    let canvas = document.querySelector("#waveform-canvas");
    
    let duration = audio.duration;
    let width = canvas.offsetWidth;
    
    // Idée :
    // > Créer le clip path
    // > Créer le rectangle au fur et à mesure (x = voir cahier pour calcul)

    // Pb :
    // Le clip se fait à l'extérieur du path
}