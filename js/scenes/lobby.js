import { BoyPlayer } from "../entity/boy-player.js";
import { GameScene } from "../components/game-scene.js";
import { AK47 } from "../weapon/ak47.js";

export class LobbyScene extends GameScene {
    constructor() {
        super("LobbyScene");
    }

    preload() {
        this.load.image("tilesets.tileset-01", "./assets/tilesets/tileset-01.png");
        this.load.tilemapTiledJSON("maps.lobby", "./assets/maps/lobby.json");
        this.load.spritesheet("spritesheet-island", "./assets/images/lobby/island.png", {
            frameHeight: 32,
            frameWidth: 12
        });

        this.load.spritesheet("spritesheet-gate1", "./assets/images/lobby/gate1.png", {
            frameHeight: 166,
            frameWidth: 115
        });
    }

    create() {
        this.player = new BoyPlayer(this, 0, 0, { hp: 10, speed: 100, runningSpeed: 200 });

        //add a new gate1 png
        this.anims.create({
            key: "anims-gate1",
            frameRate: 7,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("spritesheet-gate1", { frames: [0, 1, 2, 3] })
        });

        //create a sprite in area of gate1
        this.gate1 = this.physics.add.sprite(483, 444, null);
        this.gate1.setCollideWorldBounds(true).setPushable(false).setImmovable(true).setVisible(false);

        //collider => play animation
        this.physics.add.collider(this.player, this.gate1, () => {
            this.gate1 = this.physics.add.sprite(this.player.x, this.player.y - 30, "spritesheet-gate1").setVisible(true);
            this.gate1.play("anims-gate1", true).setScale(0.75);
            this.time.addEvent({
                delay: 2000,                // ms
                callback: () => this.scene.start("Stage01"),
                //args: [],
                repeat: 0
            });
            
        });

        //this.physics.add.collider()

        //this.gate1.play()

        //add tile map lobby
        this.map = this.add.tilemap("maps.lobby");
        const tilesets = [
            this.map.addTilesetImage("tileset-01", "tilesets.tileset-01"),
        ];

        //layer of tile map for collision
        this.layers = {
            "ground": this.map.createLayer("ground", tilesets).setDepth(this.player.depth - 1),
            "wall": this.map.createLayer("wall", tilesets).setDepth(this.player.depth - 1),
            "features": this.map.createLayer("features", tilesets).setDepth(this.player.depth + 1),
            "objects": this.map.createLayer("objects", tilesets).setDepth(this.player.depth + 1),
        }


        //set bound for camera
        this.cameras.main.setBounds(-520, -130, 1050, 655);

        //new wall, features, and layer
        const wall = this.createCollisionOnLayer(this.layers.wall);
        const features = this.createCollisionOnLayer(this.layers.features);
        const ground = this.createCollisionOnLayer(this.layers.ground);

        //add collider for play and object
        this.physics.add.collider(this.player, wall);
        this.physics.add.collider(this.player, features);
        this.physics.add.collider(this.player, ground);
    }

    update() {
        this.player.update();
        console.log(this.player.x, this.player.y);
        //console.log(this.layers.ground.width + ", " + this.layers.ground.height);
    }
}