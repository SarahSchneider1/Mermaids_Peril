class World {
    character = new Character(this);
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    backgroundMusic = new Audio('audio/gamesound.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw = this.draw.bind(this);
        this.setWorld();
        this.startBackgroundMusic();
        this.draw();
    }

    setWorld() {
        this.character.world = this;
    }

    startBackgroundMusic() {
        this.backgroundMusic.loop = true; // Musik in einer Schleife abspielen
        this.backgroundMusic.volume = 0.0; // Lautstärke auf 50% setzen
        this.backgroundMusic.play();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Canvas leeren

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character); // Charakter zur Karte hinzufügen
        this.addObjectsToMap(this.level.enemies);

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
