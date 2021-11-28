import { StatsEntity } from "../stats/stats-entity.js";
import { Player } from "./player.js";

export class BoyPlayer extends Player {
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {String} texture 
     * @param {StatsEntity} stats 
     */
    constructor(scene, x, y, stats) {
        super(scene, x, y, "sprite-sheet-main", stats);
        this.setScale(1);
    }

    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        if (scene instanceof Phaser.Scene) {
            scene.load.spritesheet("sprite-sheet-main", "./assets/images/main.png", {
                frameWidth: 100,
                frameHeight: 100
            });
        }
    }

    create_anims() {
        this.animations.idle = this.scene.anims.create({
            key: "sprite-sheet-anims-main-idle",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNames("sprite-sheet-main", {
                start: 0,
                end: 3
            })
        });

        this.animations.move = this.scene.anims.create({
            key: "sprite-sheet-anims-main-move",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNames("sprite-sheet-main", {
                start: 4,
                end: 7
            })
        });

        this.animations.die = this.scene.anims.create({
            key: "sprite-sheet-anims-main-move",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNames("sprite-sheet-main", {
                start: 8,
                end: 8
            })
        });

        return this;
    }


}