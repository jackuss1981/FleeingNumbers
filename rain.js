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
		this.target = createVector(this.x, this.y); 
		this.maxspeed = 15;
		this.maxforce = 3;
		this.acc = createVector();
	}
	
	SetToZeroOrOne() {
	  if (frameCount % this.switchInterval == 0) {
 			this.value = round(random(0,1));
 		}	
 	};	

	targetMove() {
		if (this.target.y && this.pos.y >= height) {
				this.target.y = 0;	
				this.pos.y = this.target.y;

		} else {
		this.target.add(0, this.downForce);
		}
	};
	
	arrive(t){
		let desired = p5.Vector.sub(t, this.pos);
		let dMagnitude = desired.mag();
		let speed = this.maxspeed;
		const breakDistance = 20;
		
		if (dMagnitude < breakDistance) {
    	speed = map(dMagnitude, 0, breakDistance, 0, speed);
  	} 
		desired.setMag(speed);
  	
		let steer = p5.Vector.sub(desired, this.velocity);
		steer.limit(this.maxforce);
  	
		return steer;
	}
	
	flee(t) {
		let desired = p5.Vector.sub(t, this.pos);
		let dMagnitude = desired.mag();
		const dBMAT = 50; //distance Between Mouse And Target
		
		if (dMagnitude < dBMAT) {
				desired.setMag(this.maxspeed);
				desired.mult(-1);
				let steer = p5.Vector.sub(desired, this.velocity);
				steer.limit(this.maxforce);
				return steer;
			}
			
	}
	
	applyBehaviour(behaviourType) {
		this.acc.add(behaviourType);
	}
	
	rain() {
		let mouse = createVector(mouseX, mouseY);
		let flee = this.flee(mouse);
		let arrive = this.arrive(this.target);
		
		this.targetMove();
		this.applyBehaviour(arrive);
		this.applyBehaviour(flee);
		
		this.velocity.add(this.acc);
		this.pos.add(this.velocity);
		this.acc.mult(0); // resets acceleration
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
	
	
	render() {
		
		for(let i =0; i<= this.symbols.length -1; i++) {
			let symbol = this.symbols[i]	
			
			
			if (symbol.first ) {
						fill (180, 255, 180);
			} else {
						fill(0, 255, 70);
			}
					
		
			  text(symbol.value, symbol.pos.x, symbol.pos.y);
				symbol.rain();
			
			// nodig voor het switchen van de cijfers tijdens het vallen van de 'regen'	
			  symbol.SetToZeroOrOne();
			
			
		} //einde For loop
	
	} // einde render function
	
};//einde Stream

