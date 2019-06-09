"use strict";

var Tutorial = function(game) {};
Tutorial.prototype = {
	create: function() {
		// Make background
		var bg = game.add.sprite(0, 0, 'spaceBackground');
		bg.scale.setTo(0.5, 1);
		game.PLAYERSPEED = 25;

		// Add instructions
		var text = "Player 1 is earth, Player 2 is mars.\nBreak targets and practice.\nPress space to go back.";
		var tutorialText = game.add.text(10, 10, text, { fontSize: '30px', fill: '#ffffff'});

		// Create groups for players and asteroids
		game.players = game.add.group();
		// this.players.enableBody = true;
		game.asteroids = game.add.group();
		// this.asteroids.enableBody = true;

		// Create group for random space debris
		game.debris = game.add.group();
		game.debris.enableBody = true;

		// Make targets and players
		// Enable physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		// Make character 1
		this.player1 = new GBody(game, 700, "Earth", 1);
		// Make instructions
		var button = game.make.sprite(550, 0, "D");
		button.scale.setTo(5.5);
		button.anchor.set(0.5);
		this.player1.addChild(button);
		button = game.make.sprite(-550, 0, "A");
		button.scale.setTo(5.5);
		button.anchor.set(0.5);
		this.player1.addChild(button);
		button = game.make.sprite(0, -550, "W");
		button.scale.setTo(5.5);
		button.anchor.set(0.5);
		this.player1.addChild(button);
		button = game.make.sprite(0, 550, "S");
		button.scale.setTo(5.5);
		button.anchor.set(0.5);
		this.player1.addChild(button);

		// Make character 2
		this.player2 = new GBody(game, 700, "Mars", 2);
		// Make instructions
		var button = game.make.sprite(550, 0, "right");
		button.scale.setTo(5.5);
		button.anchor.set(0.5);
		this.player2.addChild(button);
		button = game.make.sprite(-550, 0, "left");
		button.scale.setTo(5.5);
		button.anchor.set(0.5);
		this.player2.addChild(button);
		button = game.make.sprite(0, -550, "up");
		button.scale.setTo(5.5);
		button.anchor.set(0.5);
		this.player2.addChild(button);
		button = game.make.sprite(0, 550, "down");
		button.scale.setTo(5.5);
		button.anchor.set(0.5);
		this.player2.addChild(button);

		// Make asteroid
		this.asteroid = new GBody(game, 500, 'asteroid', 0);

		// Make targets
   		this.target1 = makeTarget();
   		this.target2 = makeTarget();
   		game.physics.arcade.enable(this.target1);
	   	this.target1.body.setCircle(300);
	   	this.target1.scale.setTo(0.1);
	   	this.target1.anchor.set(0.5);
	   	game.physics.arcade.enable(this.target2);
	   	this.target2.body.setCircle(300);
	   	this.target2.scale.setTo(0.1);
	   	this.target2.anchor.set(0.5);
	},
	update: function() {
		// Clean up
		if (game.debris.children.length > 10) {
			//game.debris.forEach(function(kid) {kid.destroy();}, this, true);
			game.debris.destroy(true, true);
			//console.log(game.debris.children.length);
		}

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
   		// Target gets hit
   		if (game.physics.arcade.overlap(this.target1, game.asteroids, targetHit, null, this)){
   		}
   		if (game.physics.arcade.overlap(this.target2, game.asteroids, targetHit, null, this)){
   		}

   		// Swap states
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start("MainMenu", true, false, true);
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			game.state.start("MainMenu", true, false, true);
		}
	},
	render: function() {
		// game.debug.body(this.target1);
		// game.debug.body(this.target2);
	}
}

function targetHit (target, asteroid) {
	console.log('player1 bumped an asteroid');
	console.log(target);
   	//this.musicPlayer.stop();
   	breakAnimation(target);
   	this.target1.destroy();
   	this.target2.destroy();
   	
	console.log("ding");
   	this.target1 = makeTarget();
   	this.target2 = makeTarget();
   	game.physics.arcade.enable(this.target1);
   	this.target1.body.setCircle(300);
   	this.target1.scale.setTo(0.1);
   	this.target1.anchor.set(0.5);
   	game.physics.arcade.enable(this.target2);
   	this.target2.body.setCircle(300);
   	this.target2.scale.setTo(0.1);
   	this.target2.anchor.set(0.5);

}

function makeTarget () {
	console.log("new target");
	let points = [100, 200, 300, 400, 500, 600];
	// This line from https://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
	let x = points[Math.floor(Math.random()*points.length)];
	let y = points[Math.floor(Math.random()*points.length)];
	return game.add.sprite(x, y, "Target");
}

// Death animation for targets
function breakAnimation (obj) {
	var newKey = obj.key + "Piece";
	for (var i = 1; i <= 5; i++){
		// console.log(newKey + i);
		var debris = new GBody(game, 5, newKey + i, 3);
		debris.x = obj.x + game.rnd.integerInRange(-20, 20);
		debris.y = obj.y + game.rnd.integerInRange(-20, 20);
		debris.body.velocity.setTo(obj.body.velocity.x + game.rnd.integerInRange(-10, 10), obj.body.velocity.y + game.rnd.integerInRange(-10, 10));
		debris.body.angularVelocity = game.rnd.integerInRange(-55, 55);
	}
}

game.state.add("Tutorial", Tutorial);