var GameOver = {


    preload: function () {

    },
    create:function(){


        shareHeadingTextStyle = {font: settings.splashHeadingFont, fill: '#ffffff', align:'center', boundsAlignH: "center", boundsAlignV: "middle"};
        shareHeading = game.add.text(game.world.centerX, 100, "Game Over", shareHeadingTextStyle);

        var replay = game.add.button(game.world.centerX+20, shareHeading.y+100, 'replay');

        replay.onInputUp.add(function(){
            game.state.start('Game');
        }, this);

    },
    update:function(){

    }
};

