class ThrowableObject extends MovableObject {
    constructor(x, y) {
        super().loadImage('img/Game items/PNG/Neutral/Bubble_1.png');
        this.x = x;
        this.y = y;
        this.height = 20;
        this.width = 20;
        this.throw();
    }

    throw() {
        setInterval(() => {
            this.x += 10;
        }, 50);
    }

    playDeadAnimation(enemy, deadImages) {
        let currentImage = 0;
        const interval = setInterval(() => {
            enemy.img = enemy.imageCache[deadImages[currentImage]];
            currentImage++;
            if (currentImage >= deadImages.length) {
                clearInterval(interval);
                setTimeout(() => {
                    enemy.remove();
                }, 500);
            }
        }, 100);
    }

    remove() {
        // Entferne den Endboss aus dem Spiel
        const index = this.world.level.enemies.indexOf(this);
        if (index > -1) {
            this.world.level.enemies.splice(index, 1);
        }
    }
}
