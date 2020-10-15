var HSUGame = HSUGame || {};

HSUGame.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

HSUGame.game.state.add('Boot', HSUGame.Boot);
HSUGame.game.state.add('Preload', HSUGame.Preload);
HSUGame.game.state.add('Game', HSUGame.Game);

HSUGame.game.state.start('Boot');