"use strict";

var game = new Phaser.Game(700, 700, Phaser.AUTO);

var MainMenu = function(game) {};
MainMenu.prototype = {
	init: function(loaded) {

		this.loaded = loaded;
	},
	preload: function() {
		console.log("loaded main menu");

		if (!this.loaded){
			// Preload assets
			// Images
			game.load.image('title', 'assets/img/TitleCard.png');
			game.load.image('spaceBackground', 'assets/img/Background.png');
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
		     game.load.image('asteroidPiece1', 'assets/img/AsteroidPiece1.png');
		    game.load.image('asteroidPiece2', 'assets/img/AsteroidPiece2.png');
		    game.load.image('asteroidPiece3', 'assets/img/AsteroidPiece3.png');
		    game.load.image('asteroidPiece4', 'assets/img/AsteroidPiece4.png');
		    game.load.image('asteroidPiece5', 'assets/img/AsteroidPiece5.png');
		    game.load.image('playButton', 'assets/img/Space_NotPressed.png');
		    game.load.image('playButtonDown', 'assets/img/Space_Pressed.png');
		    game.load.image('tutorialButton', 'assets/img/T_NotPressed.png');
		    game.load.image('tutorialButtonDown', 'assets/img/T_Pressed.png');

		    // Load audio
		    game.load.audio('music', 'assets/audio/SpaceBattle.wav');
		    game.load.audio('chillMusic', 'assets/audio/SpaceBattleCalm.wav');
		    
		    console.log("loaded assets");
		}

	},
	create: function() {
		
		// Make audio players
		if(game.musicPlayer == null) game.musicPlayer = game.add.audio('music');
		if(game.chillMusicPlayer == null) game.chillMusicPlayer = game.add.audio('chillMusic');
		console.log(game);

		// if(!game.chillMusicPlayer.isPlaying) game.chillMusicPlayer.play("", 0, 1, true);
		game.musicPlayer.fadeOut(1000);
		game.chillMusicPlayer.play("", 0, 1, true);

		// show entire game display while maintaining aspect ratio
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		// Add background
		var bg = game.add.sprite(0, 0, 'spaceBackground');
		bg.scale.setTo(0.5, 1);

		// Space is big. Really big. You just won't believe how vastly, hugely, mind-bogglingly big it is. I mean, you may think it's a long way down the road to the chemist, but that's just peanuts to space.
		// game.world.setBounds(0, 0, 850, 850);

		this.title = game.add.sprite(0, 0, 'title');
		this.title.scale.setTo(0.47);

		this.play = game.add.sprite(game.world.centerX - 200, 550, 'playButton');
		this.play.scale.setTo(0.7);
		this.play.anchor.setTo(0.5);

		this.tutorial = game.add.sprite(game.world.centerX + 200, 550, 'tutorialButton');
		this.tutorial.scale.setTo(0.7);
		this.tutorial.anchor.setTo(0.5);

		console.log("main menu created");
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			console.log("spacebar pressed");
			this.title.kill();
			this.play.kill();
			this.tutorial.kill();
			game.state.start("PreGame", false);
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.T)){
			console.log("spacebar pressed");
			this.title.kill();
			this.play.kill();
			this.tutorial.kill();
			game.state.start("Tutorial", false);
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
			game.chillMusicPlayer.stop();
			game.state.start("Play", true, false, true, [2, 0, 0], 'spaceBackground');
		}
	}
}

game.state.add("MainMenu", MainMenu);
game.state.start("MainMenu", true, false, false);