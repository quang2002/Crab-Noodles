export class Stage01 extends Phaser.Scene {
    constructor() {
        super("Stage01");
    }

    preload() {
        this.load.image("tilesets.tileset-01", "./assets/tilesets/tileset-01.png");
        this.load.tilemapTiledJSON("maps.state-01", "./assets/maps/state-01.json");
    }

    create() {
        this.map = this.add.tilemap("maps.state-01");
        const tilesets = [
            this.map.addTilesetImage("tileset-01", "tilesets.tileset-01"),
        ];
        this.layers = {
            "ground": this.map.createLayer("ground", tilesets),
            "wall": this.map.createLayer("wall", tilesets),
            "features": this.map.createLayer("features", tilesets),
        }
    }

    update() {

    }
}