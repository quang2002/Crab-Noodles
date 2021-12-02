import { GameScene } from "../components/game-scene.js";
import { BoyPlayer } from "../entity/boy-player.js";
import { RedGate } from "../entity/red-gate.js";
import { AK47 } from "../weapon/ak47.js";
import { LightSaber } from "../weapon/light-saber.js";

export class Stage01 extends GameScene {
    constructor() {
        super("Stage01");
    }

    /**
     * preload
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        scene.load.image("tilesets.tileset-01", "./assets/tilesets/tileset-01.png");
        scene.load.tilemapTiledJSON("maps.state-01", "./assets/maps/stage-01.json");
    }

    create() {
        this.player = new BoyPlayer(this, 0, 0);
        this.player.setWeapon(new AK47(this, 0, 0));
        //this.player.setWeapon(new LightSaber(this, 0, 0));

        const enemy = new RedGate(this, 400, 500);


        // add title map
        this.map = this.add.tilemap("maps.state-01");
        const tilesets = [
            this.map.addTilesetImage("tileset-01", "tilesets.tileset-01"),
        ];
        this.layers = {
            "ground": this.map.createLayer("ground", tilesets).setDepth(this.player.depth - 1),
            "wall": this.map.createLayer("wall", tilesets).setDepth(this.player.depth + 1),
            "features": this.map.createLayer("features", tilesets).setDepth(this.player.depth + 2),
        }

        // create collision for each feature in map
        const wall = this.createCollisionOnLayer(this.layers.wall);
        const features = this.createCollisionOnLayer(this.layers.features);
        this.physics.add.collider(this.player, [features, wall]);

        this.physics.add.collider(enemy, [features, wall]);

        this.player.weapons.active?.collision.push(wall, features);



        enemy.weapon?.collision.push(wall, features);
    }

    update() {
        super.update();
    }
}