class ThrowableObject extends MovableObject {

    constructor(x, y) {
        super().loadImage('img/Game items/PNG/Neutral/Bubble_1.png');
        this.x = x;
        this.y = y;
        this.height = 40;
        this.width = 40;
        this.throw();  // Funktionsname korrigiert
    }

    throw() {  // Funktionsname korrigiert
        this.speedY = 0;  // Vertikale Geschwindigkeit auf 0 gesetzt
        setInterval(() => {
            this.x += 10;
        }, 50);
    }

}