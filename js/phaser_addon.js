		
// add a button to a scene
// similar to buttons in Phaser v2
Phaser.Scene.prototype.addButton = function(x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame)
{
	// add a button
	var btn = this.add.sprite(x, y, key, outFrame).setInteractive();
	btn.setScale(0.25, 0.25);

	btn.on('pointerover', function (ptr, x, y) {
		this.setFrame(overFrame)
	});

	btn.on('pointerout', function (ptr) {
		this.setFrame(outFrame)
	});

	btn.on('pointerdown', function (ptr) {
		this.setScale(0.2, 0.2)
	});

	btn.on('pointerup', callback.bind(callbackContext));
		
	return btn;
};