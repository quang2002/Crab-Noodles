export class LobbyScene extends Phaser.Scene {
    constructor() {
        super("LobbyScene");
    }

    preload() {
        this.load.image("tilesets.tileset-01", "./assets/tilesets/tileset-01.png");
        this.load.tilemapTiledJSON("maps.lobby", "./assets/maps/lobby.json");
    }

    create() {
        this.map = this.add.tilemap("maps.lobby");
        const tilesets = [
            this.map.addTilesetImage("tileset-01", "tilesets.tileset-01"),
        ];
        this.layers = {
            "ground": this.map.createLayer("ground", tilesets),
            "wall": this.map.createLayer("wall", tilesets),
            "features": this.map.createLayer("features", tilesets),
            "objects": this.map.createLayer("objects", tilesets),
        }
    }

    update() {

    }
}