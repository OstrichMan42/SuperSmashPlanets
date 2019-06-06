"use strict";

var Tutorial = function(game) {};
Tutorial.prototype = {
	create: function() {
		// Make targets and players
		var bg = game.add.sprite(0, 0, this.bg);
		bg.scale.setTo(0.5, 1);

		// Create groups for players and asteroids
		game.players = game.add.group();
		// this.players.enableBody = true;
		game.asteroids = game.add.group();
		// this.asteroids.enableBody = true;

		// Create group for random space debris
		game.debris = game.add.group();
		game.debris.enableBody = true;

		// Start music
		
		// Enable physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
			
		// Make character 1
		this.player1 = new GBody(game, 700, "Earth", 1);
		this.player1.addChild(game.make.sprite(350, 0, "right"))
		this.player1.addChild(game.make.sprite(-350, 0, "left"))
		this.player1.addChild(game.make.sprite(0, -350, "up"))
		this.player1.addChild(game.make.sprite(0, 350, "down"))

		// Make character 2
		this.player2 = new GBody(game, 700, "Mars", 2);
		this.player2.addChild(game.make.sprite(350, 0, "right"))
		this.player2.addChild(game.make.sprite(-350, 0, "left"))
		this.player2.addChild(game.make.sprite(0, -350, "up"))
		this.player2.addChild(game.make.sprite(0, 350, "down"))

		// Make asteroid
		this.asteroid = new GBody(game, 500, 'asteroid', 0);
	},
	update: function() {
		// Handle Collisions
   		if (game.physics.arcade.collide(game.players)){
   			console.log('players bumped');
   		}
   		if (game.physics.arcade.collide(game.asteroids)){
   			console.log('asteroids bumped');
   		}
   		if (game.physics.arcade.collide(game.debris, game.players)){
   			console.log('bonk');
   		}
   		if (game.physics.arcade.collide(game.players, game.asteroids)){
   			console.log("you clown");
   		}

   		// Swap states
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start("MainMenu", true, false, true);
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			game.state.start("MainMenu", true, false, true);
		}
	}
}

game.state.add("Tutorial", Tutorial);