import { GameConfig } from "../components/game-config.js";
import { StatsEntity } from "../stats/stats-entity.js";
import { EnergyGun } from "../weapon/energy-gun.js";
import { Enemy } from "./enemy.js";

export class Robot extends Enemy {

    /**
     * Pirate.init
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {StatsEntity} stats 
     */
    constructor(scene, x, y, stats) {
        stats = Object.assign({}, GameConfig.entities["robot"], stats);
        super(scene, x, y, stats);

        this.weapon = new EnergyGun(scene, x, y, {
            baseDMG: 250,
            fireTime: 400,
            speed: 500
        });

        //owner
        this.weapon.owner = this;

        this.randomVelocity = { x: 0, y: 0 };
        this.lastTime = 0;

        this.setBodySize(30,50).setOffset(50,35);
    }

    create_anims() {
        this.animations.idle = this.scene.anims.create({
            key: "anims-enemy-robot-idle",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers("spritesheet-enemy-robot", { start: 13, end: 17 })
        });

        this.animations.move = this.scene.anims.create({
            key: "anims-enemy-robot-move",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers("spritesheet-enemy-robot", { start: 20, end: 24 })
        });

        this.animations.die = this.scene.anims.create({
            key: "anims-enemy-robot-die",
            frameRate: 10,
            repeat: 0,
            frames: this.scene.anims.generateFrameNumbers("spritesheet-enemy-robot", { start: 1, end: 12 })
        });
    }

    static preload(scene) {
        if (scene instanceof Phaser.Scene) {
            scene.load.spritesheet("spritesheet-enemy-robot", "./assets/images/enemy-robot.png", { frameWidth: 128, frameHeight: 128 });
        }
    }

    movement() {
        const vecx = this.player.x - this.x;
        const vecy = this.player.y - this.y;
        const len = Math.sqrt(vecx * vecx + vecy * vecy);

        if (200 < len && len < 400)
            return { x: vecx / len * this.stats.cur.speed, y: vecy / len * this.stats.cur.speed };

        if (len > 400)
            return { x: this.randomVelocity.x * this.stats.cur.speed, y: this.randomVelocity.y * this.stats.cur.speed };

        return { x: 0, y: 0 };
    }

    update() {
        super.update();

        // weapon fire
        if (this.isAlive) {
            this.weapon.setPosition(this.x, this.y - 4);
            this.weapon.pointTo(this.player);
            this.weapon.setScale(1.2);

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

        if (this.scene.time.now - this.lastTime > 1000) {
            this.lastTime = this.scene.time.now;
            this.randomVelocity.x = Math.random() * 2 - 1;
            this.randomVelocity.y = Math.random() * 2 - 1;
        }
    }
}