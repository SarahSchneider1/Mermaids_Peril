class Fish2 extends MovableObject {

    constructor() {
        super().loadImage('img/Fish, crab, jellyfish, shark/PNG/Fish_3/Fish_move_3_000.png');
       //start bei xpixel und ist dann zwischen x und x * x
        this.x = 100 + Math.random() * 500;
        this.y = 100 + Math.random() * 500;
        this.width = 70;
        this.height = 70;
    }
}
