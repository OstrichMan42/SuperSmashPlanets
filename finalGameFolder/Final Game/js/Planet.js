"use strict";

var Planet = function(game, difficulty, player) {
	// Make the sprite when function is called
	Phaser.Sprite.call(this, game, game.width, 150, 'runnerSheet', 'Planet');
	console.log('new birb');

	// set necessary properties
	this.speed = 50 + difficulty * 0.5;
	this.player = player;
	this.difficulty = difficulty;

	game.physics.arcade.enable(this);
	game.add.existing(this);
	game.enemies.add(this);

	// Using the character movement tutorial that Nathan posted I made it so the bird always starts flying towards the player, I thought that was pretty neat
	this.body.velocity.x = ((player.body.x - this.body.x) * this.speed) / 300 - difficulty;
	this.body.velocity.y = ((player.body.y - this.body.y + 30) * this.speed) / 300 - difficulty;
	this.speed = this.body.velocity.x;
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.scale.x = 1.5;
	this.scale.y = 1.5;
}

Planet.prototype = Object.create(Phaser.Sprite.prototype);
Planet.prototype.constructor = Planet;

Planet.prototype.update = function() {

	if (this.player.hitBird){
		this.body.velocity.y = -200;
		this.body.velocity.x = -200;
		this.player.airborne = false;

		// Sometimes this drags the player with the bird, sometimes it drags them offscreen
		game.physics.arcade.moveToObject(this.player, this, 600);
	} else {

		if (this.player.airborne){
		this.body.velocity.x = this.speed - 95 - 1.5 * this.difficulty;
		} else{
			this.body.velocity.x = this.speed;
		}

		if (this.body.x < -50) this.kill;
	}
}