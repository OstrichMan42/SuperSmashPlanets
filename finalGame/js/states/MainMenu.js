"use strict";

var game = new Phaser.Game(800, 800, Phaser.AUTO);

var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
		console.log("loaded main menu");

		// Preload assets
		// Images
		game.load.image('menu', 'assets/img/MainMenu.png');
	   	game.load.image('instructions', 'assets/img/Instructions.png');
		game.load.image('spaceBackground', 'assets/img/Background.png');
	    game.load.image('hole', 'assets/img/BlackHole.jpg');
	    game.load.image('earth', 'assets/img/EarthSprite.png');
	    game.load.image('earthPiece1', 'assets/img/EarthPiece1.png');
	    game.load.image('earthPiece2', 'assets/img/EarthPiece2.png');
	    game.load.image('earthPiece3', 'assets/img/EarthPiece3.png');
	    game.load.image('earthPiece4', 'assets/img/EarthPiece4.png');
	    game.load.image('earthPiece5', 'assets/img/EarthPiece5.png');
	    game.load.image('mars', 'assets/img/MarsSprite.png');
	    game.load.image('marsPiece1', 'assets/img/MarsPiece1.png');
	    game.load.image('marsPiece2', 'assets/img/MarsPiece2.png');
	    game.load.image('marsPiece3', 'assets/img/MarsPiece3.png');
	    game.load.image('marsPiece4', 'assets/img/MarsPiece4.png');
	    game.load.image('marsPiece5', 'assets/img/MarsPiece5.png');
	    game.load.image('asteroid', 'assets/img/AsteroidSprite.png');

	    // Load audio
	    game.load.audio('music', 'assets/audio/SpaceBattle.wav');
	    
	    console.log("loaded assets");
	},
	create: function() {
		// Space is big. Really big. You just won't believe how vastly, hugely, mind-bogglingly big it is. I mean, you may think it's a long way down the road to the chemist, but that's just peanuts to space.
		game.world.setBounds(0, 0, 1500, 1500);

		var Menu = game.add.sprite(0, 0, 'menu');
		console.log("main menu created");
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			console.log("spacebar pressed");
			game.state.start("Instructions");
		} else if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
			game.state.start("Play", true, false, true, [2, 0, 0]);
		}
	}
}

game.state.add("MainMenu", MainMenu);
game.state.start("MainMenu");