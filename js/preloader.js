var Preloader = new Phaser.Class({

	Extends: Phaser.Scene,

	initialize:

		function Preloader() {
			// note: the pack:{files[]} acts like a pre-preloader
			// this eliminates the need for an extra "boot" scene just to preload the loadingbar images
			Phaser.Scene.call(this, {
				key: 'preloader',
				pack: {
					files: [
						{ type: 'image', key: 'loadingbar_bg', url: 'assets/images/preloader-bar-bg.png' },
						{ type: 'image', key: 'loadingbar_fill', url: 'assets/images/preloader-bar.png' }
					]
				}
			});
		},

	setPreloadSprite: function (sprite) {
		this.preloadSprite = { sprite: sprite, width: sprite.width, height: sprite.height };

		//sprite.crop(this.preloadSprite.rect);
		sprite.visible = true;

		// set callback for loading progress updates
		this.load.on('progress', this.onProgress, this);
		this.load.on('fileprogress', this.onFileProgress, this);
	},

	onProgress: function (value) {

		if (this.preloadSprite) {
			// calculate width based on value=0.0 .. 1.0
			var w = Math.floor(this.preloadSprite.width * value);
			console.log('onProgress: value=' + value + " w=" + w);

			// sprite.frame.width cannot be zero
			//w = (w <= 0 ? 1 : w);

			// set width of sprite			
			this.preloadSprite.sprite.frame.width = (w <= 0 ? 1 : w);
			this.preloadSprite.sprite.frame.cutWidth = w;

			// update screen
			this.preloadSprite.sprite.frame.updateUVs();
		}
	},

	onFileProgress: function (file) {
		console.log('onFileProgress: file.key=' + file.key);
	},

	preload: function () {
		// setup the loading bar
		// note: images are available during preload because of the pack-property in the constructor
		this.loadingbar_bg = this.add.sprite(400, 300, "loadingbar_bg");
		this.loadingbar_fill = this.add.sprite(400, 300, "loadingbar_fill");
		this.setPreloadSprite(this.loadingbar_fill);

		// load game assets
		this.load.tilemapTiledJSON('map1', 'assets/maps/hsu_map.json');
		this.load.image('gameTiles', 'assets/images/tds_16_extruded.png');
		this.load.image('cityTiles', 'assets/images/city_tileset_extruded.png');
		this.load.image('player', 'assets/images/manBrown_stand.png');
		this.load.image('NPC_icon', 'assets/images/zombie1_stand.png');
		this.load.image('play_btn', 'assets/images/PlayButton.png');
		this.load.image('play_btn_hl', 'assets/images/PlayButtonHighlight.png');

		// font
		// TODO?

		// sound effects
		// TODO

		// !! TESTING !! load the same image 500 times just to slow down the load and test the loading bar
		//for (var i = 0; i < 500; i++) {
		//	this.load.image('testloading'+i, 'assets/images/tds_16.png');
		//};
		// !! TESTING !!
	},

	create: function () {
		
		console.log('Preloader scene is ready, now start the actual game.');

		// dispose loader bar images
		this.loadingbar_bg.destroy();
		this.loadingbar_fill.destroy();
		this.preloadSprite = null;

		// start actual game
		this.scene.start('mainmenu');
	}
});