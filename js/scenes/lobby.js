import { BoyPlayer } from "../entity/boy-player.js";
import { GameScene } from "../components/game-scene.js";

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

        // //add a new island png
        // this.anims.create({
        //     key: "anims-island",
        //     frameRate: 10,
        //     repeat: -1,
        //     frames: this.anims.generateFrameNumbers("spritesheet-island", { frames: [0, 1, 2, 3] })
        // });

        // this.add.sprite(5, 400, "spritesheet-island").setVisible(true).setScale(2);

        //add a new gate1 png
        this.anims.create({
            key: "anims-gate1",
            frameRate: 10,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("spritesheet-gate1", { frames: [0, 1, 2, 3] })
        });

        this.gate1 = this.add.sprite(100, 100, "spritesheet-gate1").setFlipY(true).setVisible(true);
        
        
        this.physics.add.collider(this.player, this.gate1);
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

        //console.log(this.layers.ground.width + ", " + this.layers.ground.height);
    }
}