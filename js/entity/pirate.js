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

    movement() {
        const vecx = this.player.x - this.x;
        const vecy = this.player.y - this.y;
        const len = Math.sqrt(vecx * vecx + vecy * vecy);

        if (200 < len && len < 400)
            return { x: vecx / len * this.stats.cur.speed, y: vecy / len * this.stats.cur.speed };
        return { x: 0, y: 0 };
    }

    update() {
        super.update();

        if (this.isAlive) {
            this.weapon.setPosition(this.x, this.y);
            this.weapon.pointTo(this.player.vpos);

            const vecx = this.player.x - this.x;
            const vecy = this.player.y - this.y;
            const len = Math.sqrt(vecx * vecx + vecy * vecy);

            if (this.weapon.isFireable && len < 300) {
                this.weapon.fire();
            }
        } else {
            this.weapon.destroy(this.scene);
            this.body.destroy();
        }
    }

    static preload(scene) {
        if (scene instanceof Phaser.Scene) {
            scene.load.spritesheet("spritesheet-enemy-pirate", "./assets/images/enemy-pirate.png", { frameWidth: 40, frameHeight: 40 });
        }
    }
}