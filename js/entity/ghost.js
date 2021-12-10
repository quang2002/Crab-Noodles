import { GameConfig } from "../components/game-config.js";
import { StatsEntity } from "../stats/stats-entity.js";
import { StatsWeapon } from "../stats/stats-weapon.js";
import { Weapon } from "../weapon/weapon.js";
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

        this.weapon = new Weapon(scene, x, y, "", GameConfig.weapons.punch).setVisible(false);
        this.weapon.owner = this;

        this.randomVelocity = { x: 0, y: 0 };
        this.lastTime = 0;

        // add event for cooldown system
        this.COOLDOWNTELEPORT = 5000;
        this.nextTeleportTime = this.scene.time.now;
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

        this.animations.born = this.scene.anims.create({
            key: "anims-enemy-ghost-born",
            frameRate: 10,
            repeat: 0,
            frames: this.scene.anims.generateFrameNumbers("spritesheet.enemy-ghost-born", { start: 0, end: 11 }),
            hideOnComplete: true
        });

        this.animations.disappear = this.scene.anims.create({
            key: "anims-enemy-ghost-disappear",
            frameRate: 10,
            repeat: 0,
            frames: this.scene.anims.generateFrameNumbers("spritesheet.enemy-ghost-disappear", { start: 7, end: 16 }),
            hideOnComplete: true
        });

        // console.log(this.animations.idle);
    }

    static preload(scene) {
        if (scene instanceof Phaser.Scene) {
            scene.load.spritesheet("spritesheet-enemy-ghost", "./assets/images/enemy/ghost/ghost-idle.png", { frameWidth: 29, frameHeight: 26 });
            scene.load.spritesheet("spritesheet-enemy-ghost-attack", "./assets/images/enemy/ghost/ghost-attack.png", { frameWidth: 36, frameHeight: 43 });
            scene.load.spritesheet("spritesheet.enemy-ghost-die", "./assets/images/enemy/ghost/ghost-die.png", { frameWidth: 32, frameHeight: 32 });
            scene.load.spritesheet("spritesheet.enemy-ghost-born", "./assets/images/enemy/ghost/ghost-born.png", { frameWidth: 31, frameHeight: 65 });
            scene.load.spritesheet("spritesheet.enemy-ghost-disappear", "./assets/images/enemy/ghost/ghost-disappear.png", { frameWidth: 31, frameHeight: 64 });
        }
    }

    movement() {
        const vecx = this.player.x - this.x;
        const vecy = this.player.y - this.y;
        const len = Math.sqrt(vecx * vecx + vecy * vecy);

        if (len < 200)
            return { x: vecx / len * this.stats.cur.runningSpeed, y: vecy / len * this.stats.cur.runningSpeed };

        if (500 > len && len > 200)
            return { x: this.randomVelocity.x * this.stats.cur.speed, y: this.randomVelocity.y * this.stats.cur.speed };

        if (len > 500) {
            return { x: this.randomVelocity.x * this.stats.cur.speed, y: this.randomVelocity.y * this.stats.cur.speed };
        }

        return { x: 0, y: 0 };
    }


    update() {

        // weapon fire
        if (this.isAlive) {
            // this.weapon.setPosition(this.x, this.y);
            // this.weapon.pointTo(this.player);

            let vec = this.movement();
            // flip sprite
            if (vec.x > 0) {
                this.setFlipX(false);
            } else if (vec.x < 0) {
                this.setFlipX(true);
            }

            // flip sprite
            if (vec.y > 0) {
                this.setFlipY(false);
            } else if (vec.y < 0) {
                this.setFlipY(true);
            }
            const vecx = this.player.vpos.x - this.vpos.x;
            const vecy = this.player.vpos.y - this.vpos.y;
            const len = Math.sqrt(vecx * vecx + vecy * vecy);
            // console.log(len);
            
            if (this.nextTeleportTime <= this.scene.time.now && len < 500) {
                // this.stunTime = 50000;
                this.play(this.animations.disappear, true).on("animationcomplete", () => {
                    // this.setVisible(false);
                    this.scene.time.addEvent({
                        delay: 500,
                        callback: () => {
                            // console.log("2");
                            this.setPosition(this.player.x, this.player.y).play(this.animations.born, true).setVisible(true)
                                .on("animationcomplete", () => {

                                    const vecx = this.player.x - this.x;
                                    const vecy = this.player.y - this.y;
                                    const len = Math.sqrt(vecx * vecx + vecy * vecy);

                                    if (len < 50 && this.weapon.isFireable && this.player.isAlive) {
                                        this.player.take_damage(this.weapon.stats.damage);
                                        this.weapon.fire();
                                    }

                                    this.play(this.animations.move, true).setVisible(true).on("animationcomplete", () => {
                                    });
                                });
                        }
                    })
                });
                this.nextTeleportTime = this.scene.time.now + this.COOLDOWNTELEPORT;
            } else if(this.nextTeleportTime <= this.scene.time.now && len > 500) {
                this.play(this.animations.idle);
            }
        } else {
            // this.weapon.destroy(this.scene);
            if (!this.isDieAnimationPlayed) {
                this.play(this.animations.die, true);
                this.isDieAnimationPlayed = true;
            }
            this.setVelocity(0);
            this.body.destroy();
        }

        if (this.scene.time.now - this.lastTime > 500) {
            this.lastTime = this.scene.time.now;
            this.randomVelocity.x = Math.random() * 2 - 1;
            this.randomVelocity.y = Math.random() * 2 - 1;
        }
    }

}