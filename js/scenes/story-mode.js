import { GameConfig } from "../components/game-config.js";
import { GameScene } from "../components/game-scene.js";
import { Entity } from "../entity/entity.js";
import { Player } from "../entity/player.js";
import { Boom } from "../objects/boom.js";
import { Computer } from "../objects/computer.js";
import { HorizontalDoor } from "../objects/horizontal-door.js";
import { VerticalDoor } from "../objects/vertical-door.js";
import { LightSaber } from "../weapon/light-saber.js";
import { Rocket } from "../weapon/rocket.js";

export class StoryMode extends GameScene {
    constructor() {
        super("StoryMode");
    }

    /**
     * preload
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        scene.load.image("tilesets.tileset_JS", "./assets/tilesets/tileset_JS.png");
        scene.load.tilemapTiledJSON("maps.story-mode", "./assets/maps/story-mode.json");
    }

    create() {
        // add tilemap
        this.map = this.add.tilemap("maps.story-mode");

        const tilesets = [
            this.map.addTilesetImage("tileset_JS", "tilesets.tileset_JS"),
        ];

        this.layers = {
            "ground": this.map.createLayer("ground", tilesets).setDepth(-1),
            "wall": this.map.createLayer("wall", tilesets).setDepth(1),
        }

        // create collision for each feature in map
        const wall = this.createCollisionOnLayer(this.layers.wall);

        Entity.collision = [wall];

        /**
         * @type {Player}
         */
        this.player = new GameConfig["player_type"](this, 0, 0);
        this.player.setWeapon(new Rocket(this));
        this.player.setWeapon(new LightSaber(this, 0, 0));
        this.player.setPosition(4768, 832);

        new Boom(this, 480, 600);
        new Computer(this, 480, 1000).correct(() => {
            console.log("Hello");
        }).incorrect(() => {
            console.log("bye");
        });

        new VerticalDoor(this, 1200, 1616, true);
        new VerticalDoor(this, 1872, 1616, true);
        new VerticalDoor(this, 4560, -2188, true);
        new VerticalDoor(this, 5296, -2188, true);
        new VerticalDoor(this, 5264, -1548, true);
        new VerticalDoor(this, 5616, -1548, true);
        new VerticalDoor(this, 5616, -1036, true);
        new VerticalDoor(this, 5264, -1036, true);
        new VerticalDoor(this, 4432, -108, true);
        new VerticalDoor(this, 5360, -108, true);
        new VerticalDoor(this, 5488, 1620, true);
        new VerticalDoor(this, 4976, 1620, true);
        new VerticalDoor(this, 4432, 1620, true);
        new HorizontalDoor(this, 480, 1280, true);
        new HorizontalDoor(this, 44 * 32, 30 * 32, true);
        new HorizontalDoor(this, 44 * 32, 1440, true);
        new HorizontalDoor(this, 2624, 1280, true);
        new HorizontalDoor(this, 2272, 256, true);
        new HorizontalDoor(this, 2272, -256, true);
        new HorizontalDoor(this, 2272, -832, true);
        new HorizontalDoor(this, 2272, -1344, true);
        new HorizontalDoor(this, 2848, -1344, true);
        new HorizontalDoor(this, 2848, -224, true);
        new HorizontalDoor(this, 3808, -224, true);
        new HorizontalDoor(this, 3808, -864, true);
        new HorizontalDoor(this, 4192, -1184, true);
        new HorizontalDoor(this, 4192, -1376, true);
        new HorizontalDoor(this, 3776, -1696, true);
        new HorizontalDoor(this, 3776, -2080, true);
        new HorizontalDoor(this, 5760, -2080, true);
        new HorizontalDoor(this, 6080, -2080, true);
        new HorizontalDoor(this, 5760, -1728, true);
        new HorizontalDoor(this, 6080, -1728, true);
        new HorizontalDoor(this, 5984, 672, true);
        new HorizontalDoor(this, 3808, 1408, true);
        new HorizontalDoor(this, 3808, 992, true);
        new HorizontalDoor(this, 4768, 796, true);
        
        

    }

    update() {
        super.update();

        // this.door.setPosition(this.player.x, this.player.y);
        // console.log(this.player.x, this.player.y);
    }
}