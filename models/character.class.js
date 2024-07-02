class Character extends MovableObject {
    // Eigenschaften
    height = 200;
    width = 200;
    x = 100;
    y = 100;
    speed = 5;
    IMAGES_MOVE = [
        'img/Mermaid/PNG/Mermaid_1/Move_001.png',
        'img/Mermaid/PNG/Mermaid_1/Move_002.png',
        'img/Mermaid/PNG/Mermaid_1/Move_003.png',
        'img/Mermaid/PNG/Mermaid_1/Move_004.png',
        'img/Mermaid/PNG/Mermaid_1/Move_005.png',
        'img/Mermaid/PNG/Mermaid_1/Move_006.png',
        'img/Mermaid/PNG/Mermaid_1/Move_007.png',
        'img/Mermaid/PNG/Mermaid_1/Move_008.png',
        'img/Mermaid/PNG/Mermaid_1/Move_009.png',
        'img/Mermaid/PNG/Mermaid_1/Move_000.png'
    ];
    currentImage = 0;
    world;

    constructor() {
        super();
        this.loadImage('img/Mermaid/PNG/Mermaid_1/Move_000.png');
        this.loadImages(this.IMAGES_MOVE);
        this.animate();
    }

    animate() {
        setInterval(() => { // Charakter bewegen
            if (this.world.keyboard.RIGHT && this.x <this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            if (this.world.keyboard.DOWN) {
                this.y += this.speed;
            }
            if (this.world.keyboard.UP) {
                this.y -= this.speed;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => { // Move animation
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                let i = this.currentImage % this.IMAGES_MOVE.length;
                let path = this.IMAGES_MOVE[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 100);
    }
}