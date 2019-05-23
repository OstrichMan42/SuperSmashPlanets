"use strict";

var GameOver = function(game) {};
GameOver.prototype = {
	init: function(loser, players, score) {
		console.log(players);
		if (loser.player == 1) {
			this.winner = players[1];
		} else {
			this.winner = players[0];
		}
		this.loser = loser;
		this.score = score;
	},
	preload: function() {
		console.log("loaded game over");
	},
	create: function() {
		console.log("game over created");
		game.add.tween(game.time).to({slowMotion: 1}, 1000, Phaser.Easing.Cubic.Out, true);
		game.camera.follow(this.winner, 0.1, 0.1);
		this.winner.body.bounce.set(0);
		var text = "Player " + this.winner.player + " wins!\nPress space to play again";
		var gameOverText = game.add.text(game.world.centerX - 150, game.world.centerY - 50, text, { fontSize: '30px', fill: '#ffffff', align: 'center'});
	},
	update: function() {
   		if (game.physics.arcade.collide(game.debris, game.players)){
   			console.log('bonk');
   		}

		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start("Play", true, false, false);
		} else if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
			game.state.start("Play", true, false, true);
		}
	}
}

game.state.add("GameOver", GameOver);