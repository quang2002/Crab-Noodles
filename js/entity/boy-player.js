import { GameConfig } from "../components/game-config.js";
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
        stats = Object.assign({}, GameConfig.entities["boy-player"], stats);
        super(scene, x, y, stats);
        this.setBodySize(75, 90).setOffset(16, 8);
        this.setScale(.32);

        //animation for show up
        this.create_anims_showup(scene);
    }

    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        if (scene instanceof Phaser.Scene) {
            scene.load.spritesheet("spritesheet.boy-player", "./assets/images/boy.png", {
                frameWidth: 100,
                frameHeight: 100
            });

            scene.load.spritesheet("spritesheet.boy-player-showup", "./assets/images/boy-showup-anims.png", {
                frameHeight: 85,
                frameWidth: 71
            });
        }
    }

    //animation for moving
    create_anims() {
        this.animations.idle = this.scene.anims.create({
            key: "anims-boy-idle",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNames("spritesheet.boy-player", { start: 0, end: 3 })
        });

        this.animations.move = this.scene.anims.create({
            key: "anims-boy-move",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNames("spritesheet.boy-player", { start: 4, end: 7 })
        });

        this.animations.die = this.scene.anims.create({
            key: "anims-boy-die",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNames("spritesheet.boy-player", { start: 8, end: 8 })
        });

        return this;
    }

    //create anims for show up
    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    create_anims_showup(scene) {

        this.showup = this.scene.anims.create({
            key: "anims-boy-showup",
            frameRate: 8,
            repeat: 0,
            frames: this.scene.anims.generateFrameNames("spritesheet.boy-player-showup", { start: 0, end: 7 })
        });

        this.showup_anims = scene.physics.add.sprite(this.x, this.y, "spritesheet.boy-player-showup").play("anims-boy-showup", true)
        .on("animationcomplete", () => {
            this.showup_anims.setScale(0);
        });
    }

}