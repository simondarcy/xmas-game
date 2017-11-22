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


        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        loadingText = game.add.text(32, 100, 'Loading...', { font:"23px Mountains of Christmas", fill: '#FFF'});

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        game.scale.refresh();

        game.load.onLoadStart.add(this.loadStart, this);
        game.load.onFileComplete.add(this.fileComplete, this);
        game.load.onLoadComplete.add(this.loadComplete, this);

        // Load all the needed resources for the menu.

        //Global Assets
        game.stage.backgroundColor = '#00000';

        //Main Game Assets

        game.load.start();

        game.load.image('ball','img/ball.png');
        game.load.image('reindeer','img/rd.png');
        game.load.image('snow','img/snow.png');
        game.load.image('santa','img/santa.png');

        game.load.image('snowman','img/snowman.png');
        game.load.image("gift", "img/parcel.png");
        game.load.image('tree','img/tree.png');
        game.load.image('house','img/snow-house.png');
        game.load.image('replay', 'img/icons/return.png');

        game.load.spritesheet('plane', 'img/plane-sprite.png', 443, 282, 2);

        //backroudn parallax
        game.load.image('bgr-back', 'img/bgr-back-2.png');
        game.load.image('bgr-mid', 'img/bgr-mid-2.png');
        game.load.image('bgr-front', 'img/bgr-front-2.2.png');
        game.load.image('ground', 'img/ground.png');

        //icons
        game.load.image('arrowDwn', 'img/icons/arrowDown.png');
        game.load.image('arrowUp', 'img/icons/arrowUp.png');
        game.load.image('buttonA', 'img/icons/buttonA.png');
        game.load.image('buttonReturn', 'img/icons/return.png');

        game.load.audio('music', ['audio/santa.mp3']);



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