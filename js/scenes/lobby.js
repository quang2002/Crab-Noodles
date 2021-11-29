import { BoyPlayer } from "../entity/boy-player.js";

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

        this.player = new BoyPlayer(this, 0, 0, { entityHP: 10, entitySpeed: 100, entityRunningSpeed: 200 });

        this.cameras.main.setBounds(-512, -128, 1056, 640);

    }

    update() {
        this.player.update();

        //console.log(this.layers.ground.width + ", " + this.layers.ground.height);
    }
}