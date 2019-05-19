"use strict";

// Mass is the mass of the object
// character is the key of the sprite,
// player is 1 for player 1, 2 for player 2, or 0 for an asteroid
var Planet = function(game, mass, character, player) {
	// Save important arguments
	this.player = player;
	this.mass = mass;
	this.MASS = mass; // This value does not change past here
	//this.trail = [];
	var PLAYER_STARTING_DISTANCE = 300;

	// Set starting position based on player
	if (player == 2){
		var startX = game.world.centerX + PLAYER_STARTING_DISTANCE;
	} else if (player == 1){
		var startX = game.world.centerX - PLAYER_STARTING_DISTANCE;
	} else if (player == 0){
		var startX = game.world.centerX;
	} else {
		console.error('error: invalid player key');
	}

	// Make the sprite when function is called
	Phaser.Sprite.call(this, game, startX, game.world.centerY, character);

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
		// for fun times
		// this.body.collideWorldBounds = true;
		this.body.bounce.set(2);

		// Add a timer to create a trail
		// game.time.events.loop(250, Trail, this, game, this);

		// Add a trail
		// this.trail = new Trail(game, this, []);

	} else if (player == 1 || player == 2){
		game.players.add(this);
		this.maxSpeed = 250;
		this.anchor.set(0.5);
		this.scale.setTo(0.12);
		// this one line makes a circular hitbox
		this.body.setCircle(300);
		this.body.drag.set(200);
		this.body.bounce.set(1.1);
		this.body.collideWorldBounds = true;
		console.log(this);
	}
}

Planet.prototype = Object.create(Phaser.Sprite.prototype);
Planet.prototype.constructor = Planet;

Planet.prototype.update = function() {
	// For asteroid
	if (this.player == 0){
		// Run gravity
		game.players.forEach(Gravity, this, true);
  	 	this.body.velocity.clamp(-this.maxSpeed, this.maxSpeed);

		// Make a trail
		//this.trail.push(new Trail(game, this, this.trail));
		//this.bringToTop();

	// For player 1
	} else if (this.player == 1) {
		this.body.velocity.clamp(-this.maxSpeed, this.maxSpeed);
		if(game.input.keyboard.isDown(Phaser.Keyboard.E)){
			this.mass = this.MASS * 3;
		} else {
			this.mass = this.MASS;
		}

	// For player 2
	} else if (this.player == 2) {
		this.body.velocity.clamp(-this.maxSpeed, this.maxSpeed);
		if(game.input.keyboard.isDown(Phaser.Keyboard.M)){
			this.mass = this.MASS * 3;
		} else {
			this.mass = this.MASS;
		}
	}
}

function Gravity (planet) {	   
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
    var spacing = 25;

    // Make 4 placeholder points
    var destBody = new Phaser.Point(); // The x and y of the destination
   	var thisBody = new Phaser.Point(); // The x and y of this
   	var gravityVector = new Phaser.Point(); // The direction that this need to move to reach the destination
   	var velocityVector = new Phaser.Point(); // The velocity to add to this
	
	// Set points to be the x, y positions of sprites
   	destBody.copyFrom(planet);
   	thisBody.copyFrom(this);

   	// Phaser has a distance function for points, it gives a number that is used to determine how strong the gravity will be
   	var distance = thisBody.distance(destBody, true);
   	var massDivider = Math.min(Math.max((distance-spacing)/2, 1), planet.mass);

   	// Create vector with direction towards the body that the asteroid is being pulled to
   	Phaser.Point.subtract(destBody, thisBody, gravityVector);
   	gravityVector.normalize();
   		
   	// Create a vector with magnitude greater than one 
   	gravityVector.clone(velocityVector);
   	velocityVector.setMagnitude(planet.mass/massDivider);
   	// console.log(velocityVector);

   	// Alter velocity based on gravity
   	Phaser.Point.add(this.body.velocity, velocityVector, this.body.velocity);
   	// .clamp keeps the value between the two numbers given, can be used to set a max speeds
   	// This makes it so that the asteroid can pick up in speed if it is near a planet, and will slowly revert to its previous top speed if it gets farther away
   	if (distance < 125){
   		this.maxSpeed += 5;
   		// console.log(this.maxSpeed);
   	} else if (this.maxSpeed > 300){
   		this.maxSpeed -= 2;
   	}

   	// Check if the asteroid is out of the world, if it is then set it's max speed to something real small so it comes back quickly, also gives players time to react to something offscreen
   	if (!this.inWorld){
   		this.maxSpeed = 10;
   	} else if (this.maxSpeed == 10){
   		this.maxSpeed = 250
   	}
}