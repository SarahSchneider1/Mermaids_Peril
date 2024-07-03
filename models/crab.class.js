class Crab extends MovableObject {
    height = 100;
    width = 100;
    y = 350;
    IMAGES_MOVE = [
        'img/Fish, crab, jellyfish, shark/PNG/Crab_1/Crab_move_1_000.png',
        'img/Fish, crab, jellyfish, shark/PNG/Crab_1/Crab_move_1_001.png',
        'img/Fish, crab, jellyfish, shark/PNG/Crab_1/Crab_move_1_002.png',
        'img/Fish, crab, jellyfish, shark/PNG/Crab_1/Crab_move_1_003.png',
        'img/Fish, crab, jellyfish, shark/PNG/Crab_1/Crab_move_1_004.png',
        'img/Fish, crab, jellyfish, shark/PNG/Crab_1/Crab_move_1_005.png',
        'img/Fish, crab, jellyfish, shark/PNG/Crab_1/Crab_move_1_006.png',
        'img/Fish, crab, jellyfish, shark/PNG/Crab_1/Crab_move_1_007.png',
        'img/Fish, crab, jellyfish, shark/PNG/Crab_1/Crab_move_1_008.png',
        'img/Fish, crab, jellyfish, shark/PNG/Crab_1/Crab_move_1_009.png'
    ];
    currentImage = 0;

    constructor() {
        super();
        this.loadImage('img/Fish, crab, jellyfish, shark/PNG/Crab_1/Crab_move_1_000.png');
        this.loadImages(this.IMAGES_MOVE);

        // Startposition und Geschwindigkeit zufällig festlegen
        this.x = 10 + Math.random() * 2500;
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    }

    animate() {
        setInterval(() => {
            // Bildwechsel in der Animation
            this.playAnimation(this.IMAGES_MOVE);
        }, 100); // Bildwechselintervall

        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60); // Bewegungstakt
    }

    moveLeft() {
        this.x -= this.speed;
    }
}
