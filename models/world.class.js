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
    statusBarEndboss = new StatusBarEndboss();
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
        this.addEventListeners();
        this.distributeCoins();
        this.distributeBottles();
        this.draw();
        this.swim();
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this; // Setze die Welt für jeden Feind, einschließlich des Endbosses
        });
    }

    swim() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCoinCollisions();
            this.checkBottleCollisions();
            this.checkBubbleCollisions();
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
                this.coins.splice(index, 1);
                this.collectedCoins += 1;
                let percentage = Math.min(this.collectedCoins * 10, 100);
                this.statusBarCoins.setPercentage(percentage);
            }
        });
    }

    checkBottleCollisions() {
        this.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.bottles.splice(index, 1);
                this.collectedBottles += 1;
                let percentage = Math.min(this.collectedBottles * 10, 100);
                this.statusBarDrink.setPercentage(percentage);
            }
        });
    }

    checkBubbleCollisions() {
        this.throwableObject.forEach((bubble, bubbleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (bubble.isColliding(enemy)) {
                    this.throwableObject.splice(bubbleIndex, 1);
                    enemy.hit();
                    if (enemy.energy <= 0) {
                        enemy.playDeadAnimation(); // Rufe die Tot-Animation auf
                    }
                    if (enemy instanceof Endboss) {
                        this.statusBarEndboss.setPercentage(enemy.energy);
                    }
                }
            });
        });
    }

    distributeCoins() {
        for (let i = 0; i < 20; i++) {
            let x = Math.random() * 2500;
            let y = Math.random() * this.canvas.height;
            let coin = new Coin(x, y);
            this.coins.push(coin);
        }
    }

    distributeBottles() {
        for (let i = 0; i < 10; i++) {
            let x = Math.random() * 2500;
            let y = Math.random() * this.canvas.height;
            let bottle = new Bottle(x, y);
            this.bottles.push(bottle);
        }
    }

    addEventListeners() {
        document.addEventListener('click', () => {
            this.startBackgroundMusic();
        }, { once: true });

        document.addEventListener('keydown', () => {
            this.startBackgroundMusic();
        }, { once: true });
    }

    startBackgroundMusic() {
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.0;
        this.backgroundMusic.play().catch(error => {});
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);

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
