"use strict";

// Mass is the mass of the object
// character is the key of the sprite,
// player is 1 for player 1, 2 for player 2, or 0 for an asteroid
var Trail = function(game, sprite) {
	//console.log('new trail');

	// Save important arguments
	this.sprite = sprite;
	this.speed = sprite.body.velocity.getMagnitude();
	// Make it look nice
	// this.tint = 0xffffff;
	// this.scale = sprite.scale;
	// this.anchor.set(0.5);

	// Trail as a particle emitter
	// Make it real
	// game.physics.arcade.enable(this);
	Phaser.Particles.Arcade.Emitter.call(this, game, sprite.x, sprite.y, 120);
	game.add.existing(this);
	console.log(this);

	// Fade out and shrink
	// Code swooped from https://codepen.io/luisfedrizze/pen/reqeyQ?editors=0010
	this.gravity = 0;
    this.maxParticleSpeed = 0;
    this.minRotation = 0;
    this.maxRotation = 0;
	this.autoScale = false;
 	// this.setAlpha(1, 0, 1500);
	// this.setScale(1,0,1,0,1500,'Linear');
 	// this.makeParticles(sprite.key);
    // this.start(false,3000,0);

	// Make sure the sprite is on top of the trail
	// sprite.bringToTop();

	// Trail as a particle emitter
	// Phaser.Particles.Arcade.Emitter.call(this, game, sprite.x, sprite.y, 120);
	// this.minParticleSpeed = 0;
	// this.maxParticleSpeed = 0;
	// this.particleBringToTop = true;
	// this.makeParticles([sprite.key]);

	// this.start(false, 1500, 16);
}

Trail.prototype = Object.create(Phaser.Image.prototype);
Trail.prototype.constructor = Trail;

Trail.prototype.update = function() {
	
}