var GameOver = {

    preload: function () {



    },
    create: function () {

        Menu.createBackground();

        textStyle = { font: settings.splashHeadingFont , fill: '#ffffff', align:'center', boundsAlignH: "center", boundsAlignV: "middle" };
        instructionHeadin = game.add.text(game.width/2, game.height/10, "Game Over", textStyle);
        instructionHeadin.anchor.set(0.5);

        textStyle = {
            font: settings.finalScoreTextFont, fill: '#FFFFFF', align:'center', boundsAlignH: "center",  boundsAlignV: "middle"
        };

        scoredescText = game.add.text(game.width/2, instructionHeadin.y+80, "Final Score ", textStyle);
        scoredescText.anchor.set(0.5);
        textStyle['fill'] = "#FF0000";
        scoreText = game.add.text( (scoredescText.left + scoredescText.width) + 15, scoredescText.y, score, textStyle);
        scoreText.anchor.set(0.5);

        //Add tap to replay
        instructionHeadingTextStyle = { font: settings.instructionFont , fill: '#ffe600', align:'center', boundsAlignH: "center", boundsAlignV: "middle" };
        instructionHeading = game.add.text((game.width/2), game.world.centerY+100, "Tap to Play Again", instructionHeadingTextStyle);
        instructionHeading.anchor.set(0.5);
        instructionHeading.alpha = 0;
        instructionHeadingTween = game.add.tween(instructionHeading).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true, 0, 800, true);

        instructionHeading.inputEnabled = true;
        instructionHeading.events.onInputDown.add(function(){
            game.state.start('Game');
        }, this);








        //Share panel box
        var shareIcons = game.add.group();

        var facebook = game.add.button((game.width/2) - 100, game.stage.height-95, 'facebook');
        facebook.anchor.setTo(0.5);

        var twitter = game.add.button((game.width/2), game.stage.height-95, 'twitter');
        twitter.anchor.setTo(0.5);
        var link;
        if(_isMobile()) {
            link = game.add.button((game.width/2) + 100, game.stage.height - 95, 'whatsapp');
        }
        else{
            link = game.add.button((game.width/2) + 100, game.stage.height - 95, 'link');
        }
        link.anchor.setTo(0.5);

        facebook.onInputUp.add(function(){
            url = "//www.facebook.com/sharer/sharer.php?u=https://www.rte.ie/long-shots/";
            window.open(url, "_blank")

        }, this);
        twitter.onInputUp.add(function(){
            shareText = "I delivered " + score + " presents with @ryantubridyshow playing 'Tubs Toy Show Trek' @RTELateLateShow Play Now!";
            url = "//twitter.com/share?url=https://www.rte.ie/long-shots/&text="+shareText+"&via=RTELateLateShow&hashtags=LateLateToyShow";
            window.open(url, "_blank")
        }, this);

        link.onInputUp.add(function(){
            shareText = "Me and Tubs delivered " + score + " presents playing 'Tubs Toy Show Trek'!. Play here: https://www.rte.ie/X/";

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

        //Only add heading if there is enough vertical space to play with
        if(game.world.height > 600) {
            shareHeadingTextStyle = {
                font: settings.shareHeadingFont,
                fill: '#FFFFFF',
                align: 'center',
                boundsAlignH: "center",
                boundsAlignV: "middle"
            };
            shareHeading = game.add.text(game.width/2, game.world.centerY + settings.shareHeadingTop, "Share", shareHeadingTextStyle);
            shareHeading.anchor.set(0.5);
        }


        this.saveScore();


        //Get top score
        if (typeof(Storage) !== "undefined") {
            top_score = localStorage.getItem("lsscore");
            textStyle['fill'] = "#FFFFFF";
            bestScoredescText = game.add.text(game.width/2, scoreText.y + 60, "Best Score ", textStyle);
            bestScoredescText.anchor.set(0.5);
            textStyle['fill'] = "#FF0000";
            bestScoreText = game.add.text((bestScoredescText.left + bestScoredescText.width)+15, bestScoredescText.y, top_score, textStyle);
            bestScoreText.anchor.set(0.5);
        }

        game.input.onTap.add(function () {
            game.state.start('Game');
        }, this);

    },
    saveScore : function(){

        if (typeof(Storage) !== "undefined") {

            //check if score is set
            if (localStorage.getItem("lsscore") !== null) {

                //check if current score is greater than
                if( score > parseInt( localStorage.getItem("lsscore") ) ){
                    localStorage.setItem("lsscore", score);
                }

            }
            //no score set so set it
            else{
                try {
                    localStorage.setItem("lsscore", score);
                }catch(e){
                    return false;
                }
            }


        }
        else { // No Local Storage
            return false;
        }//end LS check

    }///end saveScore function
};