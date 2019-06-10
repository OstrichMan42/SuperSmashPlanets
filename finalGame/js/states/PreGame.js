"use strict";

var PreGame = function(game) {};
PreGame.prototype = {
	init: function() {

	},
	preload: function() {
		
	},
	create: function() {

		//Drawn Text sprites
		this.selection = game.add.sprite(175, 50, 'selection');
		this.selection.scale.setTo(0.5);
		this.vs = game.add.sprite(290 , 300, 'vs');
		this.vs.scale.setTo(0.15);
		this.NumberofRounds = game.add.sprite(0, 450, 'NumberofRounds');
		this.NumberofRounds.scale.setTo(0.5);

		//Up and Down keys
		this.up = game.add.sprite(400, 525, 'up');
		this.down = game.add.sprite(400, 600, 'down');

		//A and D key for left planet
		this.aKey = game.add.sprite(240, 400, 'A');
		this.dKey = game.add.sprite(100, 400, 'D');


		//left planet switch off
		this.p1Select = new ScrollingMenu(game, ['Earth', 'Mars', 'Nathan'], game.world.centerX - 150, game.world.centerY, Phaser.Keyboard.A, Phaser.Keyboard.D);
		this.p1Select.scale.setTo(0.2);


		//right and left arrows for right planet
		this.right = game.add.sprite(535, 400, 'right');
		this.left = game.add.sprite(400, 400, 'left');

		//Right planet switch off
		this.p2Select = new ScrollingMenu(game, ['Mars', 'Earth', 'Nathan'], game.world.centerX + 150, game.world.centerY, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT);
		this.p2Select.scale.setTo(0.2);
		this.p2Select.scale.x *= -1;

		//Number of Rounds switch off
		this.roundselect = new ScrollingMenu(game, ['one', 'five', 'three'], game.world.centerX + 200, game.world.centerY + 250, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN);
		this.roundselect.scale.setTo(0.25);

		// instructions
		var text = "Press enter to start";
		this.gameOverText = game.add.text(game.world.centerX - 100, 50, text, { fontSize: '30px', fill: '#ffffff', align: 'center'});

		console.log("PreGame created");
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
			if (this.p1Select.currentKey == this.p2Select.currentKey){
				console.log("Doppleplanets");
			}
			game.chillMusicPlayer.stop();
			game.state.start("Play", true, false, false, [this.roundselect.currentIndex, 0, 0], 'spaceBackground', [this.p1Select.currentKey, this.p2Select.currentKey]);
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			game.state.start("MainMenu", true, false, true);
		}
	}
}

game.state.add("PreGame", PreGame);