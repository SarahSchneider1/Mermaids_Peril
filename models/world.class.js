class World {
    character = new Character(this);
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    backgroundMusic = new Audio('audio/gamesound.mp3');
    statusBarLife = new StatusBarLife();
    statusBarCoins = new StatusBarCoins();
    statusBarDrink = new StatusBarDrink();
    throwableObject = [];
    coins = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw = this.draw.bind(this);
        this.setWorld();
        this.addEventListeners(); // Event-Listener hinzufügen
        this.distributeCoins();
        this.draw();
        this.swim();
    }

    setWorld() {
        this.character.world = this;
    }

    swim() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.SPACE) {
            let bubble = new ThrowableObject(this.character.x + 100, this.character.y  + 100);
            this.throwableObject.push(bubble);

        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarLife.setPercentage(this.character.energy);
                // this.statusBarCoins.setPercentage(newCoinPercentage);
                // this.statusBarDrink.setPercentage(newDrinkPercentage);
            }
        });
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

    distributeCoins() {
        for (let i = 0; i < 10; i++) {
            let x = Math.random() * 2500; // Zufällige x-Position innerhalb der 2500 Pixel Breite
            let y = Math.random() * this.canvas.height; // Zufällige y-Position innerhalb der Canvas-Höhe
            let coin = new Coin(x, y);
            this.coins.push(coin);
        }
    }

    startBackgroundMusic() {
        this.backgroundMusic.loop = true; // Musik in einer Schleife abspielen
        this.backgroundMusic.volume = 0.0; // Lautstärke auf 100% setzen
        this.backgroundMusic.play().catch(error => {
            console.log('Audio playback failed:', error);
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Canvas leeren

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0); // Space to fixed objects

        // Alle StatusBars zeichnen, wenn sie existieren
        if (this.statusBarLife) {
            this.addToMap(this.statusBarLife);
        }
        if (this.statusBarCoins) {
            this.addToMap(this.statusBarCoins);
        }
        if (this.statusBarDrink) {
            this.addToMap(this.statusBarDrink);
        }

        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);

        // Füge diese Zeile hinzu, um die Coins zu zeichnen
        this.addObjectsToMap(this.coins);

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
