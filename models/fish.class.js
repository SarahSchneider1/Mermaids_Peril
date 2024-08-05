class Fish extends MovableObject {
    width = 60;
    height = 60;
    IMAGES_MOVE = [
        'img/Fish, crab, jellyfish, shark/PNG/Fish_2/Fish_move_2_000.png',
        'img/Fish, crab, jellyfish, shark/PNG/Fish_2/Fish_move_2_001.png',
        'img/Fish, crab, jellyfish, shark/PNG/Fish_2/Fish_move_2_002.png',
        'img/Fish, crab, jellyfish, shark/PNG/Fish_2/Fish_move_2_003.png',
        'img/Fish, crab, jellyfish, shark/PNG/Fish_2/Fish_move_2_004.png',
        'img/Fish, crab, jellyfish, shark/PNG/Fish_2/Fish_move_2_005.png',
        'img/Fish, crab, jellyfish, shark/PNG/Fish_2/Fish_move_2_006.png',
        'img/Fish, crab, jellyfish, shark/PNG/Fish_2/Fish_move_2_007.png',
        'img/Fish, crab, jellyfish, shark/PNG/Fish_2/Fish_move_2_008.png',
        'img/Fish, crab, jellyfish, shark/PNG/Fish_2/Fish_move_2_009.png'
    ];
    currentImage = 0;
    speed = 0.5;

    constructor() {
        super().loadImage('img/Fish, crab, jellyfish, shark/PNG/Fish_2/Fish_move_2_000.png');
        
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
