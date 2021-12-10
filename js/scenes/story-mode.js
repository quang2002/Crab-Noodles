import { GameConfig } from "../components/game-config.js";
import { GameScene } from "../components/game-scene.js";
import { Endurance } from "../entity/endurance.js";
import { Entity } from "../entity/entity.js";
import { Ghost } from "../entity/ghost.js";
import { Pirate } from "../entity/pirate.js";
import { Player } from "../entity/player.js";
import { Robot } from "../entity/robot.js";
import { Boom } from "../objects/boom.js";
import { Computer } from "../objects/computer.js";
import { HorizontalDoor } from "../objects/horizontal-door.js";
import { VerticalDoor } from "../objects/vertical-door.js";
import { AK47 } from "../weapon/ak47.js";
import { EnergyGun } from "../weapon/energy-gun.js";
import { LightSaber } from "../weapon/light-saber.js";
import { Pistol } from "../weapon/pistol.js";
import { Rocket } from "../weapon/rocket.js";
import { XuanYuanSword } from "../weapon/xuan-yuan-sword.js";

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
            new VerticalDoor(this, 4560, -2192, true),
            new VerticalDoor(this, 5296, -2192, true),
            new VerticalDoor(this, 5264, -1552, true),
            new VerticalDoor(this, 5616, -1552, true),
            new VerticalDoor(this, 5616, -1040, true),
            new VerticalDoor(this, 5264, -1040, true),
            new VerticalDoor(this, 4432, -112, true),
            new VerticalDoor(this, 5360, -112, true),
            new VerticalDoor(this, 5488, 1616, false),
            new VerticalDoor(this, 4976, 1616, true),
            new VerticalDoor(this, 4432, 1616, true),
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
            "wall": this.map.createLayer("wall", tilesets).setDepth(-1),
            "objects": this.map.createLayer("objects", tilesets).setDepth(1),
        }

        // create collision for each feature in map
        const wall = this.createCollisionOnLayer(this.layers.wall);
        const objects = this.createCollisionOnLayer(this.layers.objects);
        const ground = this.createCollisionOnLayer(this.layers.ground);

        Entity.collision = [wall, objects, ground];


        
        this.addAutoDoor();

        // computers
        new Computer(this, 22 * 32, 36 * 32, this.horizontalDoors[0]);
        new Computer(this, 53 * 32, 25 * 32, this.verticalDoors[1]);
        new Computer(this, 81 * 32, -65 * 32, this.horizontalDoors[8]);
        new Computer(this, 145 * 32, 30 * 32, this.horizontalDoors[10]);
        new Computer(this, 190 * 32, 53 * 32, this.verticalDoors[10]);

        // booms
        [
            [25, 51],
            [41, 49],
            [42, 54],
            [50, 49],
            [50, 54],
            [74, 36],
            [87, 36],
            [71, 14],
            [88, 13],
            [70, 6],
            [72, 3],
            [70, 0],
            [72, -3],
            [70, -6],
            [72, -33],
            [70, -35],
            [89, -36],
            [89, -29],
            [73, 31],
            [74, 31],
            [73, 32],
            [74, 32],
            [68, 31],
            [68, 32],
            [68, 30],
            [69, 30],
            [70, 30],
            [71, 30],
            [72, 30],
            [73, 30],
            [74, 30],
            [68, 34],
            [117, -55],
            [119, -58],
            [117, -61],
            [119, -63],
            
        ].forEach(e => new Boom(this, e[0] * 32, e[1] * 32).setDepth(-1));

        /**
         * @type {Player}
         */
        this.player = new GameConfig["player_type"](this, 0, 0);
        this.player.setWeapon(new LightSaber(this));
        //this.player.setWeapon(new Pistol(this, 0, 0));
        this.player.setPosition(146 * 32, -7 * 32);

        // enemies
        //room 1
        new Pirate(this, 44 * 32, 52 * 32);
        new Pirate(this, 44 * 32, 50 * 32);
        new Pirate(this, 44 * 32, 48 * 32);
        new Pirate(this, 42 * 32, 50 * 32);
        new Pirate(this, 39 * 32, 50 * 32);
        //room 2
        new Endurance(this, 42 * 32, 24 * 32);
        new Endurance(this, 48 * 32, 24 * 32);
        new Endurance(this, 42 * 32, 23 * 32);
        new Endurance(this, 48 * 32, 23 * 32);
        new Endurance(this, 40 * 32, 24 * 32);
        //room3
        // new Ghost(this, 69 * 32, 11 * 32);
        // new Ghost(this, 69 * 32, 10 * 32);
        // new Ghost(this, 73 * 32, 11 * 32);
        // new Ghost(this, 73 * 32, 10 * 32);
        new Endurance(this, 88 * 32, 25 * 32);
        new Endurance(this, 88 * 32, 22 * 32);
        new Endurance(this, 88 * 32, 28 * 32);
        //room4
        new Robot(this, 78 * 32, -67 * 32, {hp: 1000});
        new Endurance(this, 78 * 32, -58 * 32);
        new Endurance(this, 76 * 32, -58 * 32);
        new Endurance(this, 74 * 32, -58 * 32);
        //room5
        new Pirate(this, 119 * 32, -33 * 32, { hp: 1000, speed: 300, runningSpeed: 300 });
        new Pirate(this, 121 * 32, -33 * 32, { hp: 1000, speed: 300, runningSpeed: 300 });
        new Pirate(this, 123 * 32, -33 * 32, { hp: 1000, speed: 300, runningSpeed: 300 });
        new Pirate(this, 125 * 32, -30 * 32, { hp: 1000, speed: 300, runningSpeed: 300 });
        //room6
        for(let i=0;i<10;i++){
            new Endurance(this, (146+i) * 32, -67 * 32);
        }
        //room7
        new XuanYuanSword(this, 142 * 32, -9 * 32);
        for(let i=0;i<10;i++){
            new Pirate(this, 149 * 32, (-9+i) * 32);
        }
        //room8
        new Robot(this, 186 * 32, 43 * 32, {hp: 2000});
        new Endurance(this, 186 * 32, 30 * 32);
        new Endurance(this, 184 * 32, 30 * 32);
        new Endurance(this, 188 * 32, 30 * 32);
        new Endurance(this, 182 * 32, 30 * 32);
        //room boss
        new Pirate(this, 178 * 32, -47 * 32, { hp: 1000 });
        new Pirate(this, 181 * 32, -47 * 32, { hp: 1000 });
        new Pirate(this, 184 * 32, -47 * 32, { hp: 1000 });
        new Pirate(this, 187 * 32, -47 * 32, { hp: 1000 });
        new Ghost(this, 178 * 32, -39 * 32, { hp: 1200 });
        new Ghost(this, 183 * 32, -39 * 32, { hp: 1200 });
        new Ghost(this, 188 * 32, -39 * 32, { hp: 1200 });
        new Ghost(this, 191 * 32, -39 * 32, { hp: 1200 });
        new Endurance(this, 178 * 32, -31 * 32, { hp: 1200 });
        new Endurance(this, 181 * 32, -31 * 32, { hp: 1200 });
        new Endurance(this, 184 * 32, -31 * 32, { hp: 1200 });
        new Endurance(this, 187 * 32, -31 * 32, { hp: 1200 });
        new Robot(this, 157 * 32, -47 * 32);
        new Robot(this, 157 * 32, -50 * 32);
      

        //weapons
        new Pistol(this, 12*32, 27*32);
        new AK47(this, 56*32, 25*32);
        new XuanYuanSword(this, 73 * 32, 11 * 32);
        new XuanYuanSword(this, 186 * 32, -51 * 32);
        new LightSaber(this, 134 * 32, -35 * 32);
        new LightSaber(this, 183 * 32, 24 * 32);
        new EnergyGun(this, 78 * 32, -66 * 32);
        new EnergyGun(this, 114 * 32, -51 * 32);
        new Rocket(this, 186 * 32, 54 * 32);
        new Rocket(this, 183 * 32, -29 * 32);

    }

    update() {
        super.update();
    }
}