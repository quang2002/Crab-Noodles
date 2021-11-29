import { GameScene } from "../components/game-scene.js";
import { BoyPlayer } from "../entity/boy-player.js";
import { AK47 } from "../weapon/ak47.js";
import { Rapier } from "../weapon/rapier.js";

export class Stage01 extends GameScene {
    constructor() {
        super("Stage01");
    }

    preload() {
        this.load.image("tilesets.tileset-01", "./assets/tilesets/tileset-01.png");
        this.load.tilemapTiledJSON("maps.state-01", "./assets/maps/stage-01.json");
    }

    create() {
        this.player = new BoyPlayer(this, 0, 0, { hp: 10, speed: 100, runningSpeed: 200 });
        this.player.setWeapon(new Rapier(this, 0, 0, {
            fireRate: 300,
            speed: 50
        }))

        this.map = this.add.tilemap("maps.state-01");
        const tilesets = [
            this.map.addTilesetImage("tileset-01", "tilesets.tileset-01"),
        ];
        this.layers = {
            "ground": this.map.createLayer("ground", tilesets).setDepth(this.player.depth - 1),
            "wall": this.map.createLayer("wall", tilesets).setDepth(this.player.depth + 1),
            "features": this.map.createLayer("features", tilesets).setDepth(this.player.depth + 2),
        }

        const wall = this.createCollisionOnLayer(this.layers.wall);
        const features = this.createCollisionOnLayer(this.layers.features);
        this.physics.add.collider(this.player, features);
        this.physics.add.collider(this.player, wall);

        this.player.weapon.collision.push(wall, features);
    }

    update() {
        super.update();
    }
}