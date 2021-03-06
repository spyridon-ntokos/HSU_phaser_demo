var HSUGame = HSUGame || {};

// title screen
HSUGame.Game = function(){};

HSUGame.Game.prototype = {
    create: function() {
        this.map = this.game.add.tilemap('map1');

        // the first parameter is the tileset name specified in Tiled, the second is the key to the asset
        this.map.addTilesetImage('tds_tilesheet', 'gameTiles');
        this.map.addTilesetImage('city_tileset', 'cityTiles');

        // create layer
        this.groundlayer = this.map.createLayer('Ground');
        this.buildinglayer = this.map.createLayer('Buildings');
        this.floor_doorlayer = this.map.createLayer('Stairs & Doors');
        this.interiorlayer = this.map.createLayer('Interior');
        

        // collision tiles in building layer
        this.map.setCollisionBetween(0, 9999, true, 'Buildings');

        // resizes the game world to match the layer dimensions
        this.groundlayer.resizeWorld();

        // load whole map to screen (doesn't work that well yet)
        /*this.game.width = window.innerWidth;
        this.game.height = window.innerHeight;
        this.game.stage.width = window.innerWidth;
        this.game.stage.height = window.innerHeight;
        if (this.game.renderType === Phaser.WEBGL) {
            this.game.renderer.resize(window.innerWidth, window.innerHeight);
        }
        this.game.world.setBounds(0, 0, window.innerWidth, window.innerHeight);
        this.game.camera.setSize(window.innerWidth, window.innerHeight);
        this.game.camera.setBoundsToWorld();
        this.game.scale.setShowAll();
        this.game.scale.refresh();*/

        var objects = new Array();
        // Loop over each object layer
        for (var ol in this.map.objects) {
            objects[ol] = new Array();
            // Loop over each object in the object layer
            for (var o in this.map.objects[ol]) {
                var object = this.map.objects[ol][o];
                // Create a 2d array to store all objects
                objects[ol][o] = object;
            }
        }
        console.log(objects);

        // spawn NPCs on the map
        this.createNPCs(objects);

        // find starting location & create player
        var playerStart = objects['Spawn Points'][0];
        this.player = this.game.add.sprite(playerStart.x, playerStart.y, 'player');

        // set physics properties and limit the player inside the screen
        this.game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;

        // the camera will follow the player in the world
        this.game.camera.follow(this.player);
        this.game.scale.setGameSize(window.innerWidth, window.innerHeight);

        // move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();

        
    },

    createNPCs: function (objects) {
        // spawn NPCs on the designated location on map
        this.NPCs = this.game.add.group();
        this.NPCs.enableBody = true;

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

    update: function () {
        // collision
        this.game.physics.arcade.collide(this.player, this.buildinglayer);
        this.game.physics.arcade.collide(this.NPCs, this.buildinglayer);
        this.game.physics.arcade.collide(this.player, this.NPCs);
        this.game.physics.arcade.collide(this.NPCs, this.NPCs);

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
}