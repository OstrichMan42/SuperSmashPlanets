"use strict";

var Tutorial = function(game) {};
Tutorial.prototype = {
	create: function() {
		var Tutorial = this.add.sprite(0, 0, 'instructions');
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start("Play", true, false, false, [2, 0, 0]);
		}
	}
}

game.state.add("Tutorial", Tutorial);