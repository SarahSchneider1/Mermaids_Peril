class MovableObject {
    x = 400;
    y = 100;
    img;
    height = 130;
    width = 130;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false; //Spiegeln

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

    moveRight() {
        console.log('Moving Right');
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    moveUp() {
        
    }

    moveDown() {
        
    }
}