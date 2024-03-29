"use strict";

var Play = function(game) {};

Play.prototype = {
	init: function(debug, score, bg, playerSprites, wins){
		// Necessary variables
		this.bg = bg;
		//console.log(bg);
		
		this.time;
		this.debug = debug;
		this.score = score;
		this.woosh;
		this.playerSprites = playerSprites;
		if (wins != null) this.wins = wins;

		game.PLAYERSPEED = 25;

		// Make audio players
		if(game.musicPlayer == null) game.musicPlayer = game.add.audio('music');
		if(game.woosh == null) game.woosh = game.add.audio('woosh');
		if(game.explosion == null) game.explosion = game.add.audio('explosion');
		if(game.boing == null) game.boing = game.add.audio('boing');
	},
	create: function() {
		// Realtime is best time
		game.time.slowMotion = 1;

		// Start music
		if(!game.musicPlayer.isPlaying) {
			game.musicPlayer.fadeIn(3000, true);
			game.chillMusicPlayer.play("", 0, 0, true);
		}
		else {
			game.musicPlayer.fadeTo(5000, 1);
			game.chillMusicPlayer.fadeTo(1500, 0.01);
		}

		// Make round UI
		if (this.score[1] == 0 && this.score[2] == 0) {
			// New game
			var bg = game.add.sprite(0, 0, this.bg);
			bg.scale.setTo(0.5, 1);
			
			var roundUI = game.add.sprite(0, 0, "RoundBar");
			roundUI.scale.setTo(0.5);
			roundUI.alpha = 0.5;
			roundUI = game.add.sprite(game.world.width, 0, "RoundBar");
			roundUI.scale.setTo(0.5);
			roundUI.alpha = 0.5;
			//roundUI.anchor.x = 1;
			roundUI.scale.x *= -1;

			// Make dots to show score
			this.wins = [];
			for (var i = 0; i < this.score[0] * 2; i++) {
				if (i < this.score[0]) {
					console.log("p1 ui");
					this.wins.push(game.add.sprite(20 + i * (150 / this.score[0]), 25, 'RoundNotWin'));
				} else {
					console.log("p2 ui");
					this.wins.push(game.add.sprite(game.world.width - 20 -((i-this.score[0]) * (150 / this.score[0])), 25, 'RoundNotWin'));
				}

				this.wins[i].anchor.set(0.5);
				this.wins[i].scale.setTo(0.5);
			}
		} else {
			// Continuing game

		}
		
		// Create groups for players and asteroids
		game.players = game.add.group();
		// this.players.enableBody = true;
		game.asteroids = game.add.group();
		// this.asteroids.enableBody = true;

		// Create group for random space debris
		game.debris = game.add.group();
		game.debris.enableBody = true;
		
		// Enable physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
			
		// Make character 1
		this.player1 = new GBody(game, 700, this.playerSprites[0], 1);

		// Make character 2
		this.player2 = new GBody(game, 700, this.playerSprites[1], 2);

		// Make asteroid
		this.asteroid = new GBody(game, 500, 'asteroid', 0);

		// Make a timer for spawning obstacles
		// help from http://jsfiddle.net/lewster32/vd70o41p/ and phaser documentation
		this.time = game.time.create();
		this.spawnTimer = this.time.add(20000, MakeAsteroid, this);
		this.time.start();
		
		game.stage.backgroundColor = "#000000";

		// Used for debugging some code from https://phaser.io/examples/v2/sprites/anchor
		this.p1Point = new Phaser.Point();
		this.p2Point = new Phaser.Point();
		this.astPoint = new Phaser.Point();
		this.camPoint = new Phaser.Point();
		if (this.debug) game.stage.backgroundColor = "#82371a";
	},

	update: function() {
		// run game loop
		// Get the x,y coordinates from these sprites
		this.p1Point.copyFrom(this.player1);
		this.p2Point.copyFrom(this.player2);
		this.astPoint.copyFrom(this.asteroid);

   		// Handle Collisions
   		if (game.physics.arcade.collide(game.players)){
   			console.log('players bumped');
   		}
   		if (game.physics.arcade.collide(game.asteroids)){
   			console.log('asteroids bumped');
   		}
   		if (game.physics.arcade.collide(game.debris, game.players)){
   			console.log('bonk');
   			game.boing.play("", 0, 1, false);
   		}

   		// Player gets hit
   		if (game.physics.arcade.collide(game.players, game.asteroids, playerHit, null, this)){
   			console.log("it's a mystery????");

   			game.explosion.play("", 0, 1, false);
   		}

   		if(game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
   			game.musicPlayer.stop();
			game.state.start("MainMenu", true, false, true);
		}
	},

	render: function() {
		if (this.debug){
			game.debug.geom(this.p1Point, '#1546c1');
			game.debug.geom(this.p2Point, '#c13715');
			game.debug.geom(this.astPoint, '#562d13');
			//game.debug.geom(this.camPoint, '#ffffff');
			game.debug.body(this.player1);
			game.debug.body(this.player2);
			game.debug.body(this.asteroid);
		}
	}
}

// Is run when player gets hit by an asteroid
function playerHit (loser, asteroid) {
	console.log('player1 bumped an asteroid');
   	//this.musicPlayer.stop();
   	if (loser.player == 1) {
			var winner = this.player2;
	} else {
			var winner = this.player1;
	}
	if (winner.player == 1) {
		this.score[1] += 1;
	} else if (winner.player == 2) {
		this.score[2] += 1;
	}
   	loser.kill();
   	DeathAnimation(loser);
   	asteroid.kill();
   	DeathAnimation(asteroid);
   	//this.cameraCenter.destroy();
   	
	// console.log(winner);
   	game.state.start('GameOver', false, false, loser, winner, this.score, this.bg, this.playerSprites, this.wins);
}

// Death animation for various objects
function DeathAnimation (obj) {
	var newKey = obj.key + "Piece";
	for (var i = 1; i <= 5; i++){
		// console.log(newKey + i);
		var debris = new GBody(game, 5, newKey + i, 3);
		debris.x = obj.x + game.rnd.integerInRange(-20, 20);
		debris.y = obj.y + game.rnd.integerInRange(-20, 20);
		debris.body.velocity.setTo(obj.body.velocity.x/2 + game.rnd.integerInRange(-10, 10), obj.body.velocity.y/2 + game.rnd.integerInRange(-10, 10));
		debris.body.angularVelocity = game.rnd.integerInRange(-55, 55);
	}
	if (obj.player == 0){
		obj.trail.destroy();
	}
	obj.destroy();
}

function MakeAsteroid () {
	console.log("sudden death");
	// Makes an asteroid off the top or bottom of the screen at random
	let x = game.rnd.integerInRange(0, game.world.width);
	let offscreen = [-35, game.world.height + 35];
	// This line from https://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
	let y = offscreen[Math.floor(Math.random()*offscreen.length)];
	var ast = new GBody(game, 500, 'asteroid', 0);
	ast.x = x;
	ast.y = y;

	this.spawnTimer = this.time.add(15000, MakeAsteroid, this);
}

game.state.add("Play", Play);