import { GameConfig } from "../components/game-config.js";
import { StatsEntity } from "../stats/stats-entity.js";
import { PirateGun } from "../weapon/pirate-gun.js";
import { Enemy } from "./enemy.js";

export class Pirate extends Enemy {

    /**
     * Pirate.init
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {StatsEntity} stats 
     */
    constructor(scene, x, y, stats) {
        stats = Object.assign({}, GameConfig.entities["pirate"], stats);
        super(scene, x, y, stats);

        this.weapon = new PirateGun(scene, x, y, {
            fireTime: 1000,
            speed: 100
        });

        //owner
        this.weapon.owner = this;


        this.randomVelocity = { x: 0, y: 0 };
        this.lastTime = 0;

        this.isSeeingPlayer = false;
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
            scene.load.spritesheet("spritesheet-enemy-pirate", "./assets/images/enemy/pirate/enemy-pirate.png", { frameWidth: 40, frameHeight: 40 });
        }
    }

    movement() {
        const vecx = this.player.x - this.x;
        const vecy = this.player.y - this.y;
        const len = Math.sqrt(vecx * vecx + vecy * vecy);

        if (200 < len && len < 400)
            return { x: vecx / len * this.stats.cur.speed, y: vecy / len * this.stats.cur.speed };
        
        if (!this.isSeeingPlayer)
            return { x: 0, y: 0 };

        if (len > 400)
            return { x: this.randomVelocity.x * this.stats.cur.speed, y: this.randomVelocity.y * this.stats.cur.speed };

        return { x: 0, y: 0 };
    }

    update() {
        super.update();

        // weapon fire
        if (this.isAlive) {
            this.weapon.setPosition(this.x, this.y);
            this.weapon.pointTo(this.player);

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