import { StatsEntity } from "../stats/stats-entity.js";
import { Player } from "./player.js";

export class BoyPlayer extends Player {
    /**
     * BoyPlayer.init
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {StatsEntity} stats 
     */
    constructor(scene, x, y, stats) {
        super(scene, x, y, stats);
        this.setBodySize(75, 90).setOffset(16, 8);
        this.setScale(.32);
    }

    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        if (scene instanceof Phaser.Scene) {
            scene.load.spritesheet("spritesheet-boy", "./assets/images/boy.png", {
                frameWidth: 100,
                frameHeight: 100
            });
        }
    }

    create_anims() {
        this.animations.idle = this.scene.anims.create({
            key: "anims-boy-idle",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNames("spritesheet-boy", { start: 0, end: 3 })
        });

        this.animations.move = this.scene.anims.create({
            key: "anims-boy-move",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNames("spritesheet-boy", { start: 4, end: 7 })
        });

        this.animations.die = this.scene.anims.create({
            key: "anims-boy-die",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNames("spritesheet-boy", { start: 8, end: 8 })
        });

        return this;
    }
}