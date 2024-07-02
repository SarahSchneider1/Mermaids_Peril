class World {
    character = new Character();
    enemies = level1.enemies;
    backgroundObjects = level1.backgroundObjects;
    canvas;
    ctx;
    keyboard;
    camera_x =  0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard; // Korrektur der Zuweisung
        this.draw = this.draw.bind(this); // Ensure 'this' context is preserved
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear canvas

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character); // Add character to map
        this.addObjectsToMap(this.enemies);

        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(this.draw);
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo) {
        if (mo.img) {
            this.ctx.save(); // Canvas-Kontext speichern
            if (mo.otherDirection) {
                this.ctx.scale(-1, 1); // Horizontal spiegeln
                this.ctx.drawImage(mo.img, -mo.x - mo.width, mo.y, mo.width, mo.height);
            } else {
                this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
            }
            this.ctx.restore(); // Canvas-Kontext wiederherstellen
        }
    }
    
    
}