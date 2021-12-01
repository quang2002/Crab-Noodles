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

        this.load.spritesheet("spritesheet-teleport-animation", "./assets/images/lobby/teleport-animation.png", {
            frameHeight: 39,
            frameWidth: 12
        });

        this.load.spritesheet("spritesheet-gate", "./assets/images/lobby/gate.png", {
            frameWidth: 85,
            frameHeight: 81
        });
    }

    create() {
        this.player = new BoyPlayer(this, 0, 0, { hp: 10, speed: 100, runningSpeed: 200 });

        this.player.setWeapon(new AK47(this, 0, 0, {
            fireTime: 100,
            speed: 1000,
            reloadTime: 0
        }));

        // add a new gate1 png
        // add gate animation
        this.anims.create({
            key: "anims-gate",
            frameRate: 7,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("spritesheet-gate", { start: 1, end: 6 })
        });

        // add a new teleport-animation png
        this.anims.create({
            key: "anims-teleport-animation",
            frameRate: 7,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("spritesheet-teleport-animation", { frames: [0, 1, 2, 3] })
        });

        // create a sprite in area of gate for play animation
        this.gate = this.physics.add.sprite(483, 444, "spritesheet-gate").play("anims-gate", true);

        // set collide
        this.gate.setOrigin(0.5, 0.5).setCollideWorldBounds(true).setPushable(false).setImmovable(true);

        // collider => play animation
        const gate_collider = this.physics.add.collider(this.player, this.gate, () => {
            this.teleportAnimation = this.physics.add.sprite(this.player.x, this.player.y - 30, "spritesheet-teleport-animation");
            this.teleportAnimation.play("anims-teleport-animation", true).setScale(2.5);

            // fade to black
            this.cameras.main.fadeOut(1000, 0, 0, 0).once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start("Stage01");
            });

            this.physics.world.removeCollider(gate_collider);
        });

        // add tile map lobby
        this.map = this.add.tilemap("maps.lobby");
        const tilesets = [
            this.map.addTilesetImage("tileset-01", "tilesets.tileset-01"),
        ];

        // layer of tile map for collision
        this.layers = {
            "ground": this.map.createLayer("ground", tilesets).setDepth(this.player.depth - 1),
            "wall": this.map.createLayer("wall", tilesets).setDepth(this.player.depth - 1),
            "features": this.map.createLayer("features", tilesets).setDepth(this.player.depth + 1),
            "objects": this.map.createLayer("objects", tilesets).setDepth(this.player.depth + 1),
        }


        // set bound for camera
        this.cameras.main.setBounds(-520, -130, 1050, 655);

        // new wall, features, and layer
        const wall = this.createCollisionOnLayer(this.layers.wall);
        const features = this.createCollisionOnLayer(this.layers.features);
        const ground = this.createCollisionOnLayer(this.layers.ground);

        // add collider for play and object
        this.physics.add.collider(this.player, wall);
        this.physics.add.collider(this.player, features);
        this.physics.add.collider(this.player, ground);
    }

    update() {
        super.update();
    }
}