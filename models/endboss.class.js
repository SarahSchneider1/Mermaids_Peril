class Endboss extends MovableObject {
    height = 300;
    width = 350;

    IMAGES_MOVE = [
        'img/Fish, crab, jellyfish, shark/PNG/Shark_1/Shark_move_1_000.png',
        'img/Fish, crab, jellyfish, shark/PNG/Shark_1/Shark_move_1_001.png',
        'img/Fish, crab, jellyfish, shark/PNG/Shark_1/Shark_move_1_002.png',
        'img/Fish, crab, jellyfish, shark/PNG/Shark_1/Shark_move_1_003.png',
        'img/Fish, crab, jellyfish, shark/PNG/Shark_1/Shark_move_1_004.png',
        'img/Fish, crab, jellyfish, shark/PNG/Shark_1/Shark_move_1_005.png',
        'img/Fish, crab, jellyfish, shark/PNG/Shark_1/Shark_move_1_006.png',
        'img/Fish, crab, jellyfish, shark/PNG/Shark_1/Shark_move_1_007.png',
        'img/Fish, crab, jellyfish, shark/PNG/Shark_1/Shark_move_1_008.png',
        'img/Fish, crab, jellyfish, shark/PNG/Shark_1/Shark_move_1_009.png'

    ];

    IMAGES_DEAD = [
        'img/Fish, crab, jellyfish, shark/PNG/Shark_1/Shark_die_1_000.png',
        'img/Fish, crab, jellyfish, shark/PNG/Shark_1/Shark_die_1_001.png',
        'img/Fish, crab, jellyfish, shark/PNG/Shark_1/Shark_die_1_002.png',
        'img/Fish, crab, jellyfish, shark/PNG/Shark_1/Shark_die_1_003.png',
        'img/Fish, crab, jellyfish, shark/PNG/Shark_1/Shark_die_1_004.png',
        'img/Fish, crab, jellyfish, shark/PNG/Shark_1/Shark_die_1_005.png',
        'img/Fish, crab, jellyfish, shark/PNG/Shark_1/Shark_die_1_006.png',
        'img/Fish, crab, jellyfish, shark/PNG/Shark_1/Shark_die_1_007.png',
        'img/Fish, crab, jellyfish, shark/PNG/Shark_1/Shark_die_1_008.png',
        'img/Fish, crab, jellyfish, shark/PNG/Shark_1/Shark_die_1_009.png',


    ];

    energy = 100;

    constructor(world) {
        super();
        this.world = world;
        this.loadImage(this.IMAGES_MOVE[0]);
        this.loadImages(this.IMAGES_MOVE);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2400;
        this.animate();
    }

    animate() {
                setInterval(() => {
            // Bildwechsel in der Animation
            this.playAnimation(this.IMAGES_MOVE);
        }, 100); // Bildwechselintervall
    }

    hit() {
        this.energy -= 50; // Reduziere die Energie um 25 (oder einen anderen Wert)
        if (this.energy < 0) {
            this.energy = 0; // Stelle sicher, dass die Energie nicht negativ wird
        }
        if (this.energy === 0) {
            this.playDeadAnimation(); // Rufe die Tot-Animation auf, wenn die Energie 0 ist
        }
    }




}