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
        this.addEventListeners(); // Event-Listener hinzufügen
        this.draw();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    console.log('Collision with character, energy:', this.character.energy);
                }
            });
        }, 200);
    }

    addEventListeners() {
        // Event-Listener für Benutzerinteraktionen hinzufügen
        document.addEventListener('click', () => {
            this.startBackgroundMusic();
        }, { once: true });

        document.addEventListener('keydown', () => {
            this.startBackgroundMusic();
        }, { once: true });
    }

    startBackgroundMusic() {
        this.backgroundMusic.loop = true; // Musik in einer Schleife abspielen
        this.backgroundMusic.volume = 0.5; // Lautstärke auf 50% setzen
        this.backgroundMusic.play().catch(error => {
            console.log('Audio playback failed:', error);
        });
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
        mo.drawImage(this.ctx);
        mo.drawFrame(this.ctx);
    }
}
