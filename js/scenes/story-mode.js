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

    addAutoDoor() {
        this.verticalDoors = [
            new VerticalDoor(this, 1200, 1616, true),
            new VerticalDoor(this, 1872, 1616, false),
            new VerticalDoor(this, 4560, -2188, true),
            new VerticalDoor(this, 5296, -2188, true),
            new VerticalDoor(this, 5264, -1548, true),
            new VerticalDoor(this, 5616, -1548, true),
            new VerticalDoor(this, 5616, -1036, true),
            new VerticalDoor(this, 5264, -1036, true),
            new VerticalDoor(this, 4432, -108, true),
            new VerticalDoor(this, 5360, -108, true),
            new VerticalDoor(this, 5488, 1620, false),
            new VerticalDoor(this, 4976, 1620, true),
            new VerticalDoor(this, 4432, 1620, true),
        ]

        this.horizontalDoors = [
            new HorizontalDoor(this, 480, 1280, false),
            new HorizontalDoor(this, 44 * 32, 30 * 32, true),
            new HorizontalDoor(this, 44 * 32, 1440, true),
            new HorizontalDoor(this, 2624, 1280, true),
            new HorizontalDoor(this, 2272, 256, true),
            new HorizontalDoor(this, 2272, -256, true),
            new HorizontalDoor(this, 2272, -832, true),
            new HorizontalDoor(this, 2272, -1344, true),
            new HorizontalDoor(this, 2848, -1344, false),
            new HorizontalDoor(this, 2848, -224, true),
            new HorizontalDoor(this, 3808, -224, false),
            new HorizontalDoor(this, 3808, -864, true),
            new HorizontalDoor(this, 4192, -1184, true),
            new HorizontalDoor(this, 4192, -1376, true),
            new HorizontalDoor(this, 3776, -1696, true),
            new HorizontalDoor(this, 3776, -2080, true),
            new HorizontalDoor(this, 5760, -2080, true),
            new HorizontalDoor(this, 6080, -2080, true),
            new HorizontalDoor(this, 5760, -1728, true),
            new HorizontalDoor(this, 6080, -1728, true),
            new HorizontalDoor(this, 5984, 672, true),
            new HorizontalDoor(this, 3808, 1408, true),
            new HorizontalDoor(this, 3808, 992, true),
            new HorizontalDoor(this, 4768, 796, true),
        ]
    }

    create() {
        // add tilemap
        this.map = this.add.tilemap("maps.story-mode");

        const tilesets = [
            this.map.addTilesetImage("tileset_JS", "tilesets.tileset_JS"),
        ];

        this.layers = {
            "ground": this.map.createLayer("ground", tilesets).setDepth(-1),
            "upper-ground": this.map.createLayer("upper-ground", tilesets).setDepth(-1),
            "wall": this.map.createLayer("wall", tilesets).setDepth(1),
            "objects": this.map.createLayer("objects", tilesets).setDepth(1),
        }

        // create collision for each feature in map
        const wall = this.createCollisionOnLayer(this.layers.wall);
        const objects = this.createCollisionOnLayer(this.layers.objects);

        Entity.collision = [wall, objects];

        /**
         * @type {Player}
         */
        this.player = new GameConfig["player_type"](this, 0, 0);
        this.player.setWeapon(new Rocket(this));
        this.player.setWeapon(new LightSaber(this, 0, 0));
        this.player.setPosition(18 * 32, 36 * 32);

        this.addAutoDoor();

        // computers
        new Computer(this, 22 * 32, 36 * 32, this.horizontalDoors[0]);
        new Computer(this, 53 * 32, 25 * 32, this.verticalDoors[1]);
        new Computer(this, 81 * 32, -65 * 32, this.horizontalDoors[8]);
        new Computer(this, 145 * 32, 30 * 32, this.horizontalDoors[10]);
        new Computer(this, 190 * 32, 53 * 32, this.verticalDoors[11]);

        // booms
        [
            [25, 51],
            [41, 49],
            [41, 54],
            [50, 49],
            [50, 54],
            [74, 36],
            [71, 14],
            [88, 13],
            [70, 6],
            [72, 3],
            [70, 0],
            [72, -3],
            [70, -6],
        ].forEach(e => new Boom(this, e[0] * 32, e[1] * 32));

    }

    update() {
        super.update();
    }
}