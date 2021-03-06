var HSUGame = HSUGame || {};

//loading the game assets
HSUGame.Preload = function () { };

HSUGame.Preload.prototype = {
    preload: function () {
        //show loading screen
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);

        //load game assets
        this.load.tilemap('map1', 'assets/maps/hsu_map.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('gameTiles', 'assets/images/tds_16.png');
        this.load.image('cityTiles', 'assets/images/city_tileset.png');
        this.load.image('player', 'assets/images/manBrown_stand.png');
        this.load.image('NPC_icon', 'assets/images/zombie1_stand.png');

    },
    create: function () {
        this.state.start('Game');
    }
};