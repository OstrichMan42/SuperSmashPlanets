"use strict";

var Instructions = function(game) {};
Instructions.prototype = {
	create: function() {
		var Instructions = this.add.sprite(0, 0, 'instructions');
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start("Play");
		}
	}
}

game.state.add("Instructions", Instructions);