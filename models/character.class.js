class Character extends MovableObject {
    // Eigenschaften
    height = 170;
    width = 170;
    x = 100;
    y = 100;
    speed = 30;
    canvasWidth = 720;
    canvasHeight = 480;

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

    IMAGES_HIT = [
        'img/Mermaid/PNG/Mermaid_1/Acceleration_000.png',
        'img/Mermaid/PNG/Mermaid_1/Acceleration_001.png',
        'img/Mermaid/PNG/Mermaid_1/Acceleration_002.png',
        'img/Mermaid/PNG/Mermaid_1/Acceleration_003.png',
        'img/Mermaid/PNG/Mermaid_1/Acceleration_004.png',
        'img/Mermaid/PNG/Mermaid_1/Acceleration_005.png',
        'img/Mermaid/PNG/Mermaid_1/Acceleration_006.png',
        'img/Mermaid/PNG/Mermaid_1/Acceleration_007.png',
        'img/Mermaid/PNG/Mermaid_1/Acceleration_008.png',
        'img/Mermaid/PNG/Mermaid_1/Acceleration_009.png',
    ];

    IMAGES_DEAD = [
        'img/Mermaid/PNG/Mermaid_1/Die_000.png',
        'img/Mermaid/PNG/Mermaid_1/Die_001.png',
        'img/Mermaid/PNG/Mermaid_1/Die_002.png',
        'img/Mermaid/PNG/Mermaid_1/Die_003.png',
        'img/Mermaid/PNG/Mermaid_1/Die_004.png',
        'img/Mermaid/PNG/Mermaid_1/Die_005.png',
        'img/Mermaid/PNG/Mermaid_1/Die_006.png',
        'img/Mermaid/PNG/Mermaid_1/Die_007.png',
        'img/Mermaid/PNG/Mermaid_1/Die_008.png',
        'img/Mermaid/PNG/Mermaid_1/Die_009.png',
    ];

    currentImage = 0;
    hasMoved = false;
    idleInterval = null; // Referenz auf das Idle-Intervall
    hitTimeout = null;  // Referenz auf das Hit-Timeout
    deadTimeout = null; // Referenz auf das Dead-Timeout
    maxRight = 2400;

    constructor(world) {
        super();
        this.world = world;
        this.loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_MOVE);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_HIT); 
        this.loadImages(this.IMAGES_DEAD); 
        this.animate();
        this.playIdleAnimation(); // Idle-Animation am Anfang starten
    }

    animate() {
        this.startMovementInterval();
        this.startMoveAnimationInterval();
    }

    startMovementInterval() {
        setInterval(() => { // Charakter bewegen
            const isMoving = this.handleMovement();
            if (isMoving) {
                this.hasMoved = true; // Setzt die Variable, dass der Charakter sich bewegt hat
                this.playAnimation(this.IMAGES_MOVE);
                if (this.idleInterval) {
                    clearInterval(this.idleInterval); // Idle-Animation stoppen
                    this.idleInterval = null; // Referenz aufheben
                }
            }
        }, 1000 / 10);
    }

    handleMovement() {
        let isMoving = false; // Initialisierung der isMoving-Variable
    
        if (this.world.keyboard.RIGHT && this.x + this.width < this.maxRight) {
            this.x += this.speed;
            this.otherDirection = false;
            isMoving = true;
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.x -= this.speed;
            this.otherDirection = true;
            isMoving = true;
        }
        if (this.world.keyboard.DOWN && this.y + this.height < this.canvasHeight) {
            this.y += this.speed;
            isMoving = true;
        }
        if (this.world.keyboard.UP && this.y > 0) {
            this.y -= this.speed;
            isMoving = true;
        }
        this.world.camera_x = -this.x + 100;
        return isMoving;
    }

    startMoveAnimationInterval() {
        setInterval(() => { // Move animation
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.hasMoved) {
                this.playAnimation(this.IMAGES_MOVE);
            }
        }, 300); // Geschwindigkeit der Move-Animation
    }

    playIdleAnimation() {
        this.currentImage = 0;
        let idleYDirection = 1;
        const idleAmplitude = 30; // Amplitude der vertikalen Bewegung
        const initialY = this.y;
        this.idleInterval = setInterval(() => { // Idle-Intervall speichern
            this.img = this.imageCache[this.IMAGES_IDLE[this.currentImage % this.IMAGES_IDLE.length]];
            this.currentImage++;
            this.y += idleYDirection * 0.6; // Geschwindigkeit der Bewegung
            if (this.hasMoved) {
                clearInterval(this.idleInterval);
                this.playAnimation(this.IMAGES_MOVE); // Move-Animation starten, wenn Idle-Animation beendet ist
            }
        }, 150); // Geschwindigkeit der Idle-Animation
    }

    playHitAnimation() {
        if (this.hitTimeout) {
            clearTimeout(this.hitTimeout); // Bereits laufendes Hit-Timeout stoppen
        }
        this.currentImage = 0;
        const hitDuration = this.IMAGES_HIT.length * 200;
        this.playAnimation(this.IMAGES_HIT);
        this.hitTimeout = setTimeout(() => {
            this.hitTimeout = null; // Timeout-Referenz aufheben
            if (this.energy <= 0) {
                this.playDeadAnimation(); // Todes-Animation abspielen, wenn Energie null ist
            } else {
                this.playIdleAnimation(); // Idle-Animation abspielen
            }
        }, hitDuration);
    }

    playDeadAnimation() {
        if (this.deadTimeout) {
            clearTimeout(this.deadTimeout); // Bereits laufendes Dead-Timeout stoppen
        }
        this.currentImage = 0;
        const deadDuration = this.IMAGES_DEAD.length * 200;
        this.playAnimation(this.IMAGES_DEAD);
        this.deadTimeout = setTimeout(() => {
            this.deadTimeout = null; // Timeout-Referenz aufheben
        }, deadDuration);
    }

    hit() {
        super.hit(); // Energie verringern
        if (this.energy <= 0) { // Prüfen, ob der Charakter tot ist
            this.playDeadAnimation(); // Todes-Animation abspielen
        } else {
            this.playHitAnimation(); // Treffer-Animation abspielen
        }
    }
}
