/**
 * Instructions screen
 */


var Instructions = {

    preload: function () {
    },
    create: function(){

        Menu.createBackground();

        textStyle = { font: settings.splashHeadingFont , fill: '#ffffff', align:'center', boundsAlignH: "center", boundsAlignV: "middle" };
        instructionHeadin = game.add.text(game.world.centerX, game.height/10, "How to Play", textStyle);
        instructionHeadin.anchor.set(0.5);


        textStyle = { font: settings.instructionDescFont , fill: '#ffffff', align:'center', boundsAlignH: "center", boundsAlignV: "middle" };
        instructionHeadin = game.add.text(game.world.centerX, instructionHeadin.y+80, settings.instructions, textStyle);
        instructionHeadin.anchor.set(0.5);


        textStyle = { font: settings.instructionDescFont , fill: '#ffffff', align:'center', boundsAlignH: "center", boundsAlignV: "middle" };
        instructionHeadin = game.add.text(game.world.centerX, instructionHeadin.y+80, "Collect presents while avoiding the planes and houses", textStyle);
        instructionHeadin.anchor.set(0.5);


        textStyle = { font: settings.instructionDescFont , fill: '#ffffff', align:'center', boundsAlignH: "center", boundsAlignV: "middle" };
        instructionHeadin = game.add.text(game.world.centerX, instructionHeadin.y+80, "Make sure to only drop presents into the good houses", textStyle);
        instructionHeadin.anchor.set(0.5);


        textStyle = { font: settings.playBtnFont , fill: '#cc3333', align:'center', boundsAlignH: "center", boundsAlignV: "middle" };
        playBtn = game.add.text(game.world.centerX, instructionHeadin.y+80, "Tap to Play", textStyle);
        playBtn.anchor.set(0.5);
        playBtn.alpha = 0;
        playBtnTween = game.add.tween(playBtn).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true, 0, 800, true);





        //tap anywhere
        game.input.onTap.add(function () {
            game.state.start('Game');
        }, this);


    }
};
