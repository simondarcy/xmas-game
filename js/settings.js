var mobileSettings = {
    planeScale:0.25,
    reindeerScale:0.2,
    reindeerSpacing:60,
    santaScale:0.4,
    houseScale:1,
    giftScale:0.7,
    splashHeadingFont:'42px Mountains of Christmas',
    playBtnFont:'30px Helvetica',
    instructionDescFont:'23px Arial',
    shareHeadingTop: 170,
    scoreTextFont:'60px Fredoka One',
    finalScoreTextFont:'35px Fredoka One'
};

var desktopSettings = {
    planeScale:0.3,
    reindeerScale:0.2,
    reindeerSpacing:60,
    santaScale:0.4,
    houseScale:1,
    giftScale:0.8,
    splashHeadingFont:'42px Mountains of Christmas',
    playBtnFont:'30px Helvetica',
    instructionDescFont:'23px Arial',
    shareHeadingTop: 170,
    scoreTextFont:'60px Fredoka One',
    finalScoreTextFont:'35px Fredoka One'
};

var settings = mobileSettings;

var w = Math.max (document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

if (w > 1160){
    //Switch to desktop settings
    settings = desktopSettings;
}

//max width height

//800 x 450

if(w>1160){
    w = 1160;
    h = 650;
}

