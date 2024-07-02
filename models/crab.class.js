class Crab extends MovableObject {
    height = 100;
    width = 100;
    y = 350;
    constructor() {
        super().loadImage('img/Fish, crab, jellyfish, shark/PNG/Crab_1/Crab_move_1_000.png');
       //start bei 200pixel und ist dann zwischen 200 und 
        this.x = 10 + Math.random() * 500;

    }
}
