"use strict";

// Mass is the mass of the object
// character is the key of the sprite,
// player is 1 for player 1, 2 for player 2, or 0 for an asteroid
var GBody = function(game, mass, character, player) {
	// Save important arguments
	this.player = player;
	this.mass = mass;
	this.MASS = mass; // This value does not change past here
	var PLAYER_STARTING_DISTANCE = 300;

	// Set starting position based on player
	if (player == 2){
		var startX = game.world.centerX + PLAYER_STARTING_DISTANCE;
	} else if (player == 1){
		var startX = game.world.centerX - PLAYER_STARTING_DISTANCE;
	} else if (player == 0){
		var startX = game.world.centerX;
	} else if (player == 3){
		// console.log("making debris");
	} else {
		console.error('error: invalid player key');
	}

	// Set necessary controls
	if (player == 1) {
		// Make gravity key
		this.gravKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
    	this.gravKey.onDown.add(ChangeGravity, this);
	} else if (player == 2) {
		// Make controller
		this.cursors = game.input.keyboard.createCursorKeys();

		// Make gravity key
		this.gravKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
    	this.gravKey.onDown.add(ChangeGravity, this);
	} else if (player == 3){
		// If debris then make a sprite at 0,0 it gets moved later
		Phaser.Sprite.call(this, game, 0, 0, character);
	}

	// Make the sprite when function is called
	if (player != 3){
		Phaser.Sprite.call(this, game, startX, game.world.centerY, character);	
	}

	// Prepare for inevitable death
	if (this.player != 3){
		//this.events.onKilled.add(DeathAnimation, this);
	}
	
	// Make it real
	game.physics.arcade.enable(this);
	game.add.existing(this);

	// Put sprite in its proper group
	if (player == 0){
		game.asteroids.add(this);
		this.maxSpeed = 300;
		this.anchor.set(0.5);
		this.scale.setTo(0.11);
		// this one line makes a circular hitbox
		this.body.setCircle(150);
		this.body.bounce.set(1);

		// Add a timer to create a trail
		// game.time.events.loop(250, Trail, this, game, this);

		// Add an array to hold trails
		// this.trail = [];

		// Make trail
		this.trail = game.add.emitter(game, this.x, this.y, 120);

		// Fade out and shrink
		// Code swooped from https://codepen.io/luisfedrizze/pen/reqeyQ?editors=0010
		//this.trail.gravity = 0;
	    this.trail.maxParticleSpeed = 0;
	    this.trail.minRotation = 0;
	    this.trail.maxRotation = 0;
		this.trail.autoScale = false;
		// this.trail.frequency = 250;
	 	this.trail.setAlpha(1, 0, 500, Phaser.Easing.Quadratic.Out);
		this.trail.setScale(this.scale.x, 0, this.scale.y, 0, 500, Phaser.Easing.Quadratic.Out);
	 	this.trail.makeParticles(this.key);
	    // this.trail.start(false,3000,0);
	    // using flow
	    this.trail.flow(500, 5, 1, -1, true);

	} else if (player == 1 || player == 2){
		game.players.add(this);
		this.maxSpeed = 250;
		this.anchor.set(0.5);
		this.scale.setTo(0.1);
		if (this.player == 2) this.scale.x *= -1;
		// this one line makes a circular hitbox
		this.body.setCircle(300);
		this.body.drag.set(200);
		this.body.bounce.set(0.7);
		this.body.collideWorldBounds = true;

		//console.log(this);
	} else if (player == 3){
		game.debris.add(this);
		game.physics.arcade.enable(this);

		this.scale.setTo(0.1);
		this.anchor.set(0.5);
		this.body.setCircle(100);
		this.body.bounce.set(0.8);
		this.body.drag.setTo(20, 20);
	}
}

GBody.prototype = Object.create(Phaser.Sprite.prototype);
GBody.prototype.constructor = GBody;

GBody.prototype.update = function() {
	// For asteroid
	if (this.player == 0){
		// Run gravity
		Gravity.call(this, game.players.children);
  	 	this.body.velocity.clamp(-this.maxSpeed, this.maxSpeed);

  	 	// Check if the asteroid is out of the world, if it is then set it's max speed to something real small so it comes back quickly, also gives players time to react to something offscreen
	   	if (!this.inWorld) {
	   		this.maxSpeed = 10;
	   	} else if (this.maxSpeed == 10) {
	   		this.maxSpeed = 300
	   	}

		// Make trail follow
		this.trail.x = this.x;
		this.trail.y = this.y;
		this.bringToTop();

	// For player 1
	} else if (this.player == 1) {
		this.body.velocity.clamp(-this.maxSpeed, this.maxSpeed);

		if (game.input.keyboard.isDown(Phaser.Keyboard.A))
	    {
	        // Move left if pressing left
	        this.body.velocity.x += -game.PLAYERSPEED;
	    }
	    if (game.input.keyboard.isDown(Phaser.Keyboard.D))
	    {
	        // Move right if pressing right
	        this.body.velocity.x += game.PLAYERSPEED;
	    }
	    if (game.input.keyboard.isDown(Phaser.Keyboard.W))
	    {
	    	// Move up if pressing up
	        this.body.velocity.y += -game.PLAYERSPEED;
	    }
	    if (game.input.keyboard.isDown(Phaser.Keyboard.S))
	    {
	    	// Move down if pressing down
	        this.body.velocity.y += game.PLAYERSPEED;
	    }

	// For player 2
	} else if (this.player == 2) {
		this.body.velocity.clamp(-this.maxSpeed, this.maxSpeed);

		if (game.cursors.left.isDown)
	    {
	        // Move left if pressing left
	        this.body.velocity.x += -game.PLAYERSPEED;
	    }
	    if (game.cursors.right.isDown)
	    {
	        // Move right if pressing right
	        this.body.velocity.x += game.PLAYERSPEED;
	    }
	    if (game.cursors.up.isDown)
	    {
	    	// Move up if pressing up
	        this.body.velocity.y += -game.PLAYERSPEED;
	    }
	    if (game.cursors.down.isDown)
	    {
	    	// Move down if pressing down
	        this.body.velocity.y += game.PLAYERSPEED;
	    }
	} else if (this.player == 3) {
		// Run lightgravity
		game.players.forEach(LightGravity, this, true);
  	 	this.body.velocity.clamp(-300, 300);
	}
}

GBody.prototype.render = function() {
	// make sure this is on top of the trail
	if (this.player == 0) this.bringToTop();
}

function ChangeGravity () {
	if (this.mass == this.MASS || this.mass == this.MASS * 2.5){
		console.log('changing density');
		//Placeholder sound woosh
		game.woosh.play("", 0, 1, false);

		if (this.mass > this.MASS) {
			this.mass = this.MASS;
		}
		else {
			game.add.tween(this).to({mass: this.MASS * 2.5}, 1000, 'Linear', true);
		}
	}
}

function LightGravity (body) {
    // Calculate gravity

    // Make 4 placeholder points
    var destBody = new Phaser.Point(); // Destination
   	var thisBody = new Phaser.Point(); //This
   	var gravityVector = new Phaser.Point(); // Direction to destination
   	var velocityVector = new Phaser.Point(); // Velocity to add
	
	// Set points to be the x, y positions of sprites
   	destBody.copyFrom(body);
   	thisBody.copyFrom(this);

   	// Use phaser point distance function
   	var distance = thisBody.distance(destBody, true);
   	if (distance < 50) return;

   	// Create vector with direction towards destination
   	Phaser.Point.subtract(destBody, thisBody, gravityVector);
   	gravityVector.normalize();
   		
   	// Create a vector with magnitude greater than one 
   	gravityVector.clone(velocityVector);
   	velocityVector.setMagnitude(Math.min((body.mass/distance), 1));

   	// Alter velocity based on gravity
   	Phaser.Point.add(this.body.velocity, velocityVector, this.body.velocity);
}

function Gravity (planets) {	   
	/*
	This uses alot of Phaser.Point functionality, since 2d vectors are
	just 2 values .Point has functions for them as well

	Phaser.Point.add(point1, point2, [point3])
	Adds point 1 and 2 and returns the result. Also will store it in point 3 if it is given

	Phaser.Point.subtract(point1, point2, [point3])
	Subtracts point 2 from point 1 and returns the result. Also will store it in point 3 if it is given 
	*/ 
    // Calculate gravity

    // Value to subtract from distance to make gravity stronger. Bigger number = stronger gravity
    var spacing = 20;

    // Make 4 placeholder points
    var destBody = new Phaser.Point(); // The x and y of the destination
   	var thisBody = new Phaser.Point(); // The x and y of this
   	var gravityVector = new Phaser.Point(); // The direction that this need to move to reach the destination
   	var velocityVector = new Phaser.Point(); // The velocity to add to this

   	for (var i=0; i < planets.length; i++){
	   	// Set points to be the x, y positions of sprites
	   	destBody.copyFrom(planets[i]);
	   	thisBody.copyFrom(this);

	   	// Phaser has a distance function for points, it gives a number that is used to determine how strong the gravity will be
	   	var distance = thisBody.distance(destBody, true);
	   	var massDivider = Math.min(Math.max((distance-spacing)/2, 1), 500);

	   	// Create vector with direction towards the body that the asteroid is being pulled to
	   	Phaser.Point.subtract(destBody, thisBody, gravityVector);
	   	gravityVector.normalize();
	   		
	   	// Create a vector with magnitude greater than one 
	   	gravityVector.clone(velocityVector);
	   	velocityVector.setMagnitude(planets[i].mass/massDivider);
	   	// console.log(velocityVector);

	   	// Alter velocity based on gravity
	   	Phaser.Point.add(this.body.velocity, velocityVector, this.body.velocity);
	   	// .clamp keeps the value between the two numbers given, can be used to set a max speeds
	   	// This makes it so that the asteroid can pick up in speed if it is near a planet, and will slowly revert to its previous top speed if it gets farther away
   	}
   	if (distance < 125){
   		this.maxSpeed += 5;
   		// console.log(this.maxSpeed);
   	} else if (this.maxSpeed > 300){
   		this.maxSpeed -= 2;
   	}
}