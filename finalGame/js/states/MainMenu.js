"use strict";

var game = new Phaser.Game(700, 700, Phaser.AUTO);

var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
		console.log("loaded main menu");

		// Preload assets
		// Images
		game.load.image('title', 'assets/img/Title.png');
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
	    game.load.image('playButton', 'assets/img/PlayButton.png');
	    game.load.image('tutorialButton', 'assets/img/TutorialButton.png');

	    // Load audio
	    game.load.audio('music', 'assets/audio/SpaceBattle.wav');
	    game.load.audio('woosh', 'assets/audio/woosh.mp3');
	    game.load.audio('crash', 'assets/audio/crash.mp3');
	    game.load.audio('boing', 'assets/audio/boing.mp3');

	    
	    console.log("loaded assets");
	},
	create: function() {
		// show entire game display while maintaining aspect ratio
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		// Space is big. Really big. You just won't believe how vastly, hugely, mind-bogglingly big it is. I mean, you may think it's a long way down the road to the chemist, but that's just peanuts to space.
		// game.world.setBounds(0, 0, 850, 850);

		var title = game.add.sprite(0, 0, 'title');
		title.inputEnabled = true;

		var play = game.add.sprite(game.world.centerX - 200, 500, 'playButton');
		play.inputEnabled = true;

		var tutorial = game.add.sprite(game.world.centerX + 200, 500, 'tutorialButton');
		tutorial.inputEnabled = true;
		
		console.log("main menu created");
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			console.log("spacebar pressed");
			game.state.start("Instructions");
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
			game.state.start("Play", true, false, true, [2, 0, 0]);
		}
	}
}

game.state.add("MainMenu", MainMenu);
game.state.start("MainMenu");