class MovableObject {
    x = 400;
    y = 100;
    img;
    height = 130;
    width = 130;



    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving Right');
    }

    moveLeft() {
        
    }

    moveUp() {
        
    }

    moveDown() {
        
    }
}