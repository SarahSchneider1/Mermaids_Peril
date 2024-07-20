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
}