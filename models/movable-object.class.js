class MovableObject {
    x = 400;
    y = 100;
    img;
    height = 130;
    width = 130;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false; // Spiegeln
    energy = 100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    drawImage(ctx) {
        if (this.img) {
            ctx.save(); // Canvas-Kontext speichern
            if (this.otherDirection) {
                ctx.scale(-1, 1); // Horizontal spiegeln
                ctx.drawImage(this.img, -this.x - this.width, this.y, this.width, this.height);
            } else {
                ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            }
            ctx.restore(); // Canvas-Kontext wiederherstellen
        }
    }

    drawFrame(ctx) {
        if (this.img) {
            // Rechteck zeichnen
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    isColliding(obj) {
        return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) && 
               (this.y + this.height) >= obj.y && this.y <= (obj.y + obj.height);
    }

    hit() {
        this.energy -= 5;
        if(this.energy < 0) {
            this.energy = 0;
        }
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
