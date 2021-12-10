import { GameConfig } from "../components/game-config.js";
import { GameScene } from "../components/game-scene.js";
import { BoyPlayer } from "../entity/boy-player.js";
import { Entity } from "../entity/entity.js";
import { Player } from "../entity/player.js";
import { RedGate } from "../entity/red-gate.js";
import { AK47 } from "../weapon/ak47.js";
import { XuanYuanSword } from "../weapon/xuan-yuan-sword.js";
import { LightSaber } from "../weapon/light-saber.js";

export class Stage02 extends GameScene {
    constructor() {
        super("Stage02");
    }

    /**
     * preload
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        scene.load.image("tilesets.tileset-01", "./assets/tilesets/tileset-01.png");
        scene.load.image("tilesets.tileset-02", "./assets/tilesets/tileset-02.png");
        scene.load.tilemapTiledJSON("maps.stage-02", "./assets/maps/stage-02.json");
    }

    create() {
        // add tilemap
        this.map = this.add.tilemap("maps.stage-02");
        const tilesets = [
            this.map.addTilesetImage("tileset-01", "tilesets.tileset-01"),
            this.map.addTilesetImage("tileset-02", "tilesets.tileset-02"),
        ];
        this.layers = {
            "ground": this.map.createLayer("ground", tilesets).setDepth(-1),
            "wall": this.map.createLayer("wall", tilesets).setDepth(1),
            "features": this.map.createLayer("features", tilesets).setDepth(2),
        }

        // create collision for each feature in map
        const wall = this.createCollisionOnLayer(this.layers.wall);
        const features = this.createCollisionOnLayer(this.layers.features);

        Entity.collision = [features, wall];

        /**
         * @type {Player}
         */
        this.player = new GameConfig["player_type"](this, 0, 0);
        this.player.setPosition(-946, -438);
        this.player.setWeapon(new AK47(this, 0, 0));
        this.player.setWeapon(new XuanYuanSword(this, 0, 0));

        this.cameras.main.setBounds(-1024, -512, 2048, 1024);

        new RedGate(this, -400, 264);
        new RedGate(this, 435, 330);
        new RedGate(this, 753, -213);
        new RedGate(this, 366, -213);
    }

    update() {
        super.update();
    }
}