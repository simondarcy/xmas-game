var loadingText;


WebFontConfig = {
    active: function() {
        game.time.events.add(Phaser.Timer.SECOND, function() {
        }, this);
    },
    google: {
        families: ['Mountains of Christmas']
    }
};

var Preloader = {

    preload : function() {

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.refresh();

        //Load fonts
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        //Loading text
        loadingText = game.add.text(game.width/2, game.height/2, 'Loading...', { font:"23px Mountains of Christmas", fill: '#FFF'});
        loadingText.anchor.setTo(0.5);

        //Load functions
        game.load.onLoadStart.add(this.loadStart, this);
        game.load.onFileComplete.add(this.fileComplete, this);
        game.load.onLoadComplete.add(this.loadComplete, this);

        // Load all the needed resources for the menu.

        //Global Assets
        game.stage.backgroundColor = '#00000';

        //Main Game Assets

        game.load.start();

        //Characters
        game.load.image('snow','img/snow.png');
        game.load.image('santa','img/santa.png');
        game.load.image('reindeer','img/rd.png');
        game.load.image("gift", "img/parcel.png");
        game.load.spritesheet('house', 'img/snow-house-sprite.png', 239, 99, 2);
        //Background parallax
        game.load.image('bgr-back', 'img/bgr-back-2.png');
        game.load.image('bgr-front', 'img/bgr-front-2.2.png');
        //Buttons
        game.load.image('arrowDwn', 'img/icons/arrowDown.png');
        game.load.image('arrowUp', 'img/icons/arrowUp.png');
        game.load.image('buttonA', 'img/icons/buttonA.png');
        game.load.image('buttonReturn', 'img/icons/return.png');
        game.load.image('replay', 'img/icons/return.png');
        //Share icons
        game.load.image('facebook', 'img/share_facebook.png');
        game.load.image('twitter', 'img/share_twitter.png');
        game.load.image('link', 'img/share_link.png');
        game.load.image('whatsapp', 'img/share_whatsapp.png');
        //Audio Files
        game.load.audio('music', ['audio/santa.wav']);
        game.load.audio('hohoho', ['audio/hohoho.wav']);


    },
    loadStart : function(){
        loadingText.setText("Loading ...");
    },
    loadComplete : function(){
        game.state.start('Menu');
    },
    fileComplete : function(progress, cacheKey, success, totalLoaded, totalFiles){
        loadingText.setText("Loading: " + progress + "% - " + totalLoaded + " of " + totalFiles);
    },
    create: function () {

    }
};