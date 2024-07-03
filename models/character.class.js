class Character extends MovableObject {
    // Eigenschaften
    height = 200;
    width = 200;
    x = 100;
    y = 100;
    speed = 10;
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
    IMAGES_IDLE = [
        'img/Mermaid/PNG/Mermaid_1/Idle_000.png',
        'img/Mermaid/PNG/Mermaid_1/Idle_001.png',
        'img/Mermaid/PNG/Mermaid_1/Idle_002.png',
        'img/Mermaid/PNG/Mermaid_1/Idle_003.png',
        'img/Mermaid/PNG/Mermaid_1/Idle_004.png',
        'img/Mermaid/PNG/Mermaid_1/Idle_005.png',
        'img/Mermaid/PNG/Mermaid_1/Idle_006.png',
        'img/Mermaid/PNG/Mermaid_1/Idle_007.png',
        'img/Mermaid/PNG/Mermaid_1/Idle_008.png',
        'img/Mermaid/PNG/Mermaid_1/Idle_009.png'
    ];
    currentImage = 0;
    move_sound = new Audio('audio/gamesound.mp3');
    hasMoved = false;

    constructor(world) {
        super();
        this.world = world;
        this.loadImage('img/Mermaid/PNG/Mermaid_1/Move_000.png');
        this.loadImages(this.IMAGES_MOVE);
        this.loadImages(this.IMAGES_IDLE);
        this.animate();
        this.playIdleAnimation(); // Idle-Animation am Anfang starten
    }

    animate() {
        this.startMovementInterval();
        this.startMoveAnimationInterval();
    }

    startMovementInterval() {
        setInterval(() => { // Charakter bewegen
            this.move_sound.pause();
            const isMoving = this.handleMovement();
            if (isMoving) {
                this.hasMoved = true; // Setzt die Variable, dass der Charakter sich bewegt hat
                this.playAnimation(this.IMAGES_MOVE);
            }
        }, 1000 / 10);
    }

    handleMovement() {
        let isMoving = false;
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.x += this.speed;
            this.otherDirection = false;
            this.move_sound.play();
            isMoving = true;
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.x -= this.speed;
            this.otherDirection = true;
            this.move_sound.play();
            isMoving = true;
        }
        if (this.world.keyboard.DOWN) {
            this.y += this.speed;
            this.move_sound.play();
            isMoving = true;
        }
        if (this.world.keyboard.UP) {
            this.y -= this.speed;
            this.move_sound.play();
            isMoving = true;
        }
        this.world.camera_x = -this.x + 100;
        return isMoving;
    }

    startMoveAnimationInterval() {
        setInterval(() => { // Move animation
            if (this.hasMoved && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN)) {
                this.playAnimation(this.IMAGES_MOVE);
            }
        }, 300); // Geschwindigkeit der Move-Animation
    }

    playIdleAnimation() {
        this.currentImage = 0; 
        let idleYDirection = 1; 
        const idleAmplitude = 30; // Amplitude der vertikalen Bewegung
        const initialY = this.y; 
        const idleInterval = setInterval(() => {
            this.img = this.imageCache[this.IMAGES_IDLE[this.currentImage % this.IMAGES_IDLE.length]];
            this.currentImage++;
            this.y += idleYDirection * 0.6; // Geschwindigkeit der Bewegung
            if (this.hasMoved) {
                clearInterval(idleInterval);
            }
        }, 150); // Geschwindigkeit der Idle-Animation
    }
}
