/**
 * Created by sidarcy on 31/10/2017.
 */

snakeSection = [];

numSnakeSections = 5;

var blah,ball,moving,direction = "up",canDrop=false;

var presentsCollected;
var giftSpeed = 280;
var giftGap = 350;
var houseGap = 250;
var tunnelWidth = 100;
var score;
var timeLeft = 60;

//GIFT
Gift = function (game) {
    var position = game.rnd.between(10, game.height/2);
    Phaser.Sprite.call(this, game, game.width+100, position, "gift");
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.set(0.5);
    this.scale.setTo(settings.giftScale);
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


//Functions to drop the Gift
DropGift = function (game) {
    Phaser.Sprite.call(this, game, snakeSection[0].x, snakeSection[0].y, "gift");
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.set(0.5);
    this.scale.setTo(settings.giftScale);
    this.angle += game.rnd.between(45, 360);
    this.body.velocity.y = +giftSpeed;
    this.body.angularVelocity = -200;
};
DropGift.prototype = Object.create(Phaser.Sprite.prototype);
DropGift.prototype.constructor = DropGift;
DropGift.prototype.update = function(){

    if(this.placeGift && this.x < game.width - giftGap){
        this.placeGift = false;
        Game.addGift(this.parent);
    }
    //detroy once left screen
    if(this.y > game.height){
        this.destroy();
    }
};


//Create Houses
House = function (game) {
    Phaser.Sprite.call(this, game, game.width+150, (game.height-game.cache.getImage('house').height+50), "house");
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.set(0.5);
    this.scale.setTo(settings.houseScale);
    this.body.velocity.x = -giftSpeed;
    this.body.immovable = true;
    this.placeHouse = true;
    this.houseType = game.rnd.between(0, 1);
    var anim = this.animations.add('gb');
    anim.frame = this.houseType;
    this.gap =  game.rnd.between(150, 300)

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
    },

    create : function() {

        this.createBackground();
        Menu.snow();

        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.world.setBounds(0, 0, 800, 600);

        cursors = game.input.keyboard.createCursorKeys();
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

        music = game.add.audio('music');
        music.play();

        hohoho = game.add.audio('hohoho');

        this.giftGroup = game.add.group();
        this.addGift(this.giftGroup);

        this.houseGroup = game.add.group();
        this.addHouse(this.houseGroup);

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
            game.physics.enable(snakeSection[i], Phaser.Physics.ARCADE);
            snakeSection[i].body.collideWorldBounds = true;
            snakeSection[i].anchor.setTo(0.5, an);
            snakeSection[i].scale.setTo(sc);
            if (sp=="santa"){
                snakeSection[i].width = 130;
                snakeSection[i].height = 100
            }
            this.santaGroup.add(snakeSection[i]);
        }


        ball = snakeSection[snakeSection.length-1];
        ball.body.immovable = true;

        this.dropGiftGroup = game.add.group();

        textStyle = {
            font: '42px Arial',
            fill: '#ffffff',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        presentsText = game.add.text(game.width - 100, 50, presentsCollected, textStyle);
        presentsText.alpha = 0;
        presentsText.setText(presentsCollected);
        //Actual score box
        scoreText = game.add.text(game.width - 100, 50, score, textStyle);
        scoreText.setText(score);

        game.input.onDown.add(this.moveDeer, this);





        //add time test
        timertextStyle = {
            font: '',
            fill: '#FFFFFF',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        timeText = game.add.text(20, 25, timeLeft, timertextStyle);
        game.time.events.loop(Phaser.Timer.SECOND, this.decreaseTime, this);

    },


    mobileButtons:function(){
        var spaceArrow = game.add.button(100, game.world.centerY, 'buttonA');
        spaceArrow.anchor.setTo(0.5);
        spaceArrow.onInputUp.add(function(){
            this.dropPresent();
        }, this);

        var upArrow = game.add.button(100, spaceArrow.y - 100, 'arrowUp');
        upArrow.anchor.setTo(0.5);

        upArrow.onInputDown.add(function(){
            blah = (ball.y - ball.height);
            direction = "up";
            this.moveDeer(blah);
        }, this);

        var downArrow = game.add.button(100, (spaceArrow.y+spaceArrow.height), 'arrowDwn');
        downArrow.anchor.setTo(0.5);
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
    dropGift:function(group){
        var prez = new DropGift(game);
        game.add.existing(prez);
        group.add(prez);
    },

    moveDeer: function(location){

        for (var i = snakeSection.length-1; i >= 0; i--) {
            game.physics.arcade.moveToXY(snakeSection[i], snakeSection[i].x, location, 600, 500-(i*50));
        }

    },
    checkDeer:function(){
        for (var i = 0; i <= numSnakeSections-1; i++) {
            if(direction == "down" && (snakeSection[i].y + snakeSection[i].height) >= blah || direction == "up" && snakeSection[i].y <= blah) {
                snakeSection[i].body.velocity.setTo(0, 0);
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
            //update number of presents collected
            presentsCollected++;
            presentsText.setText(presentsCollected);
            presentsText.alpha = 1;
            presentsText.x = (s.x);
            presentsText.y = (s.y - 100);
            presentsTextTween = game.add.tween(presentsText).to({alpha: 0}, 300, Phaser.Easing.Linear.None, true);
        });


        //Present collides with house
        game.physics.arcade.collide(this.houseGroup, this.dropGiftGroup, function(h, g){

            //!todo is this a good house?

            if (h.houseType == 0){
                score--
            }
            else{
                score++;
                hohoho.play();
            }
            scoreText.setText(score);

            var killTween = game.add.tween(g.scale);
            killTween.to({x: 0, y: 0}, 200, Phaser.Easing.Linear.None);
            killTween.onComplete.addOnce(function () {
                g.kill();
            }, this);
            killTween.start();


        });




        //If sanya hots house
        game.physics.arcade.collide(this.santaGroup, this.houseGroup, function(s, h){
            music.stop();
            game.state.start('GameOver');
        });

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
            canDrop = true;
        }

        this.checkDeer();


    },
    dropPresent:function(){
        if(canDrop) {
            if (presentsCollected<=0)return false;
            canDrop = false;
            this.dropGift(this.dropGiftGroup);
            presentsCollected--;
            presentsText.setText(presentsCollected);
        }
    },
    decreaseTime: function(){
        timeLeft --;
        timeText.text = timeLeft;
        if(timeLeft == 0){
            game.state.start('GameOver');
        }
    },
    createBackground:function(){

        Menu.createBackground();
        this.mountainsMid2 = game.add.tileSprite(0,
            game.height - game.cache.getImage('bgr-front').height+10,
            game.width,
            game.cache.getImage('bgr-front').height,
            'bgr-front'
        );


    },

    backgroundMotion:function(){
        this.mountainsMid2.tilePosition.x -= 0.75;
    },

    render: function(){

    }


};
