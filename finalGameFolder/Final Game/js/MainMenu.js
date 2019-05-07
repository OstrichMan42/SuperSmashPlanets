"use strict";

var game = new Phaser.Game(800, 450, Phaser.AUTO);

var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
		console.log("loaded main menu");
		// preload assets
		// game.load.image('bg', 'assets/img/Background.png'); // Image from https://www.behance.net/vitaliyvill

		// Couldnt get spritesheet to work with atlas, but the bunny and the backgrounnd are the only two things not on the sheet
	    game.load.image('hole', 'assets/img/BlackHole.jpg');
	    game.load.image('earth', 'assets/img/EarthSprite.png');
	    // game.load.image('mars', 'assets/img/MarsSprite.png');
	    
	    console.log("loaded assets");
	},
	create: function() {
		game.stage.backgroundColor = "#5ef9d0"
		var menuText = game.add.text(game.world.centerX - 140, game.world.centerY - 50, 'Press Space to start', { fontSize: '30px', fill: '#000000', align: 'center'});
		console.log("main menu created");
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start("Play");
		}
	}
}

game.state.add("MainMenu", MainMenu);
game.state.start("MainMenu");