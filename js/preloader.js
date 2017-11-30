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

        game.load.spritesheet('santa', 'img/santa-sprite.png', 223, 181, 2);
        game.load.spritesheet('reindeer', 'img/ryandeer_sprite.png', 111, 144, 2);
        game.load.spritesheet('tubs', 'img/tubs-sprite.png', 112, 130, 2);
        game.load.image("gift", "img/present.png");
        game.load.spritesheet('houseNice', 'img/house_nice_sprite.png', 184, 184, 2);
        game.load.spritesheet('houseNaughty', 'img/house_naughty_sprite.png', 180, 184, 2);
        game.load.spritesheet('endTubs', 'img/end-tubs.png', 664, 647, 2);

        //Background parallax
        game.load.image('moon', 'img/background/moon.png');
        game.load.image('clouds', 'img/background/clouds.png');
        game.load.image('static', 'img/background/static-bgr.png');
        game.load.image('mountains', 'img/background/mountains.png');
        game.load.image('hills', 'img/background/hills.png');

        game.load.image('snow','img/background/snow.png');
        game.load.image('snowflake','img/background/snowflake.png');


        if(_isMobile()){
            game.load.image('instructions','img/instructions_mobile.png');
        }else{
            game.load.image('instructions','img/instructions_desktop.png');
        }

        game.load.image('tubIntro','img/tubs-intro.png');
        game.load.image('rtelogo','img/rte_logo.png');
        game.load.image('gameLogo','img/game_logo.png');

        //Buttons

        game.load.image('playBtn', 'img/icons/play_btn.png');
        game.load.image('playAgain', 'img/play-again-button.png');
        game.load.image('arrowDwn', 'img/icons/up_down_btn.png');
        game.load.image('arrowUp', 'img/icons/up_down_btn.png');
        game.load.image('buttonA', 'img/icons/drop_btn.png');
        game.load.image('buttonReturn', 'img/icons/return.png');
        game.load.image('replay', 'img/icons/return.png');

        //
        game.load.image('timer', 'img/time.png');
        game.load.image('score', 'img/score.png');
        game.load.image('yellow', 'img/yellow.png');
        game.load.image('red', 'img/red.png');
        game.load.image('presents', 'img/presents.png');

        //Share icons
        game.load.image('facebook', 'img/share_facebook.png');
        game.load.image('twitter', 'img/share_twitter.png');
        game.load.image('link', 'img/share_link.png');
        game.load.image('whatsapp', 'img/share_whatsapp.png');
        //Audio Files
        game.load.audio('music', ['audio/music.wav']);
        game.load.audio('hohoho', ['audio/hohoho.wav']);
        game.load.audio('nonono', ['audio/nonono.wav']);
        game.load.audio('timeAudio', ['audio/time-nearly-up.wav']);
        game.load.audio('encourage', ['audio/doing-great.wav']);
        game.load.audio('welcome', ['audio/welcome1.wav']);
        game.load.audio('instructionsAudio', ['audio/instructions.wav']);
        game.load.audio('goodHouses', ['audio/only-the-good.wav']);
        game.load.audio('promo', ['audio/promo.wav']);
        game.load.audio('welldone', ['audio/well-done.wav']);
        game.load.audio('nextTime', ['audio/next-time.wav']);
        game.load.audio('coin', ['audio/coin.wav']);



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