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
		this.target =createVector(this.x, height); // Deze gebruiken om de streams naar de target te laten zoeken
		this.maxspeed = 0.5;
		this.maxforce = 0.1;
		this.acc = createVector();
	};
	
	applyForce(f) {
		this.acc.add(f);
	}
	
	
	SetToZeroOrOne() {
	  if (frameCount % this.switchInterval == 0) {
 			this.value = round(random(0,1));
 		}	
 	};	

	flee(t) {
		let desired = p5.Vector.sub(t, this.pos);
		let d = desired.mag();
		if (d < 10) {
			desired.setMag(this.maxspeed);
			desired.mult(-1);
			let steer = p5.Vector.sub(desired, this.velocity);
			steer.limit(this.maxforce);
			return steer;
		}
	}


	
	// Hier moeten de functies arrive en flee in opgeroepen worden. 
	rain() {
		let mouse = createVector(mouseX, mouseY);
		let flee = this.flee(mouse);
		
		if (this.pos.y >= height) {
				this.pos.y = 0;
		}	else {
			this.applyForce(flee)
			this.velocity.add(this.acc);
			this.pos.add(this.velocity);
			
		}
	}
}; //einde Symbol

// ============================================

class Stream {
	constructor() {
		this.symbols = [];	
		this.totalSymbols = round(random(2, 8));
		this.speed = round(random(1, 5));
	};

	generateSymbols(x,y) {
		
		let first = round(random(0, 4)) == 1;
		let newSymbol;
		
		for (let i=0; i <= this.totalSymbols; i++) {
				newSymbol = new Symbol(x, y, this.speed, first);
				newSymbol.SetToZeroOrOne();
				this.symbols.push(newSymbol);
				y -= symbolSize;
				first = false;
 		};		
	};
	
	
	render (){
		let mouse = createVector(mouseX, mouseY);
		for(let i =0;i<= this.symbols.length - 1; i++) {
			let symbol = this.symbols[i]
			
				if (symbol.first ) {
						fill (180, 255, 180);
				} else {
						fill(0, 255, 70);
				}
				ellipse(symbol.target.x,symbol.target.y, 50, 50);
				text(symbol.value, symbol.pos.x, symbol.pos.y);
				symbol.rain();
				symbol.SetToZeroOrOne(); // nodig voor het switchen van de cijfers tijdens het vallen van de 'regen'
			//symbol.applyForce(symbol.arrive);
			//symbol.applyForce(symbol.flee);
				//symbol.flee(mouseX, mouseY);
			//symbol.flee(mouse);
				}
		}
	
};//einde Stream

