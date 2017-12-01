/**
 * Instructions screen
 */


var Instructions = {

    preload: function () {
    },
    create: function(){

        bgr = game.add.sprite(0, 0, 'static');
        bgr.width = game.width;
        bgr.height = game.height;

        logo = game.add.sprite(15, 15, 'rtelogo');
        logo.scale.set(settings.logoScale);

        if(!_isMobile()) {
            Menu.music.stop();
        }

        this.instructionsAudio = game.add.audio('instructionsAudio').play();

        instructions = game.add.sprite(game.width/2, game.height/2-settings.instructionOffset, 'instructions');
        instructions.anchor.setTo(0.5);
        instructions.scale.setTo(settings.instructionsScale);


        playBtn = game.add.sprite(game.width/2, instructions.y+instructions.height-20, 'playBtn');
        playBtn.anchor.setTo(0.5);
        playBtn.scale.setTo(settings.btnScale);

        //tap anywhere
        game.input.onTap.add(function () {
            game.state.start('Game');
        }, this);


    }
};
