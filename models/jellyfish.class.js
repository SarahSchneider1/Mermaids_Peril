class Jellyfish extends MovableObject {
    height = 80;
    width = 80;
    IMAGES_MOVE = [
        'img/Fish, crab, jellyfish, shark/PNG/Jellyfish_1/Jellyfish_move_1_000.png',
        'img/Fish, crab, jellyfish, shark/PNG/Jellyfish_1/Jellyfish_move_1_001.png',
        'img/Fish, crab, jellyfish, shark/PNG/Jellyfish_1/Jellyfish_move_1_002.png',
        'img/Fish, crab, jellyfish, shark/PNG/Jellyfish_1/Jellyfish_move_1_003.png',
        'img/Fish, crab, jellyfish, shark/PNG/Jellyfish_1/Jellyfish_move_1_004.png',
        'img/Fish, crab, jellyfish, shark/PNG/Jellyfish_1/Jellyfish_move_1_005.png',
        'img/Fish, crab, jellyfish, shark/PNG/Jellyfish_1/Jellyfish_move_1_006.png',
        'img/Fish, crab, jellyfish, shark/PNG/Jellyfish_1/Jellyfish_move_1_007.png',
        'img/Fish, crab, jellyfish, shark/PNG/Jellyfish_1/Jellyfish_move_1_008.png',
        'img/Fish, crab, jellyfish, shark/PNG/Jellyfish_1/Jellyfish_move_1_009.png'
    ];
    currentImage = 0;

    constructor() {
        super();
        this.loadImage('img/Fish, crab, jellyfish, shark/PNG/Jellyfish_1/Jellyfish_move_1_000.png');
        
        this.x = 200 + Math.random() * 2500;
        this.y = 100;


        this.currentImage = 0; 
        this.speed = 1; // Initialisierung der Geschwindigkeit
        this.direction = 1; // Richtung der Bewegung: 1 für runter, -1 für hoch

        this.loadImages(this.IMAGES_MOVE); // Lade alle Bilder in das Cache


        this.animate();
    }

    loadImages(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    animate() {
        setInterval(() => {
            // Bildwechsel in der Animation
            this.playAnimation(this.IMAGES_MOVE);
        }, 100); // Bildwechselintervall

        setInterval(() => {
            this.move();
        }, 1000 / 60); // Bewegungstakt
    }

    move() {
        this.y += this.speed * this.direction;

        // Umkehrung der Bewegungsrichtung bei Erreichen der Grenzen
        if (this.y >= 400 || this.y <= 100) {
            this.direction *= -1;
        }
    }
}
