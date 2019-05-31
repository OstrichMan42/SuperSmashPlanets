"use strict";

var Tutorial = function(game) {};
Tutorial.prototype = {
	create: function() {
		var Tutorial = this.add.sprite(0, 0, 'instructions');
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start("MainMenu", true, false, true);
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			game.state.start("MainMenu", true, false, true);
		}
	}
}

game.state.add("Tutorial", Tutorial);