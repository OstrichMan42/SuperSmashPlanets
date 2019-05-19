"use strict";

// Mass is the mass of the object
// character is the key of the sprite,
// player is 1 for player 1, 2 for player 2, or 0 for an asteroid
var cameraCenter = function(game, followObjects) {
	// Save important arguments
	this.followObjects = followObjects;

	// An empty sprite that I create just because the camera needs a sprite to follow
	Phaser.Sprite.call(this, game, game.world.centerX, game.world.centerY, '');

	// This is useful later
	this.total = this.followObjects.length;

	// Make it real
	game.add.existing(this);

	// And the final line
	game.camera.follow(this, 0.7, 0.7);

	console.log("new camera center object");
}

cameraCenter.prototype = Object.create(Phaser.Sprite.prototype);
cameraCenter.prototype.constructor = cameraCenter;

cameraCenter.prototype.update = function() {
	// Thanks to Frentos
	// https://math.stackexchange.com/questions/1599095/how-to-find-the-equidistant-middle-point-for-3-points-on-an-arbitrary-polygon

	var newX = 0;
	var newY = 0;

	for (var i = 0; i < this.total; i++){
		newX += this.followObjects[i].x;
		newY += this.followObjects[i].y;
	}

	this.x = newX/this.total;
	this.y = newY/this.total;
}