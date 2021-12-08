import { GameConfig } from "../components/game-config.js";
import { StatsEntity } from "../stats/stats-entity.js";
import { Player } from "./player.js";

export class GirlPlayer extends Player {
    /**
     * girlPlayer.init
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {StatsEntity} stats 
     */
    constructor(scene, x, y, stats) {
        stats = Object.assign({}, GameConfig.entities["girl-player"], stats);
        super(scene, x, y, stats);
        this.setBodySize(75, 90).setOffset(16, 8);
        this.setScale(.32);

        //animation for show up
        this.create_anims_showup(scene);

        this.hurtsound = this.scene.sound.add("sounds.girlhurt");
        this.deathsound = this.scene.sound.add("sounds.girldeath");
    }

    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        if (scene instanceof Phaser.Scene) {
            scene.load.spritesheet("spritesheet.girl-player", "./assets/images/girl-player.png", {
                frameWidth: 120,
                frameHeight: 120
            });

            scene.load.spritesheet("spritesheet.girl-player-showup", "./assets/images/boy-showup-anims.png", {
                frameHeight: 85,
                frameWidth: 71
            });
        }
    }

    //animation for moving
    create_anims() {
        this.animations.idle = this.scene.anims.create({
            key: "anims-girl-idle",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNames("spritesheet.girl-player", { start: 4, end: 7 })
        });

        this.animations.move = this.scene.anims.create({
            key: "anims-girl-move",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNames("spritesheet.girl-player", { start: 0, end: 3 })
        });

        this.animations.die = this.scene.anims.create({
            key: "anims-girl-die",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNames("spritesheet.girl-player", { start: 8, end: 8 })
        });

        return this;
    }

    //create anims for show up
    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    create_anims_showup(scene) {
        this.scene.anims.create({
            key: "anims.girl-showup",
            frameRate: 8,
            repeat: 0,
            frames: this.scene.anims.generateFrameNames("spritesheet.girl-player-showup", { start: 0, end: 7 })
        });

        /**
         * @type {Phaser.Physics.Arcade.Sprite}
         */
        this.effect = scene.physics.add.sprite(this.x, this.y, "spritesheet.girl-player-showup").play("anims.girl-showup", true)
            .on("animationcomplete", () => {
                this.effect.destroy();
            });
    }

}