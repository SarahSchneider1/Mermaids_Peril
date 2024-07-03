class Level {
    enemies;
    backgroundObjects;
    level_end_x = 2250;

    constructor(enemies, backgroundObjects) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
    }
}