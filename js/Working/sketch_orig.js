let streams = [];
let fadeInterval = 1.6;
let symbolSize = 16;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);

  let x = window.innerHeight / 2; //0
  /*for (let i = 0; i <= width / symbolSize; i++) {*/
		for (let i = 0; i <= 2; i++) {
    let stream = new Stream();
    stream.generateSymbols(x, random(-2000, 0));
    streams.push(stream);
    x += symbolSize
  }

  textFont('Consolas');
  textSize(symbolSize);
}


function draw() {
  background(0, 150);
  streams.forEach(function(stream) {
    stream.render();
  });
}

// Tijdelijke functies ivm. debugging
/*function mousePressed() {
	loop();
}


function mouseReleased() {
	noLoop();
	
}*/