"use strict";

var Play = function(game) {};

Play.prototype = {
	init: function(debug, score, bg){
		// Necessary variables
		this.bg = bg;
		console.log(bg);
		this.time;
		this.debug = debug;
		game.PLAYERSPEED = 25;
		this.score = score;
	},
	create: function() {
		// Realtime is best time
		game.time.slowMotion = 1;

		// Start music
		if(!game.musicPlayer.isPlaying) game.musicPlayer.play("", 0, 1, true);

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
		this.earth = new GBody(game, 700, 'earth', 1);

		// Make character 2
		this.mars = new GBody(game, 700, 'mars', 2);

		// Make asteroid
		this.asteroid = new GBody(game, 500, 'asteroid', 0);

	    // Any starting velocity for the asteroid
		// this.asteroid.body.velocity.y = -50;
		// this.asteroid.body.velocity.x = -10;
		
		// Make controller
		game.cursors = game.input.keyboard.createCursorKeys();

		// Make a timer for timing
		// this.time = game.time.create();
		// this.time.start();

		// An empty sprite that I create just because the camera needs a sprite to follow
		// this.cameraCenter = game.add.sprite(0, 0, '');
		// game.camera.follow(this.cameraCenter, 0.7, 0.7);
		this.cameraCenter = new cameraCenter(game, [this.earth, this.mars]);

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
		this.p1Point.copyFrom(this.earth);
		this.p2Point.copyFrom(this.mars);
		this.astPoint.copyFrom(this.asteroid);
		this.camPoint.copyFrom(this.cameraCenter);

		// Get camera center from earth position and mars
		// Phaser.Point.interpolate(this.p1Point, this.p2Point, 0.5).copyTo(this.cameraCenter);

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
   		// if (game.physics.arcade.collide(game.debris)){
   		// 	console.log('bink');
   		// }

   		// Player gets hit
   		if (game.physics.arcade.collide(game.players, game.asteroids, playerHit, null, this)){
   			console.log("it's a mystery????");
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
			game.debug.geom(this.camPoint, '#ffffff');
			game.debug.body(this.earth);
			game.debug.body(this.mars);
			game.debug.body(this.asteroid);
		}
	}
}

// Is run when player gets hit by an asteroid
function playerHit (loser, asteroid) {
	console.log('earth bumped an asteroid');
   	//this.musicPlayer.stop();
   	if (loser.player == 1) {
			var winner = this.mars;
	} else {
			var winner = this.earth;
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
   	this.cameraCenter.destroy();
   	
	console.log("right before gameover jump");
   	game.state.start('GameOver', false, false, loser, winner, this.score, this.bg);
}

// Death animation for various objects
function DeathAnimation (obj) {
	var newKey = obj.key + "Piece";
	game.time.slowMotion = 3;
	// game.add.tween(game.time).to({slowMotion: 1}, 1000, Phaser.Easing.Cubic.Out, true);
	for (var i = 1; i <= 5; i++){
		// console.log(newKey + i);
		var debris = new GBody(game, 5, newKey + i, 3);
		debris.x = obj.x + game.rnd.integerInRange(-20, 20);
		debris.y = obj.y + game.rnd.integerInRange(-20, 20);
		debris.body.velocity.setTo(obj.body.velocity.x + game.rnd.integerInRange(-10, 10), obj.body.velocity.y + game.rnd.integerInRange(-10, 10));
		debris.body.angularVelocity = game.rnd.integerInRange(-55, 55);
	}
	if (obj.player == 0){
		obj.trail.destroy();
	}
	obj.destroy();
}

game.state.add("Play", Play);