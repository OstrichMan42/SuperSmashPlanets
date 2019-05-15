"use strict";

var game = new Phaser.Game(800, 619, Phaser.AUTO);

var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
		console.log("loaded main menu");
		game.load.image('menu', 'assets/img/MainMenu.png'); 
	   // game.load.image('hole', 'assets/img/BlackHole.jpg');
	   game.load.image('instructions', 'assets/img/Instructions.png');
	    game.load.image('earth', 'assets/img/EarthSprite.png');
	    game.load.image('mars', 'assets/img/MarsSprite.png');
	    game.load.image('asteroid', 'assets/img/AsteroidSprite.png');
	    
	    console.log("loaded assets");
	},
	create: function() {
		var Menu = this.add.tileSprite( 0, 0, game.width, game.height, 'menu');
		console.log("main menu created");
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			console.log("spacebar pressed");
			game.state.start("Instructions");
		}
	}
}

game.state.add("MainMenu", MainMenu);
game.state.start("MainMenu");