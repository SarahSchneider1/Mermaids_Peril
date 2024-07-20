class Character extends MovableObject {
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

    IMAGES_BUBBLE = [
        'img/Mermaid/PNG/Mermaid_1/Attack_000.png',
        'img/Mermaid/PNG/Mermaid_1/Attack_001.png',
        'img/Mermaid/PNG/Mermaid_1/Attack_002.png',
        'img/Mermaid/PNG/Mermaid_1/Attack_003.png',
        'img/Mermaid/PNG/Mermaid_1/Attack_004.png',
        'img/Mermaid/PNG/Mermaid_1/Attack_005.png',
        'img/Mermaid/PNG/Mermaid_1/Attack_006.png',
        'img/Mermaid/PNG/Mermaid_1/Attack_007.png',
        'img/Mermaid/PNG/Mermaid_1/Attack_008.png',
        'img/Mermaid/PNG/Mermaid_1/Attack_009.png',
    ];

    currentImage = 0;
    hasMoved = false;
    idleInterval = null; 
    hitTimeout = null;  
    deadTimeout = null; 
    maxRight = 2400;
    dead = false;
    collectedBottles = 0; 
    isPlayingBubbleAnimation = false;

    constructor(world) {
        super();
        this.world = world;
        this.loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_MOVE);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_HIT);
        this.loadImages(this.IMAGES_DEAD);
        super.loadImages(this.IMAGES_BUBBLE);
        this.animate();
        this.playIdleAnimation(); 
    }

    animate() {
        this.startMovementInterval();
        this.startMoveAnimationInterval();
    }

    startMovementInterval() {
        setInterval(() => { 
            const isMoving = this.handleMovement();
            if (isMoving) {
                this.hasMoved = true; 
                this.playMoveAnimation();
                if (this.idleInterval) {
                    clearInterval(this.idleInterval);
                    this.idleInterval = null; 
                }
            }
        }, 100); 
    }

    handleMovement() {
        let isMoving = false;
    
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
        if (this.world.keyboard.SPACE && !this.isPlayingBubbleAnimation) {
            this.playBubbleAnimation();
        }
        this.world.camera_x = -this.x + 100;
        return isMoving;
    }

    startMoveAnimationInterval() {
        setInterval(() => { // Move animation
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD, null, 200); 
            } else if (this.hasMoved) {
                this.playAnimation(this.IMAGES_MOVE, null, 20); 
            }
        }, 700);
    }

    playAnimation(images, onComplete = null, intervalTime = 400) {
        let currentImage = 0;
        const interval = setInterval(() => {
            this.img = this.imageCache[images[currentImage]];
            currentImage++;
            if (currentImage >= images.length) {
                clearInterval(interval);
                if (onComplete) {
                    onComplete();
                }
            }
        }, intervalTime); 
    }

    playIdleAnimation() {
        let idleYDirection = 1;
        const idleAmplitude = 30; 
        const initialY = this.y;
        this.idleInterval = setInterval(() => { 
            this.img = this.imageCache[this.IMAGES_IDLE[this.currentImage % this.IMAGES_IDLE.length]];
            this.currentImage++;
            this.y += idleYDirection * 0.6; // Geschwindigkeit der Bewegung
            if (this.hasMoved) {
                clearInterval(this.idleInterval);
                this.playMoveAnimation(); // Move-Animation starten, wenn Idle-Animation beendet ist
            }
        }, 150); 
    }

    playHitAnimation() {
        if (this.hitTimeout) {
            clearTimeout(this.hitTimeout); // Bereits laufendes Hit-Timeout stoppen
        }
        this.currentImage = 0;
        this.playAnimation(this.IMAGES_HIT, () => {
            this.hitTimeout = null; // Timeout-Referenz aufheben
            if (this.energy <= 0) {
                this.playDeadAnimation(); 
            } else {
                this.playMoveAnimation(); 
            }
        }, 50); 
    }

    playDeadAnimation() {
        if (this.deadTimeout) {
            clearTimeout(this.deadTimeout); 
        }
    
        this.playAnimation(this.IMAGES_DEAD, () => {
            this.deadTimeout = null; 
           
        }, 250); 
    }

    playMoveAnimation() {
        this.currentImage = 0;
        this.playAnimation(this.IMAGES_MOVE);
    }

    playBubbleAnimation() {
        if (this.isPlayingBubbleAnimation) {
            console.log('Bubble-Animation bereits im Gange');
            return;
        }
        console.log('playBubbleAnimation aufgerufen');
        if (!this.dead && this.collectedBottles > 0) { 
            console.log('Genügend Bottles gesammelt und Charakter nicht tot');
            this.isPlayingBubbleAnimation = true; 
            let bubbleThrowIndex = 5; 
            this.currentImage = 0;
    
            const interval = setInterval(() => {
                console.log('Bubble-Animation Frame:', this.currentImage);
                this.img = this.imageCache[this.IMAGES_BUBBLE[this.currentImage]];
                if (this.currentImage === bubbleThrowIndex) {
                    this.throwBubble(); // Bubble beim richtigen Frame werfen
                }
                this.currentImage++;
                if (this.currentImage >= this.IMAGES_BUBBLE.length) {
                    clearInterval(interval);
                    this.playMoveAnimation(); // Move-Animation abspielen
                    this.isPlayingBubbleAnimation = false; 
                    console.log('Bubble-Animation beendet');
                }
            }, 500); 
        } else {
            console.log('Nicht genügend Bottles gesammelt oder Charakter tot');
        }
    }
    
    
    throwBubble() {
        if (this.collectedBottles > 0) {
            this.collectedBottles--; // Reduziert die Anzahl der gesammelten Bottles
            new ThrowableObject(this.x, this.y);
            console.log('throwBubble');
        }
    }

    collectBottle() {
        this.collectedBottles++;
        console.log('Flasche gesammelt, Anzahl der Bottles:', this.collectedBottles);
    }



}