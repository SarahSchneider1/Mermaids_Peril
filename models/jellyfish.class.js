class Jellyfish extends MovableObject {
    height = 100;
    width = 100;

    constructor() {
        super().loadImage('img/Fish, crab, jellyfish, shark/PNG/Jellyfish_1/Jellyfish_move_1_000.png');
       //start bei 200pixel und ist dann zwischen 200 und 
        this.x = 200 + Math.random() * 500;
        this.y = 100 + Math.random() * 500;
    }
}
