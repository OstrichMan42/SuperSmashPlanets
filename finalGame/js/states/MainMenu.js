"use strict";

var game = new Phaser.Game(800, 619, Phaser.AUTO);

var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
		console.log("loaded main menu");
<<<<<<< HEAD:finalGame/js/MainMenu.js
		game.load.image('menu', 'assets/img/MainMenu.png'); 
	   // game.load.image('hole', 'assets/img/BlackHole.jpg');
	   game.load.image('instructions', 'assets/img/Instructions.png');
=======
		// preload assets
		// Images
		// game.load.image('bg', 'assets/img/Background.png'); // Image from https://www.behance.net/vitaliyvill
	    game.load.image('hole', 'assets/img/BlackHole.jpg');
>>>>>>> 21da6c2d76a554a44ca8b3324d8a16d11b42b99d:finalGame/js/states/MainMenu.js
	    game.load.image('earth', 'assets/img/EarthSprite.png');
	    game.load.image('mars', 'assets/img/MarsSprite.png');
	    game.load.image('asteroid', 'assets/img/AsteroidSprite.png');

	    // Load audio
	    game.load.audio('music', 'assets/audio/SpaceBattle.wav');
	    
	    console.log("loaded assets");
	},
	create: function() {
		var Menu = this.add.tileSprite( 0, 0, game.width, game.height, 'menu');
		console.log("main menu created");
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
<<<<<<< HEAD:finalGame/js/MainMenu.js
			console.log("spacebar pressed");
			game.state.start("Instructions");
=======
			game.state.start("Play", true, false, false);
		} else if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
			game.state.start("Play", true, false, true);
>>>>>>> 21da6c2d76a554a44ca8b3324d8a16d11b42b99d:finalGame/js/states/MainMenu.js
		}
	}
}

game.state.add("MainMenu", MainMenu);
game.state.start("MainMenu");