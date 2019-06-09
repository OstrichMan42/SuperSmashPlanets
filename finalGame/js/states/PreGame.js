"use strict";

var PreGame = function(game) {};
PreGame.prototype = {
	init: function() {

	},
	preload: function() {

	},
	create: function() {
		this.p1Select = new ScrollingMenu(game, ['Earth', 'Mars', 'Nathan'], game.world.centerX - 150, game.world.centerY, Phaser.Keyboard.A, Phaser.Keyboard.D);
		this.p1Select.scale.setTo(0.2);

		this.p2Select = new ScrollingMenu(game, ['Mars', 'Earth', 'Nathan'], game.world.centerX + 150, game.world.centerY, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT);
		this.p2Select.scale.setTo(0.2);
		this.p2Select.scale.x *= -1;
		console.log("PreGame created");
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
			if (this.p1Select.currentKey == this.p2Select.currentKey){
				console.log("Doppleplanets");
			}
			game.chillMusicPlayer.stop();
			game.state.start("Play", true, false, false, [2, 0, 0], 'spaceBackground', [this.p1Select.currentKey, this.p2Select.currentKey]);
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			game.state.start("MainMenu", true, false, true);
		}
	}
}

game.state.add("PreGame", PreGame);