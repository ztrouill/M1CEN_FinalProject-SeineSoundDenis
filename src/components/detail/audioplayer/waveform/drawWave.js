let wave = new Path2D();

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
           drawTest(ctx, color, x, height, width, (i + 1) % 2, canvas);

        //    drawLineSegment(ctx, color, x, height, width, (i + 1) % 2);
  }
}


export function drawLinee(data, color, layer) {
    let canvas = document.querySelector(`#waveform-canvas-${layer}`);
    let ctx = canvas.getContext("2d");
    let path = new Path2D();
    const width = canvas.offsetWidth / data.length;

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

export function changeCurrentTime(pageX) {
    const canvas = document.querySelector("#waveform-canvas-foreground");
    const xPos = pageX - canvas.getBoundingClientRect().left;
    const audio = document.querySelector("audio");
    const newCurrentTime = (xPos * audio.duration) / canvas.offsetWidth;

    audio.currentTime = newCurrentTime;
}

function hideForeground(timestamp, canvas, ctx, audio, lastTime) {
    const pxPerSec = canvas.width / audio.duration;
    const currentTime = audio.currentTime; 
    const x = pxPerSec * currentTime;
    let path = new Path2D();
   
    if (lastTime > currentTime) {
        ctx.save();
        path.rect(x, -canvas.height / 2, canvas.width, canvas.height);
        ctx.clip(path);
        ctx.clearRect(x, -canvas.height / 2, canvas.width, canvas.height);
        ctx.fillStyle = "#EAE2DD";
        ctx.fill(wave);
        ctx.restore();
    }
    if (lastTime <= currentTime) {
        ctx.save();
        path.rect(0, -canvas.height / 2, x, canvas.height);
        ctx.clip(path);
        ctx.fillStyle = "#4BADB1";
        ctx.fill(wave);
        ctx.restore();
    }

    requestAnimationFrame((timestamp) => {
        hideForeground(timestamp, canvas, ctx, audio, currentTime);
    });
}

export function letsDance() {
    let audio = document.querySelector("audio");
    let canvas = document.querySelector("#waveform-canvas-foreground");
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    requestAnimationFrame((timestamp) => {
        hideForeground(timestamp, canvas, ctx, audio, audio.currentTime);
    });
    // Idée :
    // > Créer le clip path
    // > Créer le rectangle au fur et à mesure (x = voir cahier pour calcul)

    // Pb :
    // Le clip se fait à l'extérieur du path
}