var GameScene = new Phaser.Class({

	Extends: Phaser.Scene,

	initialize:

		function GameScene() {
			Phaser.Scene.call(this, { key: 'gamescene' });
		},

	preload: function () {

	},

	create: function () {

		// load main map
		this.map = this.make.tilemap({ key: 'map1' });

		// the first parameter is the tileset name specified in Tiled, the second is the key to the asset
		var tileset1 = this.map.addTilesetImage('tds_tilesheet', 'gameTiles', 16, 16, 1, 2);
		var tileset2 = this.map.addTilesetImage('city_tileset', 'cityTiles', 16, 16, 1, 3);

		// create layer
		this.groundlayer = this.map.createStaticLayer('Ground', [tileset1, tileset2]);
		this.wallslayer = this.map.createStaticLayer('Buildings', [tileset1, tileset2]);
		this.floor_doorlayer = this.map.createStaticLayer('Stairs & Doors', [tileset1, tileset2]);
		this.interiorlayer = this.map.createStaticLayer('Interior', [tileset1, tileset2]);


		// collision tiles in building layer
		//this.wallslayer.setCollisionByProperty({ collides: true });
		this.map.setCollisionBetween(0, 9999, true, true, this.wallslayer);

		const debugGraphics = this.add.graphics().setAlpha(0.75);
		this.wallslayer.renderDebug(debugGraphics, {
			tileColor: null,
			collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
			faceColor: new Phaser.Display.Color(40, 39, 37, 255)
		});

		// Find objects
		this.map.findObject('Objects', function (object) {

			// Spawn points
			if (object.type === 'Spawn') {
				// Player starting point
				if (object.name === 'StartingPoint') {
					this.player = this.physics.add.image(object.x, object.x, 'player');
				}
			}

		}, this);

		// spawn NPCs on the map
		//this.createNPCs(objects);

		// set physics properties and limit the player inside the screen
		this.player.setCollideWorldBounds(true);
		this.physics.add.collider(this.player, this.wallslayer);

		// the camera will follow the player in the world
		this.cameras.main.setBounds(0, 0, 1920, 1920);
		this.physics.world.setBounds(0, 0, 1920, 1920);
		this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
		this.cameras.main.setZoom(2);

		// move player with cursor keys
		this.cursors = this.input.keyboard.createCursorKeys();

	},

	createNPCs: function (objects) {
		// spawn NPCs on the designated location on map
		this.NPCs = this.physics.add.group();

		// phaser's random number generator
		var numNPCs = this.game.rnd.integerInRange(5, 10);
		var NPC;

		// for each location
		for (var i = 1; i < objects['Spawn Points'].length; i++) {
			// generate NPCs
			for (var j = 0; j < numNPCs; j++) {
				// add sprite
				var NPCstart = objects['Spawn Points'][i];
				NPC = this.NPCs.create(NPCstart.x, NPCstart.y, 'NPC_icon');

				// physics properties
				NPC.body.velocity.x = this.game.rnd.integerInRange(-20, 20);
				NPC.body.velocity.y = this.game.rnd.integerInRange(-20, 20);
				NPC.body.immovable = false;
				NPC.body.collideWorldBounds = true;
				NPC.body.maxVelocity.x = 70;
				NPC.body.maxVelocity.y = 70;
			}

		}
	},

	update: function (time, delta) {

		// player movement
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;

		if (this.cursors.up.isDown) {
			if (this.player.body.velocity.y == 0)
				this.player.body.velocity.y -= 250;
		}
		else if (this.cursors.down.isDown) {
			if (this.player.body.velocity.y == 0)
				this.player.body.velocity.y += 250;
		}
		else {
			this.player.body.velocity.y = 0;
		}
		if (this.cursors.left.isDown) {
			this.player.body.velocity.x -= 250;
		}
		else if (this.cursors.right.isDown) {
			this.player.body.velocity.x += 250;
		}
	}

});