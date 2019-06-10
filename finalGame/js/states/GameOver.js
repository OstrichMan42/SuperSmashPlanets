"use strict";

var GameOver = function(game) {};
GameOver.prototype = {

	init: function(loser, winner, score, bg, playerSprites, wins) {
		this.winner = winner;
		console.log(winner + " wins");
		this.loser = loser;
		this.score = score;
		this.bg = bg;
		this.playerSprites = playerSprites;
		this.wins = wins;

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

		// No bounce
		this.winner.body.bounce.set(0);

		// Update score UI
		var playerNum = this.winner.player;
		if (playerNum == 1 && this.score[1] <= this.score[0]){
			this.wins[this.score[1]-1].loadTexture('RoundWin');
			if (this.score[1] >= this.score[0]) this.done = true;
		} else if (this.score[2] <= this.score[0]) {
			this.wins[Math.floor(this.wins.length/2) + this.score[2]-1].loadTexture('RoundWin');if (this.score[1] >= this.score[0]) this.done = true;
			if (this.score[2] >= this.score[0]) this.done = true;
		}

		// Make text for winner
		if (this.score[1] >= this.score[0] || this.score[2] >= this.score[0]) {
			var text = this.winner.key + " wins!\nPress space to continue";
		} else {
			var text = this.winner.key + " won this round\nPress space to continue";
		}
		this.gameOverText = game.add.text(game.world.centerX - 150, game.world.centerY - 50, text, { fontSize: '30px', fill: '#ffffff', align: 'center'});
	},
	update: function() {
   		if (game.physics.arcade.collide(game.debris, game.players)) {
   			console.log('bonk');
   		}

   		// Restart game
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			// Game over
			if (this.done) {
				game.state.start("MainMenu", true, false, true);
			} else { // new round
				this.winner.destroy();
				this.gameOverText.destroy();
				game.debris.destroy(true, true);
				game.asteroids.forEach(function(kid) {kid.trail.destroy(); kid.destroy();}, this, true);
				game.state.start("Play", false, false, false, this.score, this.bg, this.playerSprites);
			}
		} else if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			this.winner.destroy();
			this.gameOverText.destroy();
			game.debris.destroy(true, true);
			game.asteroids.forEach(function(kid) {kid.trail.destroy(); kid.destroy();}, this, true);
			game.state.start("Play", false, false, true, this.score, this.bg, this.playerSprites);
		}

		if(game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			game.musicPlayer.stop();
			game.state.start("MainMenu", true, false, true);
		}
	}
}

game.state.add("GameOver", GameOver);