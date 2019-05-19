"use strict";

// Mass is the mass of the object
// character is the key of the sprite,
// player is 1 for player 1, 2 for player 2, or 0 for an asteroid
var Trail = function(game, sprite, trailArray) {
	console.log('new trail');

	// Save important arguments
	this.sprite = sprite;
	this.speed = sprite.body.velocity.getMagnitude();
	this.trailArray = trailArray;

	// Make the sprite when function is called
	Phaser.Particles.Arcade.Emitter.call(this, game, sprite.x, sprite.y, 120);
	this.minParticleSpeed = 0;
	this.maxParticleSpeed = 0;
	this.particleBringToTop = true;
	this.makeParticles([sprite.key]);

	this.start(false, 1500, 16);

	// Make the sprite when function is called
	// Phaser.Image.call(this, game, sprite.x, sprite.y, sprite.key);
	// this.tint = 0x828282;
	// this.scale = sprite.scale;
	// this.anchor.set(0.5);

	// Make the sprite when function is called
	// trail = game.add.image(sprite.x, sprite.y, sprite.key);
	// trail.tint = 0x828282;
	// trail.scale = sprite.scale;
	// trail.anchor.set(0.5);
	
	//trail.sendToBack();
	// for some reason this line messes up player top speed

	// Make it real
	//game.add.existing(this);

	// Fade out
	//game.add.tween(this).to({ alpha: 0 }, 1500, "Linear", true);

	// Shrink to death
	//game.add.tween(this).to({ scale: 0 }, 1500, "Linear", true);

	// Die after half a second
	// this.lifeTimer = game.time.create();
	// this.lifeTimer.add(1500, function() { 
	// 	console.log('killing trail');
	// 	this.trailArray.shift();
	// 	this.destroy(); });

	// Add some motion
	
	
	// console.log("new trail");
}

Trail.prototype = Object.create(Phaser.Image.prototype);
Trail.prototype.constructor = Trail;

Trail.prototype.update = function() {
	this.x = this.sprite.x;
	this.y = this.sprite.y;
}

function fadeOut (child) {

}