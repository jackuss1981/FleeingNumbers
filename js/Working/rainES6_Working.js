

// class Symbol. Voor het aanmaken van losse symbolen om in een Stream te zetten
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
	
	rain() {
		if (this.y >= height ) {
			this.y = 0;
 		} else  {
 		this.y +=	this.vel;
 		}
	}			
}; //einde Symbol

class Stream {
		// variabelen declareren voor DEZE Stream
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
			console.log(symbol);
				// 			--> this.vecs = createVector(x,y)
		  symbol.SetToZeroOrOne();
				this.symbols.push(symbol);
				y -= symbolSize;
				first = false;
 		};		
	}

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
			
 		});		
	} 

};//einde Stream



//Deze functie verzorgd de symbolen
// function Symbol(x, y, vel, first) {
// 	this.x = x;
// 	this.y = y;
// 	this.vel = vel; //doet tevens dienst als desired speed (maxspeed)
// 	this.value;
// 	this.first = first;
// 	this.switchInterval = round(random(2,20));
// 	this.vecs;
	
// 	// Functie om random een 0 of 1 te genereren
// 	this.SetToZeroOrOne = function() {
// 		this.vecs = createVector(this.x, this.y)
// 		if (frameCount % this.switchInterval == 0) {
// 			this.value = round(random(0,1));
// 		}	
// 	};
	
// 	// Regengenerator
// 	this.rain = function (){
// 		if (this.y >= height ) {
// 			this.y = 0;
// 		} else  {
// 		this.y +=	this.vel;
// 		}
// 	}	
// };

// Deze functie maakt een stroom aan, zodat alle 0 en 1-en daar in komen om op het scherm te zetten
// function Stream() {
// 	// variabelen declareren voor DEZE Stream
// 	this.symbols = [];	
// 	this.totalSymbols = round(random(2, 8));
// 	this.speed = round(random(2, 6));
// 	this.ver;
	

// 	this.generateSymbols = function(x, y) {
// 		var first = round(random(0,8)) == 1;
		
// 		for (var i=0; i <= this.totalSymbols; i++) {
// 			symbol = new Symbol(x, y, this.speed, first); 
// 			//--> this.vecs = createVector(x,y)
// 			symbol.SetToZeroOrOne();
// 			this.symbols.push(symbol);
// 			y -= symbolSize;
// 			first = false;
// 		}
// 	};
	
	
	
	// functie om de mousebeweging om te zetten in een flee algoritme
	// this.mousingOver = function() {	
	// 	this.vel = random(1, 4) ;
	// 	this.flee;
	// for (var i=0; i <= this.symbols.length; i++) {
	// 		if (typeof(this.symbols[i]) != "undefined"){
	// 		var d = dist(mouseX, mouseY, this.symbols[i].x, this.symbols[i].y);
			
	// 			// werkbare oplossing
	// 			if (d <= 10) {
	// 				this.vecs.x-= 20;
	// 				this.symbols[i].y -= 20; 
	// 				//this.symbols[i].x = this.speed - this.vel
	// 				// this.symbols[i].x -= 5;
	// 				// this.flee = this.speed - this.vel + symbolSize
	// 				// this.symbols[i].y = this.flee;
	// 				// this.flee*=0;
	// 			}
	// 		}
	// 	}
	// };


// 	this.render = function() {
// 		this.symbols.forEach(function(symbol){
// 			if (symbol.first) {
// 					fill (180, 255, 180);

// 			} else {
// 				fill(0, 255, 70);
// 			}
// 			text(symbol.value, symbol.x, symbol.y);
// 			symbol.rain();	
// 			symbol.SetToZeroOrOne();
			
// 		});

// 	}

 //}

