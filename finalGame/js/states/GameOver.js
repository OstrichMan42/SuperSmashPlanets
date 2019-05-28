"use strict";

var GameOver = function(game) {};
GameOver.prototype = {

	init: function(loser, winner, score) {
		this.winner = winner;
		this.loser = loser;
		this.score = score;

		console.log(score);
	},
	preload: function() {
		console.log("loaded game over");
	},
	create: function() {
		console.log("game over created");
		// Slow motion effect for coolness
		game.add.tween(game.time).to({slowMotion: 1}, 2000, Phaser.Easing.Cubic.Out, true);
		//game.camera.focusOn(this.winner);
		game.camera.follow(this.winner, 0.1, 0.1);
		this.winner.body.bounce.set(0);

		if (this.score[1] >= this.score[0]) {
			var text = "Player " + this.winner.player + " wins!\nPress space to play again";
		} else if (this.score[2] >= this.score[0]) {
			var text = "Player " + this.winner.player + " wins!\nPress space to play again";
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
			game.state.start("Play", true, false, false, this.score);
		} else if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			game.state.start("Play", true, false, true, this.score);
		}
	}
}

game.state.add("GameOver", GameOver);