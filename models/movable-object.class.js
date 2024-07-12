class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false; // Spiegeln
    energy = 100;
    lastHit = 0;
    speedY = 0;
    acceleration = 2.5;

    // applyGravity() {
    //     setInterval(() => {
    //         if (this.isAboveGround() || this.speedY > 0) {  
    //             this.y -= this.speedY; 
    //             this.speedY -= this.acceleration;
    //         }
    //     }, 1000 / 25);  
    // }
    
    // isAboveGround() {
    //     return this.y > 0;  
    // }
    

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    isColliding(obj) {
        return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) && 
               (this.y + this.height) >= obj.y && this.y <= (obj.y + obj.height);
    }

    hit() {
        if (this.energy > 0) {
            this.energy -= 5;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
            if (this.energy === 0) {
                this.playDeadAnimation();
            } else {
                this.playHitAnimation();
            }
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //Differenz in Millisekunden
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    moveRight() {
        setInterval(() => {
            this.x += this.speed;
            this.otherDirection = false;
        }, 1000 / 60);
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
            this.otherDirection = true;
        }, 1000 / 60);
    }

    moveUp() {
        setInterval(() => {
            this.y -= this.speed;
        }, 1000 / 60);
    }

    moveDown() {
        setInterval(() => {
            this.y += this.speed;
        }, 1000 / 60);
    }
}
