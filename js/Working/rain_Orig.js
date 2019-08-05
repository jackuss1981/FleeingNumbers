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
	constructor(x,y,vel,first) {
		this.x = x;
		this.y = y;
		this.vel = vel;
		this.first = first
		this.value;
		this.switchInterval = round(random(2,20));
	}
	
	SetToZeroOrOne() {
	  if (frameCount % this.switchInterval == 0) {
 			this.value = round(random(0,1));
 		}	
 	};	

	
	flee(mx, my) {
		let d = int(dist(mx, my, this.x, this.y));
		
		if (d < 10) {
			console.log("flee Active")
			
		}
	}
	
	
	rain() {
		if (this.y >= height ) {
			this.y = 0;
 		} else  {
 		this.y +=	this.vel;
 		}
	}			
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
				text(symbol.value, symbol.x, symbol.y);
				symbol.rain();
	 			symbol.SetToZeroOrOne();
				symbol.flee(mouseX, mouseY)
 			});		
	}
};//einde Stream

