"use strict";

var Play = function(game) {};

Play.prototype = {
	init: function(debug){
		// Necessary variables
		this.time;
		this.debug = debug;
		this.PLAYERSPEED = 15;

		// Make audio players
		this.musicPlayer = game.add.audio('music');
	},
	create: function() {
		// Start music
		this.musicPlayer.play("", 0, 1, true);

		// Create groups for players and asteroids
		game.players = game.add.group();
		// this.players.enableBody = true;
		game.asteroids = game.add.group();
		// this.asteroids.enableBody = true;

		// Start music
		
		// Enable physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
			
		// Make character 1
		this.earth = new Planet(game, 500, 'earth', 1);

		// Make character 2
		this.mars = new Planet(game, 500, 'mars', 2);

		// Make asteroid
		this.asteroid = new Planet(game, 500, 'asteroid', 0);

	    // Any starting velocity for the asteroid
		// this.asteroid.body.velocity.y = -50;
		// this.asteroid.body.velocity.x = -10;
		
		// Make controller
		this.cursors = game.input.keyboard.createCursorKeys();

		// Make a timer for spawning bits
		// help from http://jsfiddle.net/lewster32/vd70o41p/ and phaser documentation
		// this.time = game.time.create();
		// this.time.start();

		game.stage.backgroundColor = "#000000";

		// Used for debugging some code from https://phaser.io/examples/v2/sprites/anchor
		this.p1Point = new Phaser.Point();
		this.p2Point = new Phaser.Point();
		this.astPoint = new Phaser.Point();
		if (this.debug) game.stage.backgroundColor = "#82371a";
	},

	update: function() {
		// run game loop
		// var vX;
    	// var vY;
   		
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			console.log(distance);
			console.log(this.asteroid.body.velocity);
		}

		// Player input
		if (game.input.keyboard.isDown(Phaser.Keyboard.A))
	    {
	        // Move left if pressing left
	        this.earth.body.velocity.x += -this.PLAYERSPEED;
	    }
	    if (game.input.keyboard.isDown(Phaser.Keyboard.D))
	    {
	        // Move right if pressing right
	        this.earth.body.velocity.x += this.PLAYERSPEED;
	    }
	    if (game.input.keyboard.isDown(Phaser.Keyboard.W))
	    {
	    	// Move up if pressing up
	        this.earth.body.velocity.y += -this.PLAYERSPEED;
	    }
	    if (game.input.keyboard.isDown(Phaser.Keyboard.S))
	    {
	    	// Move down if pressing down
	        this.earth.body.velocity.y += this.PLAYERSPEED;
	    }
		if (this.cursors.left.isDown)
	    {
	        // Move left if pressing left
	        this.mars.body.velocity.x += -this.PLAYERSPEED;
	    }
	    if (this.cursors.right.isDown)
	    {
	        // Move right if pressing right
	        this.mars.body.velocity.x += this.PLAYERSPEED;
	    }
	    if (this.cursors.up.isDown)
	    {
	    	// Move up if pressing up
	        this.mars.body.velocity.y += -this.PLAYERSPEED;
	    }
	    if (this.cursors.down.isDown)
	    {
	    	// Move down if pressing down
	        this.mars.body.velocity.y += this.PLAYERSPEED;
	    }

   		// Handle Collisions
   		if (game.physics.arcade.collide(game.players)){
   			console.log('players bumped');
   		}
   		if (game.physics.arcade.collide(game.asteroids)){
   			console.log('asteroids bumped');
   		}

   		// Player gets hit
   		if (game.physics.arcade.collide(this.earth, game.asteroids)){
   			console.log('earth bumped an asteroid');
   			this.musicPlayer.stop();
   			game.state.start('GameOver', false, false, this.mars);
   		}
   		if (game.physics.arcade.collide(this.mars, game.asteroids)){
   			console.log('mars bumped an asteroid');
   			this.musicPlayer.stop();
   			game.state.start('GameOver', false, false, this.earth);
   		}

   		// Debug stuff
   		if (this.debug){
   			this.p1Point.copyFrom(this.earth);
			this.p2Point.copyFrom(this.mars);
			this.astPoint.copyFrom(this.asteroid);
   		}
	},

	render: function() {
		if (this.debug){
			game.debug.geom(this.p1Point, '#1546c1');
			game.debug.geom(this.p2Point, '#c13715');
			game.debug.geom(this.astPoint, '#562d13');
			game.debug.body(this.earth);
			game.debug.body(this.mars);
			game.debug.body(this.asteroid);
		}
	}
}
game.state.add("Play", Play);