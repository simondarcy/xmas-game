/**
 * Created by sidarcy on 21/11/2017.
 */


var Menu = {

    preload: function () {
    },
    snow: function(){
        emitter = game.add.emitter(game.world.centerX, -100, 200);
        emitter.width = game.width;
        emitter.makeParticles('snow');
        emitter.minParticleSpeed.set(0, 300);
        emitter.maxParticleSpeed.set(0, 400);
        emitter.setRotation(0, 0);
        emitter.setAlpha(0.3, 0.8);
        emitter.setScale(0.5, 0.5, 1, 1);
        emitter.start(false, 5000, 100);
    },
    createBackground:function(){
        game.stage.backgroundColor = "#292d32";
        offset = 100;


        //Moon

        this.moon = game.add.sprite(game.width/2, game.height/2, 'moon');
        this.moon.anchor.set(0.5);

        //clouds
        this.clouds = game.add.tileSprite(0,
            game.height - game.cache.getImage('clouds').height,
            game.width,
            game.cache.getImage('clouds').height,
            'clouds'
        );
        this.mountains = game.add.tileSprite(0,
            game.height - game.cache.getImage('mountains').height,
            game.width,
            game.cache.getImage('mountains').height,
            'mountains'
        );
        this.hills = game.add.tileSprite(0,
            game.height - game.cache.getImage('hills').height,
            game.width,
            game.cache.getImage('hills').height,
            'hills'
        );

    },
    create: function () {

        this.createBackground();
        this.snow();

        welcome = game.add.audio('welcome').play();
        this.music = game.add.audio('music');

        game.time.events.add(Phaser.Timer.SECOND*2, function() {
            this.music.play();
        }, this);

        logo = game.add.sprite(10, 10, 'rtelogo');

        gameLogo = game.add.sprite(game.width-Percent(5, w), Percent(4, h), 'gameLogo');
        gameLogo.anchor.setTo(1, 0);

        intro = game.add.sprite(Percent(6, w), Percent(10, h), 'tubIntro');
        intro.scale.setTo(0.8);
        intro.anchor.setTo(0, 0);

        playBtn = game.add.sprite(game.width-Percent(10,w), game.height-Percent(20, h), 'playBtn');
        playBtn.anchor.setTo(1);

        //tap anywhere
        game.input.onTap.add(function () {
            game.state.start('Instructions');
        }, this);



    }
};

