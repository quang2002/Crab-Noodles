import { GameConfig } from "../components/game-config.js";
import { StatsEntity } from "../stats/stats-entity.js";
import { Enemy } from "./enemy.js";

export class Ghost extends Enemy {

    /**
     * Pirate.init
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {StatsEntity} stats 
     */
    constructor(scene, x, y, stats) {
        stats = Object.assign({}, GameConfig.entities["ghost"], stats);
        super(scene, x, y, stats);

        this.weapon = null;
        this.randomVelocity = { x: 0, y: 0 };
        this.lastTime = 0;
    }

    create_anims() {
        this.animations.idle = this.scene.anims.create({
            key: "anims-enemy-ghost-idle",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers("spritesheet-enemy-ghost", { start: 0, end: 7 })
        });

        this.animations.move = this.scene.anims.create({
            key: "anims-enemy-ghost-move",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers("spritesheet-enemy-ghost-attack", { start: 0, end: 7 })
        });

        this.animations.die = this.scene.anims.create({
            key: "anims-enemy-ghost-die",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers("spritesheet.enemy-ghost-die", { frames: [0] })
        });

        // console.log(this.animations.idle);
    } 

    static preload(scene) {
        if (scene instanceof Phaser.Scene) {
            scene.load.spritesheet("spritesheet-enemy-ghost", "./assets/images/enemy/ghost/ghost-idle.png", { frameWidth: 29, frameHeight: 26 });
            scene.load.spritesheet("spritesheet-enemy-ghost-attack", "./assets/images/enemy/ghost/ghost-attack.png", { frameWidth: 36, frameHeight: 43 });
            scene.load.spritesheet("spritesheet.enemy-ghost-die", "./assets/images/enemy/ghost/ghost-die.png", { frameWidth: 32, frameHeight: 32 });
        }
    }

    movement() {
        const vecx = this.player.x - this.x;
        const vecy = this.player.y - this.y;
        const len = Math.sqrt(vecx * vecx + vecy * vecy);

        if (len < 200)
            return { x: vecx / len * this.stats.cur.runningSpeed, y: vecy / len * this.stats.cur.runningSpeed };

        if (400 > len > 200)
            return { x: this.randomVelocity.x * this.stats.cur.speed, y: this.randomVelocity.y * this.stats.cur.speed };
        

        return { x: 0, y: 0 };
    }

    update() {
        super.update();
        
        // weapon fire
        if (this.isAlive) {
            // this.weapon.setPosition(this.x, this.y);
            // this.weapon.pointTo(this.player);
            

            const vecx = this.player.x - this.x;
            const vecy = this.player.y - this.y;
            const len = Math.sqrt(vecx * vecx + vecy * vecy);

            // if (this.weapon.isFireable && len < 300) {
            //     this.weapon.fire();
            // }
        } else {
            // this.weapon.destroy(this.scene);
            this.body.destroy();
        }

        if (this.scene.time.now - this.lastTime > 1000) {
            this.lastTime = this.scene.time.now;
            this.randomVelocity.x = Math.random() * 2 - 1;
            this.randomVelocity.y = Math.random() * 2 - 1;
        }
    }
}