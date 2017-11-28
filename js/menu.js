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
        game.stage.backgroundColor = "#000000";
        offset = 100;
        this.mountainsBack = game.add.sprite(0, 0, 'bgr-back');
        this.mountainsBack.width = game.width;
        this.mountainsBack.height = game.height;
    },
    create: function () {

        this.createBackground();
        this.snow();
        //add Splash screen heading
        textStyle = { font: settings.splashHeadingFont , fill: '#ffffff', align:'center', boundsAlignH: "center", boundsAlignV: "middle" };
        splashHeading = game.add.text(game.world.centerX, game.world.centerY-85, "An Xmas Game", textStyle);
        splashHeading.scale.set(0);
        splashHeading.anchor.set(0.5);
        var splashHeadingTween = game.add.tween(splashHeading.scale);
        splashHeadingTween.to({x:1,y:1}, 300, Phaser.Easing.Linear.None);
        splashHeadingTween.onComplete.addOnce(function () {

            textStyle = { font: settings.playBtnFont , fill: '#cc3333', align:'center', boundsAlignH: "center", boundsAlignV: "middle" };
            playBtn = game.add.text(game.world.centerX, splashHeading.centerY+55, "Tap to Play", textStyle);
            playBtn.anchor.set(0.5);
            playBtn.alpha = 0;
            playBtnTween = game.add.tween(playBtn).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true, 0, 800, true);



        }, this);
        splashHeadingTween.start();

        //tap anywhere
        game.input.onTap.add(function () {
            game.state.start('Instructions');
        }, this);


    }
};

