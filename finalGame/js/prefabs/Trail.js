"use strict";

// Mass is the mass of the object
// character is the key of the sprite,
// player is 1 for player 1, 2 for player 2, or 0 for an asteroid
var Trail = function(game, sprite) {
	// Save important arguments
	this.speed = sprite.body.velocity.getMagnitude();

	// Make the sprite when function is called
	Phaser.Sprite.call(this, game, sprite.x, sprite.y, sprite.key);
	this.tint = 0x828282;
	this.scale = sprite.scale;
	this.anchor.set(0.5);
	this.alpha = 0.5;
	this.sendToBack();

	// Make it real
	game.physics.arcade.enable(this);
	game.add.existing(this);

	// Add some motion
	this.body.angularVelocity = this.speed;
	
	console.log("new asteroid trail");
}

Trail.prototype = Object.create(Phaser.Sprite.prototype);
Trail.prototype.constructor = Trail;

Trail.prototype.update = function() {
	console.log("here");
	if (this.scale <= 0.01){
		this.destroy();
	} else {
		this.scale -= 0.01;
	}
}