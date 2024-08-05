class StatusBarEndboss extends DrawableObject {
    IMAGES = [
        'img/Alternative Grafiken - Sharkie/4. Marcadores/orange/100_  copia.png',
        'img/Alternative Grafiken - Sharkie/4. Marcadores/orange/60_  copia.png',
        'img/Alternative Grafiken - Sharkie/4. Marcadores/orange/20_ copia 2.png',
        'img/Alternative Grafiken - Sharkie/4. Marcadores/orange/0_  copia.png',
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.x = 485;
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
            return 0;
        } else if (this.percentage > 60) {
            return 1;
        } else if (this.percentage > 20) {
            return 2;
        } else {
            return 3;
        }
    }
}