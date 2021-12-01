import { StatsEntity } from "../stats/stats-entity.js";
import { AK47 } from "../weapon/ak47.js";
import { Enemy } from "./enemy.js";
import { Player } from "./player.js";

export class Pirate extends Enemy {

    /**
     * Pirate.init
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {StatsEntity} stats 
     * @param {Player} player 
     */
    constructor(scene, x, y, stats, player) {
        super(scene, x, y, stats, player);

        this.weapon = new AK47(scene, x, y, {
            baseDMG: 10,
            fireTime: 1000,
            reloadTime: 0,
            speed: 400
        });

        //owner
        this.weapon.owner = this;

        this.weapon.collision.push(this.player);
    }

    create_anims() {
        this.animations.idle = this.scene.anims.create({
            key: "anims-enemy-pirate-idle",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers("spritesheet-enemy-pirate", { start: 0, end: 3 })
        });

        this.animations.move = this.scene.anims.create({
            key: "anims-enemy-pirate-move",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers("spritesheet-enemy-pirate", { start: 4, end: 7 })
        });

        this.animations.die = this.scene.anims.create({
            key: "anims-enemy-pirate-die",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers("spritesheet-enemy-pirate", { frames: [8] })
        });
    }

    static preload(scene) {
        if (scene instanceof Phaser.Scene) {
            scene.load.spritesheet("spritesheet-enemy-pirate", "./assets/images/enemy-pirate.png", { frameWidth: 40, frameHeight: 40 });
        }
    }
}