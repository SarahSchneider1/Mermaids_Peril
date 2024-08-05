class Fish2 extends MovableObject {
    width = 40;
    height = 40;
    IMAGES_MOVE = [
        'img/Fish, crab, jellyfish, shark/PNG/Fish_3/Fish_move_3_000.png',
        'img/Fish, crab, jellyfish, shark/PNG/Fish_3/Fish_move_3_001.png',
        'img/Fish, crab, jellyfish, shark/PNG/Fish_3/Fish_move_3_002.png',
        'img/Fish, crab, jellyfish, shark/PNG/Fish_3/Fish_move_3_003.png',
        'img/Fish, crab, jellyfish, shark/PNG/Fish_3/Fish_move_3_004.png',
        'img/Fish, crab, jellyfish, shark/PNG/Fish_3/Fish_move_3_005.png',
        'img/Fish, crab, jellyfish, shark/PNG/Fish_3/Fish_move_3_006.png',
        'img/Fish, crab, jellyfish, shark/PNG/Fish_3/Fish_move_3_007.png',
        'img/Fish, crab, jellyfish, shark/PNG/Fish_3/Fish_move_3_008.png',
        'img/Fish, crab, jellyfish, shark/PNG/Fish_3/Fish_move_3_009.png',

    ];
    currentImage = 0;
    speed = 0.1;

    constructor() {
        super().loadImage('img/Fish, crab, jellyfish, shark/PNG/Fish_3/Fish_move_3_000.png');
        
        this.x = 200 + Math.random() * 2500;
        this.y = 0 + Math.random() * (480 - 150);

        this.loadImages(this.IMAGES_MOVE);
        this.animate();
    }

    loadImages(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
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

    hit() {
        this.energy -= 100; // Reduziere die Energie um 25 (oder einen anderen Wert)
        if (this.energy < 0) {
            this.energy = 0; // Stelle sicher, dass die Energie nicht negativ wird
        }
    }
}
