"use strict";

/*
keys - Array of keys of images to display

game - the game object to add this into

x, y - position of this object

prevKey - Phaser keycode to go to the left node

nextKey - Phaser keycode to go to the right node
*/

// Creates a sprite that swaps to another sprite when a key is pressed, has some properties that are useful
var ScrollingMenu = function(game, keys, x, y, prevKey, nextKey) {

	// This is the sprite that gets swapped with other keys, starts at index 0
	Phaser.Sprite.call(this, game, x, y, keys[0]);
	this.anchor.setTo(0.5);

	// This is useful later
	this.total = keys.length;
	this.currentIndex = 0;  // currentIndex is the index in the original array (keys) of the image that is currently being displayed
	this.currentKey = keys[0] // currentKey is the key currently being displayed

	// Make it real
	game.add.existing(this);

	// Make a doubly linked list
	this.dLL = [];
	for (var i = 0; i < this.total; i++) {
		if (i == 0) {
			var node = {
				left: null,
				right: null,
				key: keys[i],
				index: i
			};
			this.dLL.push(node);
		} else {
			var node = {
				left: this.dLL[i-1],
				right: null,
				key: keys[i],
				index: i
			};
			this.dLL.push(node);
			this.dLL[i-1].right = this.dLL[i];
		}
	}
	this.dLL[this.total-1].right = this.dLL[0];
	this.dLL[0].left = this.dLL[this.total-1];

	// Make key to scroll right
	this.nextKey = game.input.keyboard.addKey(nextKey);
    this.nextKey.onDown.add(ScrollNext, this);

    // Make key to scroll left
	this.prevKey = game.input.keyboard.addKey(prevKey);
    this.prevKey.onDown.add(ScrollPrev, this);

	console.log("new scrolling menu object");
}

ScrollingMenu.prototype = Object.create(Phaser.Sprite.prototype);
ScrollingMenu.prototype.constructor = ScrollingMenu;

function ScrollPrev (){
	// .loadTexture() swaps the sprite to another image
	this.currentKey = this.dLL[this.currentIndex].left.key;
	this.loadTexture(this.currentKey);
	this.currentIndex = this.dLL[this.currentIndex].left.index;
}

function ScrollNext (){
	// .loadTexture() swaps the sprite to another image
	this.currentKey = this.dLL[this.currentIndex].right.key;
	this.loadTexture(this.currentKey);
	this.currentIndex = this.dLL[this.currentIndex].right.index;
}