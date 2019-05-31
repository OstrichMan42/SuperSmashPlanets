"use strict";

var PreGame = function(game) {};
PreGame.prototype = {
	init: function() {

	},
	preload: function() {

	},
	create: function() {
		
		console.log("PreGame created");
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
			game.chillMusicPlayer.stop();
			game.state.start("Play", true, false, true, [2, 0, 0], 'spaceBackground');
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			game.state.start("MainMenu", true, false, true);
		}
	}
}

game.state.add("PreGame", PreGame);