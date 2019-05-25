"use strict";

/*
followObjects - If given an array of objects with x and y properties
will keep the camera centered in the middle of all of them
with no priority to any in particular

game - the game object to add this into
*/

// Creates an invisible sprite that the camera follows
var cameraCenter = function(game, followObjects) {
	// Save important arguments
	this.followObjects = followObjects;

	// An empty sprite that I create just because the camera needs a sprite to follow
	Phaser.Sprite.call(this, game, game.world.centerX, game.world.centerY, '');

	// This is useful later
	this.total = this.followObjects.length;

	// Make it real
	game.add.existing(this);

	// Add the final touch, change the lerp to your heart's desire
	game.camera.focusOn(this);
	game.camera.follow(this, 0.7, 0.7);

	console.log("new camera center object");
}

cameraCenter.prototype = Object.create(Phaser.Sprite.prototype);
cameraCenter.prototype.constructor = cameraCenter;

// Sets the position of 'this' to be the average (center) position
// of all the objects passed in the array
cameraCenter.prototype.update = function() {
	// Credit to Frentos
	// https://math.stackexchange.com/questions/1599095/how-to-find-the-equidistant-middle-point-for-3-points-on-an-arbitrary-polygon

	var newX = 0;
	var newY = 0;

	for (var i = 0; i < this.total; i++){
		newX += this.followObjects[i].x;
		newY += this.followObjects[i].y;
	}

	// The final touch
	this.x = newX/this.total;
	this.y = newY/this.total;
}