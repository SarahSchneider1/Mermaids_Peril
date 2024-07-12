class Bottle extends MovableObject {
    IMAGES_BOTTLE = [
        'img/Alternative Grafiken - Sharkie/4. Marcadores/Posión/Animada/1.png',
        'img/Alternative Grafiken - Sharkie/4. Marcadores/Posión/Animada/2.png',
        'img/Alternative Grafiken - Sharkie/4. Marcadores/Posión/Animada/3.png',
        'img/Alternative Grafiken - Sharkie/4. Marcadores/Posión/Animada/4.png',
        'img/Alternative Grafiken - Sharkie/4. Marcadores/Posión/Animada/5.png',
        'img/Alternative Grafiken - Sharkie/4. Marcadores/Posión/Animada/6.png',
        'img/Alternative Grafiken - Sharkie/4. Marcadores/Posión/Animada/7.png',
        'img/Alternative Grafiken - Sharkie/4. Marcadores/Posión/Animada/8.png',
    ];
    width = 35;
    height = 45;

    constructor(x, y) {
        super();
        this.loadImage('img/Alternative Grafiken - Sharkie/4. Marcadores/Posión/Animada/1.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 130);
    }
}
