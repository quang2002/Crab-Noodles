import { GameConfig } from '../components/game-config.js';
import { StatsWeapon } from '../stats/stats-weapon.js';
import { Gun } from './gun.js';
import { Enemy } from '../entity/enemy.js';
import { Player } from '../entity/player.js';
import { Entity } from "../entity/entity.js";
import { RedGate } from '../entity/red-gate.js';

export class Rocket extends Gun {
    /**
     * rocket.init
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {StatsWeapon} stats 
     */
    constructor(scene, x, y, stats) {
        stats = Object.assign({}, GameConfig.weapons["rocket"], stats);
        super(scene, x, y, "images.rocket", "images.bullet-rocket", stats);

        this.scene.anims.create({
            key: "anims.bullet-rocket",
            frameRate: 10,
            repeat: 0,
            frames: this.scene.anims.generateFrameNames("spritesheet.bullet-animation", {
                start: 0,
                end: 7
            })
        })

        this.audio_explosion = this.scene.sound.add("audio.explosion");
    }

    fire() {
        this.cooldown.fire = this.stats.fireTime;

        // add a new bullet
        const bullet = this.scene.physics.add.sprite(this.x, this.y, "images.bullet-rocket").setScale(1.5);

        // set angle, velocity for bullet
        const angle = this.angle + (this.flipX ? 180 : 0);

        const vecy = Math.sin(angle / 180 * Math.PI);
        const vecx = Math.cos(angle / 180 * Math.PI);

        bullet.setCircle(6, 2, 2);
        bullet.setAngle(angle);
        bullet.setVelocity(vecx * this.stats.speed, vecy * this.stats.speed);
        bullet.setDepth(this.depth - 1);

        // set timeout for bullet
        bullet.timeout = 5000;

        // set collide with
        this.scene.physics.add.overlap(bullet, this.collision, (o1, o2) => {
            if ((this.owner instanceof Player && o2 instanceof Enemy) || (this.owner instanceof Enemy && o2 instanceof Player)) {
<<<<<<< HEAD

                //audio for explosion
                this.audio_explosion.play();

                //anmation when explosion
                const bulletAnims = this.scene.physics.add.sprite(o1.x, o1.y, "spritesheet.bullet-animation").setScale(2).play("anims.bullet-rocket", true).on(
=======
                const bulletAnims = this.scene?.physics?.add.sprite(o1.x, o1.y, "spritesheet.bullet-animation").setScale(2).play("anims.bullet-rocket", true).on(
>>>>>>> bb76e9404cd656b4d8cc227409d4ce5214a8a348
                    "animationcomplete", () => {
                        bulletAnims.destroy();
                    }
                );
                Entity.instances
                    .filter(value => value.isAlive && (value instanceof Enemy))
                    .forEach((value) => {
                        const range = 48;
                        const vecx = o1.x - value.x;
                        const vecy = o1.y - value.y;
                        if (vecx * vecx + vecy * vecy < range * range) {
                            value.take_damage(this.stats.damage);

                            if (!(value instanceof RedGate)) {
                                value.setVelocity(- 1000 * vecx / (1 + vecx * vecx), - 1000 * vecy / (1 + vecy * vecy)).stunTime = 400;
                            }
                        }
                    });
                o1.destroy();
            }

            if (!(o2 instanceof Entity)) {
<<<<<<< HEAD
                //audio for explosion
                this.audio_explosion.play();
                const bulletAnims = this.scene.physics.add.sprite(o1.x, o1.y, "spritesheet.bullet-animation").setScale(2).play("anims.bullet-rocket", true).on(
=======
                const bulletAnims = this.scene?.physics?.add.sprite(o1.x, o1.y, "spritesheet.bullet-animation").setScale(2).play("anims.bullet-rocket", true).on(
>>>>>>> bb76e9404cd656b4d8cc227409d4ce5214a8a348
                    "animationcomplete", () => {
                        bulletAnims.destroy();
                    }
                );
                o1.destroy();
            }

        });

        // add to list of bullets
        Gun.bullets = Gun.bullets.filter((value) => value.active);
        Gun.bullets.push(bullet);
        return this;
    }

    /**
     * load game resources
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        if (scene instanceof Phaser.Scene) {
            scene.load.image("images.rocket", "./assets/images/weapon/guns/rocket/rocket.png");
            scene.load.image("images.bullet-rocket", "./assets/images/weapon/guns/rocket/rocket-bullet.png");
            scene.load.spritesheet("spritesheet.bullet-animation", "./assets/images/weapon/guns/rocket/rocket-bullet-anims.png", {
                frameHeight: 32,
                frameWidth: 32
            });
            scene.load.audio("audio.explosion", "./assets/sounds/weapons/rocket/explosion.wav");
        }
    }
}