let streams = [];
let symbolSize = 14;

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0);

  let x = 0;
		
  for (let i = 0; i <= width / symbolSize; i++){
	  
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

