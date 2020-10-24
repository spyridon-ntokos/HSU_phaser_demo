var MainMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function MainMenu() {
            Phaser.Scene.call(this, { key: 'mainmenu' });
        },

    preload: function () {
    },

    create: function () {

        // add logo & background
        // TODO?

        // add start button
        this.btnstart = this.addButton(400, 300, 'play_btn', this.doStart, this, 'play_btn_hl', 'play_btn', 'play_btn_hl', 'play_btn');

        // add more buttons
        // TODO

        console.log('create is ready');
    },

    doStart: function () {
        console.log('menuscene doStart was called!');
        this.scene.start('gamescene');
    }

});