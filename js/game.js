/**
 * Created by sidarcy on 31/10/2017.
 */

snakeSection = [];

numSnakeSections = 5;

var blah,ball,dropGift,moving,direction = "up",canDrop=false,crash=false;

var presentsCollected;
var giftSpeed = 280;
var giftGap = 350;
var tunnelWidth = 100;
var score;
var timeLeft = 60;

//GIFT
Gift = function (game) {
    var position = game.rnd.between(10, game.height/1.7);
    Phaser.Sprite.call(this, game, game.width+100, position, "gift");
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.set(0.5);
    //this.scale.setTo(settings.giftScale);
    this.angle += game.rnd.between(45, 360);
    this.body.velocity.x = -giftSpeed;
    this.body.angularVelocity = -30;
    this.placeGift = true;
};
Gift.prototype = Object.create(Phaser.Sprite.prototype);
Gift.prototype.constructor = Gift;
Gift.prototype.update = function(){

    if(this.placeGift && this.x < game.width - giftGap){
        this.placeGift = false;
        Game.addGift(this.parent);
    }
    if(this.x < -100){
        this.destroy();
    }
};




//Create Houses
House = function (game) {
    houseType = game.rnd.between(0, 1);
    houseSprite = (houseType==0)?'houseNaughty':'houseNice';
    Phaser.Sprite.call(this, game, game.width+150, (game.height-game.cache.getImage(houseSprite).height+settings.houseOffset), houseSprite);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.set(0.5, 0);
    this.scale.setTo(settings.houseScale);
    this.body.velocity.x = -giftSpeed;
    this.body.immovable = true;
    this.placeHouse = true;
    this.houseType = houseType;
    var anim = this.animations.add('anim');
    this.animations.play('anim', 2, true);
    this.gap = game.rnd.between(150, 200)

};
House.prototype = Object.create(Phaser.Sprite.prototype);
House.prototype.constructor = House;
House.prototype.update = function(){
    if(this.placeHouse && this.x < game.width - this.gap){
        this.placeHouse = false;
        Game.addHouse(this.parent);
    }
    //detroy once left screen
    if(this.x < -100){
        this.destroy();
    }
};

var Game = {
    preload: function() {
        timeLeft = 60;
        presentsCollected = 0;
        score = 0;
        crash=false;
    },

    create : function() {

        Instructions.instructionsAudio.stop();

        this.createBackground();
        this.snow();

        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.world.setBounds(0, 0, 800, 600);

        cursors = game.input.keyboard.createCursorKeys();
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

        hohoho = game.add.audio('hohoho');
        nonono = game.add.audio('nonono');
        encourage = game.add.audio('encourage');
        timeAudio = game.add.audio('timeAudio');
        coin = game.add.audio('coin');
        goodAudio = game.add.audio('goodHouses').play();

        music = game.add.audio('music');
        game.time.events.add(Phaser.Timer.SECOND*4, function() {
            music.loopFull(0.5);
        }, this);

        this.giftGroup = game.add.group();
        this.addGift(this.giftGroup);

        this.houseGroup = game.add.group();
        this.addHouse(this.houseGroup);

        this.dropGiftGroup = game.add.group();

        if (_isMobile()){
            this.mobileButtons();
        }

        this.santaGroup = game.add.group();

        //  Init snakeSection array
        for (var i = 0; i <= numSnakeSections-1; i++)
        {
            sp = 'reindeer';
            sc = settings.reindeerScale;
            an = 0.5;
            if (i == 0){
                sp = 'santa';
                sc = settings.santaScale;
                an = 0.6
            }
            snakeSection[i] = game.add.sprite(300+i*settings.reindeerSpacing, 300, sp);

            var fly = snakeSection[i].animations.add('fly');
            snakeSection[i].animations.play('fly', 2, true);

            game.physics.enable(snakeSection[i], Phaser.Physics.ARCADE);
            snakeSection[i].body.collideWorldBounds = true;
            snakeSection[i].anchor.setTo(0.5, an);
            snakeSection[i].scale.setTo(sc);
            if (sp=="santa"){
                snakeSection[i].width = 130;
                snakeSection[i].height = 100;
                //add tubs
                tubs = game.add.sprite(300+i*settings.reindeerSpacing-25, 280, 'tubs');
                game.physics.enable(tubs, Phaser.Physics.ARCADE);
                var tubAnim = tubs.animations.add('tubAnim', [0,1]);
                tubAnim.onComplete.add(function(){
                   if(presentsCollected==0){
                       tubs.frame = 0;
                   }
                });
                tubs.scale.setTo(0.7);
                tubs.anchor.setTo(1);
                tubs.body.collideWorldBounds = true;
                tubs.body.immovable = true;
                this.santaGroup.add(tubs);

            }
            this.santaGroup.add(snakeSection[i]);
        }


        ball = snakeSection[snakeSection.length-1];
        ball.body.immovable = true;


        textStyle = {
            font: '30px Arial',
            fill: '#ffffff',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        presentsText = game.add.text(game.width - 100, 50, presentsCollected, textStyle);
        presentsText.alpha = 0;
        presentsText.setText(presentsCollected);


        scoreBgr = game.add.sprite(game.width - 100, 10, 'score');
        scoreBgr.anchor.setTo(0.5, 0);

        timerBgr = game.add.sprite(game.width - 250, 10, 'timer');
        timerBgr.anchor.setTo(0.5, 0);


        //Actual score box
        scoreText = game.add.text(scoreBgr.x, 73, score, textStyle);
        scoreText.anchor.setTo(0.5);
        scoreText.setText(score);


        //add time test
        timertextStyle = {
            font: '30px Arial',
            fill: '#FFFFFF',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        timeText = game.add.text(timerBgr.x, 73, timeLeft, timertextStyle);
        game.time.events.loop(Phaser.Timer.SECOND, this.decreaseTime, this);
        timeText.anchor.setTo(0.5);


        game.input.onDown.add(this.moveDeer, this);

    },


    mobileButtons:function(){
        var spaceArrow = game.add.button(100, game.world.centerY-30, 'buttonA');
        spaceArrow.anchor.setTo(0.5);
        spaceArrow.onInputUp.add(function(){
            this.dropPresent();
        }, this);

        var upArrow = game.add.button(100, spaceArrow.y - 80, 'arrowUp');
        upArrow.anchor.setTo(0.5);

        upArrow.onInputDown.add(function(){
            blah = (ball.y - ball.height);
            direction = "up";
            this.moveDeer(blah);
        }, this);

        var downArrow = game.add.button(100, (spaceArrow.y+spaceArrow.height)+18, 'arrowDwn');
        downArrow.anchor.setTo(0.5);
        downArrow.angle += 180;
        downArrow.onInputDown.add(function(){
            blah = (ball.y + ball.height) + ball.height;
            direction = "down";
            this.moveDeer(blah);
        }, this);
    },
    addHouse: function(group){
        var house = new House(game);
        game.add.existing(house);
        group.add(house);
    },
    addGift: function(group){
        var gift = new Gift(game);
        game.add.existing(gift);
        group.add(gift);
    },


    moveDeer: function(location){

        for (var i = snakeSection.length-1; i >= 0; i--) {
            game.physics.arcade.moveToXY(snakeSection[i], snakeSection[i].x, location, 600, 500-(i*50));
        }
        game.physics.arcade.moveToXY(tubs, tubs.x, location, 600, 500-(50));

    },
    checkDeer:function(){
        for (var i = 0; i <= numSnakeSections-1; i++) {
            if(direction == "down" && (snakeSection[i].y + snakeSection[i].height-10) >= blah || direction == "up" && snakeSection[i].y <= blah) {
                snakeSection[i].body.velocity.setTo(0, 0);
            }

            if(direction == "down" && (tubs.y + tubs.height) >= blah || direction == "up" && tubs.y <= blah) {
                tubs.body.velocity.setTo(0, 0);
            }

        }
    },
    update : function() {
        //Santa collects presents
        game.physics.arcade.collide(this.santaGroup, this.giftGroup, function(s, b){
            //kill presetn
            b.body.velocity.x = 0;
            b.kill();
            b.destroy();
            coin.play();
            //update number of presents collected
            presentsCollected++;
            if(presentsCollected == 1){
                canDrop = true;
                tubs.frame = 1;
            }
            else if(presentsCollected==0){
                tubs.frame = 0;
            }
        });


        //Present collides with house
        game.physics.arcade.collide(this.dropGiftGroup, this.houseGroup,function(g, h){


            if (h.houseType == 0){
                score--;
                nonono.play();
            }
            else{
                score++;
                if (score % 5 == 0){
                    game.time.events.add(Phaser.Timer.SECOND*2, function() {
                        encourage.play();
                    });
                }
                else {
                    hohoho.play();
                }
            }


            canDrop = true;

            scoreText.setText(score);

            var killTween = game.add.tween(g.scale);
            killTween.to({x: 0, y: 0}, 200, Phaser.Easing.Linear.None);
            killTween.onComplete.addOnce(function () {
                g.kill();
            }, this);
            killTween.start();
        });



        if(typeof(dropGift)!='undefined' && dropGift.y>game.height){
            canDrop = true;
        }



        if(ball.y + ball.height > game.height-10) {
            music.stop();
            game.state.start('GameOver');
            crash=true;
        }

        this.backgroundMotion();

        if (cursors.up.isDown)
        {
            blah = (ball.y - ball.height);
            direction = "up";
            this.moveDeer(blah);

        }
        else if (cursors.down.isDown)
        {
            blah = (ball.y + ball.height) + ball.height;
            direction = "down";
            this.moveDeer(blah);
        }
        if (this.spaceKey.isDown){
            this.dropPresent();
        }
        else if (this.spaceKey.isUp){

        }

        this.checkDeer();


    },
    dropPresent:function(){
        if(canDrop && presentsCollected>0) {

            dropGift = game.add.sprite(tubs.x-15, tubs.y-10, 'gift');
            game.physics.enable(dropGift, Phaser.Physics.ARCADE);
            dropGift.scale.setTo(settings.giftScale);
            dropGift.angle += game.rnd.between(45, 360);
            dropGift.body.velocity.y = +giftSpeed;
            dropGift.body.angularVelocity = -200;
            this.dropGiftGroup.add(dropGift);
            canDrop = false;
            presentsCollected--;

            tubs.animations.play('tubAnim', 2, false);

        }
    },
    decreaseTime: function(){
        timeLeft --;
        timeText.text = timeLeft;
        if(timeLeft == 0){
            music.stop();
            game.state.start('GameOver');
        }
        else if(timeLeft == 10){
            timeAudio.play();
        }
    },
    backgroundMotion:function(){
        this.mountains.tilePosition.x -= 0.75;
        this.hills.tilePosition.x -= 0.75;
        this.clouds.tilePosition.x -= 0.75;
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
    createBackground: function(){
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

    render: function(){

    }


};
