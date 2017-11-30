/**
 * Created by sidarcy on 21/11/2017.
 */


var Menu = {

    preload: function () {
    },
    create: function () {

        bgr = game.add.sprite(0, 0, 'static');
        bgr.width = game.width;
        bgr.height = game.height;
        if( !_isMobile() ) {
            welcome = game.add.audio('welcome').play();
            this.music = game.add.audio('music');

            game.time.events.add(Phaser.Timer.SECOND * 2, function () {
                this.music.play();
            }, this);
        }

        logo = game.add.sprite(15, 15, 'rtelogo');
        logo.scale.set(0.8);

        gameLogo = game.add.sprite(game.width-Percent(5, w), Percent(4, h), 'gameLogo');
        gameLogo.anchor.setTo(1, 0);

        intro = game.add.sprite(Percent(6, w), Percent(10, h), 'tubIntro');
        intro.scale.setTo(settings.introTubsScale);
        intro.anchor.setTo(0, 0);

        playBtn = game.add.sprite(game.width-Percent(10,w), game.height-Percent(20, h), 'playBtn');
        playBtn.anchor.setTo(1);

        //tap anywhere
        game.input.onTap.add(function () {
            game.state.start('Instructions');
        }, this);



    }
};

