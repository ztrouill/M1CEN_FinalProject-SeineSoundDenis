
function drawLineSegment(ctx, color, x, y, width, isEven) {
    ctx.lineWidth = 1.2;
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

function drawTest(ctx, color, x, y, width, isEven) {
    ctx.lineWidth = 1.2;
    ctx.fillStyle = color; // what color our line is
    //ctx.beginPath();
  //  y = isEven ? y : -y;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, -y);
    ctx.arc(x + width / 2, -y, width / 2, Math.PI, 0, false);
    ctx.lineTo(x + width, y);
    ctx.arc(x + width / 2, y, width / 2, 0, Math.PI, false);
    ctx.lineTo(x, 0)
   // ctx.arc(x, y, width / 2, Math.PI, 0, isEven);
    //ctx.lineTo(x, 0);

   // ctx.clip();
  //path.addPath(wave);
   ctx.fill();
   // Voir >> https://stackoverflow.com/questions/18988118/how-can-i-clip-inside-a-shape-in-html5-canvas
}

export function drawLine(data, color, layer) {
    let canvas = document.querySelector(`#waveform-canvas-${layer}`);
    let ctx = canvas.getContext("2d");
    let path = new Path2D();
    const width = canvas.offsetWidth / data.length;
    console.log("length = " + data.length)
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
           drawTest(ctx, color, x, height, width, (i + 1) % 2);

        //    drawLineSegment(ctx, color, x, height, width, (i + 1) % 2);
  }
}


export function drawLinee(data, color, layer) {
    let canvas = document.querySelector(`#waveform-canvas-${layer}`);
    let ctx = canvas.getContext("2d");
    let path = new Path2D();
    const width = canvas.offsetWidth / data.length;
    console.log("length = " + data.length)
    for (let i = 0; i < data.length; i++) { // data len devient duration
        const x = width * i;
        let height = data[i] * (canvas.offsetHeight / 4);
        if (height < 0) {
            height = 0;
        }
        if (height > canvas.offsetHeight) {
            height = canvas.offsetHeight / 2;
        }
        console.log("data = " + data[i] + " height = " + height);
        if ((i + 1) % 2)
            drawLineSegment(ctx, color, x, height, width, (i + 1) % 2);
      // if ((i + 1) % 2)
        //    drawLineSegment(ctx, color, x, height, width, (i + 1) % 2);
       // drawTest(ctx, color, x, height, width, (i + 1) % 2);
  }
}


function hideForeground(timestamp, canvas, ctx, audio) {
    const pxPerSec = canvas.width / audio.duration;
    const currentTime = audio.currentTime; 
    const x = pxPerSec * currentTime;


    ctx.clearRect(0, -canvas.height / 2, x, canvas.height);

    requestAnimationFrame((timestamp) => {
        hideForeground(timestamp, canvas, ctx, audio);
    });
}

export function letsDance() {
    let audio = document.querySelector("audio");
    let canvas = document.querySelector("#waveform-canvas-foreground");
    let ctx = canvas.getContext("2d");
    
    requestAnimationFrame((timestamp) => {
        hideForeground(timestamp, canvas, ctx, audio);
    });
    // Idée :
    // > Créer le clip path
    // > Créer le rectangle au fur et à mesure (x = voir cahier pour calcul)

    // Pb :
    // Le clip se fait à l'extérieur du path
}