"use strict";

var PreGame = function(game) {};
PreGame.prototype = {
	init: function() {

	},
	preload: function() {

	},
	create: function() {
		
		//Planet selection sprite
		this.selection = game.add.sprite(100, 0, 'SelectPlanet');
		this.selection.scale.setTo(0.5);

		//Player 1 selection
		this.p1Select = new ScrollingMenu(game, ['Earth', 'Mars'], game.world.centerX - 150, game.world.centerY, Phaser.Keyboard.A, Phaser.Keyboard.D);
		this.p1Select.scale.setTo(0.2);

		//A and D sprite placement
		this.A = game.add.sprite(80, 400, 'A');

		//Player 2 selections
		this.p2Select = new ScrollingMenu(game, ['Mars', 'Earth'], game.world.centerX + 150, game.world.centerY, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT);
		this.p2Select.scale.setTo(0.2);
		this.p2Select.scale.x *= -1;
		console.log("PreGame created");

		//Right and left sprite placement
		this.left = game.add.sprite(380, 400, 'leftArrow');
		this.right = game.add.sprite(550, 400, 'rightArrow');

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