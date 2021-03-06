var GameOver = {

    preload: function () {



    },
    create: function () {


        clouds = game.add.sprite(0, 0, 'clouds');

        logo = game.add.sprite(15, 15, 'rtelogo');
        logo.scale.set(0.8);


        presents = game.add.sprite(0, game.height - game.cache.getImage('presents').height, 'presents');
        presents.width = game.width;

        gameLogo = game.add.sprite(game.width-Percent(5, w), Percent(4, h), 'gameLogo');
        gameLogo.anchor.setTo(1, 0);
        gameLogo.scale.set(settings.logoScale);

        textStyle = {
            font: settings.finalScoreTextFont, fill: '#FFFFFF', align:'center', boundsAlignH: "center",  boundsAlignV: "middle"
        };

        scoreBgr = game.add.sprite(game.width-Percent(20, 'w'), (gameLogo.y+gameLogo.height)+30, 'score');
        scoreBgr.anchor.setTo(0.5, 0);

        scoreText = game.add.text( game.width-Percent(20, 'w'), scoreBgr.y+(scoreBgr.height/2), score, textStyle);
        scoreText.anchor.set(0.5, 0);

        tubs = game.add.sprite(game.width/3.4, game.height-game.cache.getImage('endTubs').height+Percent(settings.endTubsPc, 'h'), 'endTubs');
        tubs.anchor.setTo(0.5, 0);
        tubs.scale.setTo(settings.endTubsScale);

        var tubAnim = tubs.animations.add('tubAnim');
        tubs.animations.play('tubAnim', 2, true);


        emitter = game.add.emitter(game.width/2, -100, 200);
        emitter.width = game.width;

        //  Here we're passing an array of image keys. It will pick one at random when emitting a new particle.
        emitter.makeParticles(['yellow', 'red']);

        emitter.start(false, 5000, 20);


        delay = 1;
        if(crash){
            delay=2;
            game.add.audio('nextTime').play();
        }
        game.time.events.add(Phaser.Timer.SECOND*delay, function() {
            promo = game.add.audio('promo').play();
        }, this);






        //Add tap to replay

        instructionHeading = game.add.sprite(game.width-Percent(20, 'w'), (scoreBgr.y+scoreBgr.height)+50,'playAgain');
        instructionHeading.anchor.set(0.5, 0);
        instructionHeading.inputEnabled = true;
        instructionHeading.scale.set(settings.btnScale);
        instructionHeading.events.onInputDown.add(function(){
            promo.stop();
            game.state.start('Game');
        }, this);






        //Share panel box
        var shareIcons = game.add.group();

        shareIconsX = game.width-Percent(20, 'w');

        var facebook = game.add.button(shareIconsX - settings.shareSpacing, game.height-settings.shareY, 'facebook');
        facebook.anchor.setTo(0.5);
        facebook.scale.set(settings.shareScale);

        var twitter = game.add.button(shareIconsX, game.height-settings.shareY, 'twitter');
        twitter.anchor.setTo(0.5);
        twitter.scale.set(settings.shareScale);
        var link;
        if(_isMobile()) {
            link = game.add.button(shareIconsX + settings.shareSpacing, game.height - settings.shareY, 'whatsapp');
        }
        else{
            link = game.add.button(shareIconsX + settings.shareSpacing, game.height - settings.shareY, 'link');
        }
        link.anchor.setTo(0.6);
        link.scale.set(settings.shareScale);

        facebook.onInputUp.add(function(){
            url = "//www.facebook.com/sharer/sharer.php?u=https://www.rte.ie/long-shots/";
            window.open(url, "_blank")

        }, this);
        twitter.onInputUp.add(function(){
            shareText = "@ryantubridyshow and I just delivered " + score + " gifts playing Tubridy's Toys @RTELateLateShow Play Now! #LLTS";
            url = "//twitter.com/share?url=https://www.rte.ie/long-shots/&text="+shareText+"&via=RTELateLateShow&hashtags=LLTS";
            window.open(url, "_blank")
        }, this);

        link.onInputUp.add(function(){
            shareText = "Tubs and I delivered " + score + " gifts playing Tubridy's Toys!. Have a go yourself here: https://www.rte.ie/X/";

            //If mobile open in whatsapp
            if(settings.isMobile){
                url = "whatsapp://send?text=" + shareText;
                window.open(url, "_blank")
            }
            else{
                //If desktop, copy link to clipboard
                var $temp = document.createElement("input");
                document.body.appendChild($temp);
                $temp.value = shareText;
                $temp.focus();
                $temp.select();
                document.execCommand("copy");
                document.body.removeChild($temp);
                alert("Game link copied to clipboard. Thanks for sharing!");
            }

        }, this);

        shareIcons.add(facebook);
        shareIcons.add(twitter);
        shareIcons.add(facebook);
        //make sure logo is above


        game.world.bringToTop(shareIcons);

    }

};