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
    collectedCoins = 0;
    bottles = []; 
    collectedBottles = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw = this.draw.bind(this);
        this.setWorld();
        this.addEventListeners(); // Event-Listener hinzufügen
        this.distributeCoins();
        this.distributeBottles();
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
            this.checkCoinCollisions(); // Überprüfe Kollisionen mit Coins
            this.checkBottleCollisions(); // Überprüfe Kollisionen mit Bottles
        }, 200);
    }
    checkThrowObjects() {
        if (this.keyboard && this.keyboard.SPACE && this.collectedBottles > 0) {
            let bubble = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObject.push(bubble);
            this.collectedBottles -= 1;
            this.statusBarDrink.setPercentage(this.collectedBottles * 10);
            this.character.playBubbleAnimation();
        }
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarLife.setPercentage(this.character.energy);
            }
        });
    }

    checkCoinCollisions() {
        this.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.coins.splice(index, 1); // Entferne den eingesammelten Coin
                this.collectedCoins += 1;
                let percentage = Math.min(this.collectedCoins * 10, 100); // 10 Coins entsprechen 100%
                this.statusBarCoins.setPercentage(percentage);
            }
        });
    }

    checkBottleCollisions() {
        this.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.bottles.splice(index, 1); // Entferne die eingesammelte Bottle
                this.collectedBottles += 1;
                let percentage = Math.min(this.collectedBottles * 10, 100); // 10 Bottles entsprechen 100%
                this.statusBarDrink.setPercentage(percentage);
            }
        });
    }

    distributeCoins() {
        for (let i = 0; i < 20; i++) {
            let x = Math.random() * 2500; // Zufällige x-Position innerhalb der 2500 Pixel Breite
            let y = Math.random() * this.canvas.height; // Zufällige y-Position innerhalb der Canvas-Höhe
            let coin = new Coin(x, y);
            this.coins.push(coin);
        }
    }

    distributeBottles() {
        for (let i = 0; i < 10; i++) {
            let x = Math.random() * 2500; // Zufällige x-Position innerhalb der 2500 Pixel Breite
            let y = Math.random() * this.canvas.height; // Zufällige y-Position innerhalb der Canvas-Höhe
            let bottle = new Bottle(x, y);
            this.bottles.push(bottle);
        }
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

    distributeBottles() {
        for (let i = 0; i < 10; i++) {
            let x = Math.random() * 2500; // Zufällige x-Position innerhalb der 2500 Pixel Breite
            let y = Math.random() * this.canvas.height; // Zufällige y-Position innerhalb der Canvas-Höhe
            let bottle = new Bottle(x, y);
            this.bottles.push(bottle);
        }
    }

    startBackgroundMusic() {
        this.backgroundMusic.loop = true; // Musik in einer Schleife abspielen
        this.backgroundMusic.volume = 0.0; // Lautstärke auf 100% setzen
        this.backgroundMusic.play().catch(error => {
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

        // Füge diese Zeile hinzu, um die Coins und Bottles zu zeichnen
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.bottles);

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
