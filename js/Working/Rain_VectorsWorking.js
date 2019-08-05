/* ======================================================================
   Naam Script  : BitRain
	 Naam         : Jack Reinieren
   Datum        : 03 april 2019
	 Omschrijving : 
	  Dit script genereert een stroom van tussen de 2 en 8 nullen en enen
		En laat deze á la The Matrix naar beneden regenen. 
		Dit script bevat 2 classes:
		  - Symbol; deze class genereert een symbool (0 of 1)
			- Stream; Deze class genereert een stroom van 0-en en 1-en
			          een stroom bevat tussen de 2 en 8 symbols

   ====================================================================== */

class Symbol {
	constructor(x,y,downForce,first) {
		this.x = x;
		this.y = y;
		this.downForce = downForce;
		this.first = first;
		this.value;
		this.switchInterval = round(random(2,20));
		this.pos = createVector(this.x, this.y);
		this.velocity = createVector(0,this.downForce);
	}
	
	SetToZeroOrOne() {
	  if (frameCount % this.switchInterval == 0) {
 			this.value = round(random(0,1));
 		}	
 	};	

	
	flee(mx, my) {
		let mouseVec = createVector(mx, my);
		let d = this.pos.dist(mouseVec);
		
		if (d < 10) {
			this.pos.sub(10);
		
		} 
	}
	
	rain() {
	if (this.pos.y >= height) {
				this.pos.y = 0;
		}	else {
				this.pos.add(this.velocity);
		}
	};
}; //einde Symbol

// ============================================

class Stream {
	constructor() {
		this.symbols = [];	
		this.totalSymbols = round(random(2, 8));
		this.speed = round(random(2, 6));
		this.ver;
	};

	generateSymbols(x,y) {
		let first = round(random(0,4)) == 1;
		for (let i=0; i <= this.totalSymbols; i++) {
		let symbol = new Symbol(x, y, this.speed, first);
		  symbol.SetToZeroOrOne();
				this.symbols.push(symbol);
				y -= symbolSize;
				first = false;
 		};		
	};

	
	render() {
			this.symbols.forEach(function(symbol){
				if (symbol.first) {
 					fill (180, 255, 180);
				} else {
					fill(0, 255, 70);
				}
				text(symbol.value, symbol.pos.x, symbol.pos.y);
				symbol.rain();
	 			symbol.SetToZeroOrOne();
				symbol.flee(mouseX, mouseY)
 			});		
	}
};//einde Stream

