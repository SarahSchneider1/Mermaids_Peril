class Coin extends MovableObject {
    IMAGES_COIN = [
        'img/Alternative Grafiken - Sharkie/4. Marcadores/1. Coins/4.png',
        'img/Alternative Grafiken - Sharkie/4. Marcadores/1. Coins/3.png',
        'img/Alternative Grafiken - Sharkie/4. Marcadores/1. Coins/2.png',
        'img/Alternative Grafiken - Sharkie/4. Marcadores/1. Coins/1.png'
    ];
    width = 35;
    height = 35;

    constructor(x, y) {
        super();
        this.loadImage('img/Alternative Grafiken - Sharkie/4. Marcadores/1. Coins/1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 130);
    }
}