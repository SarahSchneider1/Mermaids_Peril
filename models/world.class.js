class World {
    character = new Character();
    enemies = [
        new Fish(),
        new Fish(),
        new Fish2(),
        new Fish2(),
        new Fish(),
        new Crab(),
        new Crab(),
        new Jellyfish(),
        new Jellyfish(),

    ];
    backgroundObjects = [
        new BackgroundObject('img/Game Backgrounds/Backgrounds_2/PNG/2_game_background/layers/1.png', 0),
        new BackgroundObject('img/Game Backgrounds/Backgrounds_2/PNG/2_game_background/layers/2.png', 0),
        new BackgroundObject('img/Game Backgrounds/Backgrounds_2/PNG/2_game_background/layers/3.png', 0),
        new BackgroundObject('img/Game Backgrounds/Backgrounds_2/PNG/2_game_background/layers/4.png', 0),
        new BackgroundObject('img/Game Backgrounds/Backgrounds_2/PNG/2_game_background/layers/5.png', 0),
        new BackgroundObject('img/Game Backgrounds/Backgrounds_2/PNG/2_game_background/layers/6.png', 0)
    ]
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();

    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //canvas wird gelöscht

        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character); //wird dann alles direkt nacheinander hinzugefügt
        this.addObjectsToMap(this.enemies);
     
        requestAnimationFrame(this.draw);
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}