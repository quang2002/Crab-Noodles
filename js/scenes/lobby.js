import { BoyPlayer } from "../entity/boy-player.js";
import { GameScene } from "../components/game-scene.js";

export class LobbyScene extends GameScene {
    constructor() {
        super("LobbyScene");
    }

    preload() {
        this.load.image("tilesets.tileset-01", "./assets/tilesets/tileset-01.png");
        this.load.tilemapTiledJSON("maps.lobby", "./assets/maps/lobby.json");
    }

    create() {
        this.player = new BoyPlayer(this, 0, 0, { hp: 10, speed: 100, runningSpeed: 200 });


        this.map = this.add.tilemap("maps.lobby");
        const tilesets = [
            this.map.addTilesetImage("tileset-01", "tilesets.tileset-01"),
        ];
        this.layers = {
            "ground": this.map.createLayer("ground", tilesets).setDepth(this.player.depth - 1),
            "wall": this.map.createLayer("wall", tilesets).setDepth(this.player.depth - 1),
            "features": this.map.createLayer("features", tilesets).setDepth(this.player.depth + 1),
            "objects": this.map.createLayer("objects", tilesets).setDepth(this.player.depth + 1),
        }


        this.cameras.main.setBounds(-520, -130, 1050, 655);

        const wall = this.createCollisionOnLayer(this.layers.wall);
        const features = this.createCollisionOnLayer(this.layers.features);
        const ground = this.createCollisionOnLayer(this.layers.ground);

        this.physics.add.collider(this.player, wall);
        this.physics.add.collider(this.player, features);
        this.physics.add.collider(this.player, ground);
    }

    update() {
        this.player.update();

        //console.log(this.layers.ground.width + ", " + this.layers.ground.height);
    }
}