"use strict";

var game = new Phaser.Game(800, 450, Phaser.AUTO);

var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
		console.log("loaded main menu");
		// preload assets
		// Images
		// game.load.image('bg', 'assets/img/Background.png'); // Image from https://www.behance.net/vitaliyvill
	    game.load.image('hole', 'assets/img/BlackHole.jpg');
	    game.load.image('earth', 'assets/img/EarthSprite.png');
	    game.load.image('mars', 'assets/img/MarsSprite.png');
	    game.load.image('asteroid', 'assets/img/AsteroidSprite.png');

	    // Load audio
	    game.load.audio('music', 'assets/audio/SpaceBattle.wav');
	    
	    console.log("loaded assets");
	},
	create: function() {
		game.stage.backgroundColor = "#5ef9d0"
		var menuText = game.add.text(game.world.centerX - 140, game.world.centerY - 50, 'Press Space to start', { fontSize: '30px', fill: '#000000', align: 'center'});
		console.log("main menu created");
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start("Play", true, false, false);
		} else if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
			game.state.start("Play", true, false, true);
		}
	}
}

game.state.add("MainMenu", MainMenu);
game.state.start("MainMenu");