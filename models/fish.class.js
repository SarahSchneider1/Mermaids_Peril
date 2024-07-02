class Fish extends MovableObject {

    constructor() {
        super().loadImage('img/Fish, crab, jellyfish, shark/PNG/Fish_2/Fish_move_2_000.png');
       //start bei 200pixel und ist dann zwischen 200 und 
        this.x = 200 + Math.random() * 500;
        this.y = 100 + Math.random() * 500;
        this.width = 70;
        this.height = 70;
    }
}
