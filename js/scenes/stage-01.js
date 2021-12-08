import { GameConfig } from "../components/game-config.js";
import { GameScene } from "../components/game-scene.js";
import { BoyPlayer } from "../entity/boy-player.js";
import { Entity } from "../entity/entity.js";
import { Player } from "../entity/player.js";
import { RedGate } from "../entity/red-gate.js";
import { Robot } from "../entity/robot.js";
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
        scene.load.tilemapTiledJSON("maps.stage-01", "./assets/maps/stage-01.json");
    }

    create() {
        // add tilemap
        this.map = this.add.tilemap("maps.stage-01");
        const tilesets = [
            this.map.addTilesetImage("tileset-01", "tilesets.tileset-01"),
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
        this.player = new GameConfig["player-type"](this, 0, 0);
        this.player.setWeapon(new AK47(this, 0, 0));

        this.player.setWeapon(new LightSaber(this, 0, 0));
        //this.player.setWeapon(new Drone(this, 0, 0));

        this.cameras.main.setBounds(-1024, -512, 1536, 2048);

        new RedGate(this, 410, -400);
        new RedGate(this, -940, -430);
        new RedGate(this, -928, 1300);
        new RedGate(this, 394, 1311);
        new RedGate(this, 195, 1060);

<<<<<<< HEAD
        // light
        this.lights.enable();
        this.newlight = this.lights.addLight().setRadius(500);
=======
        this.robot = new Robot(this, 410, -400);
>>>>>>> enemy
    }

    update() {
        super.update();

        // light
        this.newlight.setPosition(this.player.x, this.player.y);

        this.sys.displayList.each(e => e.setPipeline("Light2D"));

        if (Entity.instances.length == 1 && this.player.isAlive) {
            this.scene.start("Stage02");
            Entity.instances = [];
        }
    }
}