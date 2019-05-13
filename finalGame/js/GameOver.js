"use strict";

var GameOver = function(game) {};
GameOver.prototype = {
	init: function(winner, score) {
		this.winner = winner;
		this.score = score;
	},
	preload: function() {
		console.log("loaded game over");
	},
	create: function() {
		console.log("game over created");
		var text = "Player " + this.winner.player + " wins!\nPress space to play again";
		var gameOverText = game.add.text(game.world.centerX - 150, game.world.centerY - 50, text, { fontSize: '30px', fill: '#ffffff', align: 'center'});
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start("Play");
		}
	}
}

game.state.add("GameOver", GameOver);