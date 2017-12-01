
//work out a percentage
Percent = function(num, dir){
    wh = (dir == "h")?game.height:game.width;
    p = (num / 100) * wh;
    return p;
};

var game, w, h;


function _isMobile(){
    // if we want a more complete list use this: http://detectmobilebrowsers.com/
    // str.test() is more efficent than str.match()
    // remember str.test is case sensitive
    var isMobile = (/iphone|ipod|android|ie|blackberry|fennec/).test
    (navigator.userAgent.toLowerCase());
    return isMobile;
}

function isFacebookApp() {
    var ua = navigator.userAgent || navigator.vendor || window.opera;
    return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
}


function init() {


    var w = Math.max (document.documentElement.clientWidth, window.innerWidth || 0);
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);


    if (isFacebookApp()){
        h = h - 100;
        alert(h);
    }

    if (w > 1160){
        //Switch to desktop settings
        settings = desktopSettings;
    }
    //max width height
    if(w>1160){
        w = 1160;
        h = 650;
    }



    game = new Phaser.Game(w, h, Phaser.AUTO, 'game');
    game.state.add('Preloader', Preloader);
    game.state.add('Instructions', Instructions);
    game.state.add('Menu', Menu);
    game.state.add('Game', Game);
    game.state.add('GameOver', GameOver);
    game.state.start('Preloader');

}


var flipped = false;

function doOnOrientationChange()
{
    //switch statement to select a behaviour based on the screens orientation
    switch (window.orientation) {
        case 0:
        case 180:
            //Portrait mode: show the illustration
            if (!flipped) {
                document.getElementById("flip").style.display = "block";
            }
            break;
        case 90:
        case -90:
            //Lanscape mode: hide the illustration
            document.getElementById("flip").style.display = "none";
            //prevent re init should user flip multiple times
            if (!flipped) {
                init();
                flipped = true;
            }
            break;
        case undefined:

            if(navigator.userAgent.indexOf("Chrome") == -1) {
                init();
            }


    }
}

window.onload = function()
{


    if (_isMobile()) {

        doOnOrientationChange();
        //detect orientation change
        window.addEventListener('orientationchange', doOnOrientationChange);
    }
    else{
        init();
    }

};
