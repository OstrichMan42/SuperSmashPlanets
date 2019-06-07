"use strict";

var GameOver = function(game) {};
GameOver.prototype = {

	init: function(loser, winner, score, bg, playerSprites) {
		this.winner = winner;
		this.loser = loser;
		this.score = score;
		this.bg = bg;
		this.playerSprites = playerSprites;

		console.log(score);
	},
	preload: function() {
		console.log("loaded game over");

		//game.musicPlayer.fadeTo(1000, 1);
		game.musicPlayer.fadeTo(1000, 0.01);
		game.chillMusicPlayer.fadeTo(1000, 1);
		//game.chillMusicPlayer.fadeTo(1000, 0);
	},
	create: function() {
		console.log("game over created");
		// Slow motion effect for coolness
		game.add.tween(game.time).to({slowMotion: 1}, 2000, Phaser.Easing.Cubic.Out, true);
		//game.camera.focusOn(this.winner);
		game.camera.follow(this.winner, 0.1, 0.1);
		this.winner.body.bounce.set(0);

		if (this.score[1] >= this.score[0] || this.score[2] >= this.score[0]) {
			var text = this.winner.key + " wins!\nPress space to play again";
		} else {
			var text = "Player " + this.winner.player + " won this round\nPress space to start the next round";
		}
		var gameOverText = game.add.text(game.world.centerX - 150, game.world.centerY - 50, text, { fontSize: '30px', fill: '#ffffff', align: 'center'});
	},
	update: function() {
   		if (game.physics.arcade.collide(game.debris, game.players)) {
   			console.log('bonk');
   		}

		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start("Play", true, false, false, this.score, this.bg, this.playerSprites);
		} else if(game.input.keyboard.isDown(Phaser.Keyboard.T)) {
			game.state.start("Tutorial", true, false, true, this.score);
		} else if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			game.state.start("Play", true, false, true, this.score, this.bg, this.playerSprites);
		}

		if(game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			game.musicPlayer.stop();
			game.state.start("MainMenu", true, false, true);
		}
	}
}

game.state.add("GameOver", GameOver);