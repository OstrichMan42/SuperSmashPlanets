"use strict";

var GameOver = function(game) {};
GameOver.prototype = {
	init: function() {
	},
	preload: function() {
		console.log("loaded game over");
	},
	create: function() {
		game.stage.backgroundColor = "#0000"
		console.log("game over created");
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start("Play");
		}
	}
}

game.state.add("GameOver", GameOver);