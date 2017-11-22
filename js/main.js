
//work out a percentage
Percent = function(num, dir){
    wh = (dir == "h")?h:w;
    p = (num / 100) * wh;
    return p;
};


var game = new Phaser.Game(w, h, Phaser.AUTO, 'game');
game.state.add('Preloader', Preloader);
game.state.add('Menu', Menu);
game.state.add('Game', Game);
game.state.add('GameOver', GameOver);
game.state.start('Preloader');
