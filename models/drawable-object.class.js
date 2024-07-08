class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 400;
    y = 100;
    height = 130;
    width = 130;
         

    
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
}