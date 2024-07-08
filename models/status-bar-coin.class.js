class StatusBarCoins extends DrawableObject {
    IMAGES = [
        'img/Alternative Grafiken - Sharkie/4. Marcadores/Purple/0_ _1.png',
        'img/Alternative Grafiken - Sharkie/4. Marcadores/Purple/20_ .png',
        'img/Alternative Grafiken - Sharkie/4. Marcadores/Purple/40_ _1.png',
        'img/Alternative Grafiken - Sharkie/4. Marcadores/Purple/60_ _1.png',
        'img/Alternative Grafiken - Sharkie/4. Marcadores/Purple/80_ _1.png',
        'img/Alternative Grafiken - Sharkie/4. Marcadores/Purple/100__1.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.x = 495;
        this.y = 0;
        this.width = 180;
        this.height = 55;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
