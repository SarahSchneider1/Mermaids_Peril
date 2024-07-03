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

    constructor(world) {
        super();
        this.world = world;
        this.loadImage(this.IMAGES_MOVE[0]);
        this.loadImages(this.IMAGES_MOVE);
        this.x = 2400;
        this.animate();
    }

    animate() {
                setInterval(() => {
            // Bildwechsel in der Animation
            this.playAnimation(this.IMAGES_MOVE);
        }, 100); // Bildwechselintervall
    }

}