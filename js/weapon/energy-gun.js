import { GameConfig } from '../components/game-config.js';
import { StatsWeapon } from '../stats/stats-weapon.js';
import { Gun } from './gun.js';
import { Enemy } from '../entity/enemy.js';
import { Player } from '../entity/player.js';
import { Entity } from "../entity/entity.js";
import { RedGate } from '../entity/red-gate.js';

export class EnergyGun extends Gun {
    /**
     * Pistol.init
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {StatsWeapon} stats 
     */
    constructor(scene, x, y, stats) {
        stats = Object.assign({}, GameConfig.weapons.energy_gun, stats);
        super(scene, x, y, "images.energy-gun", "images.energy-bullet", stats);

        this.scene.anims.create({
            key: "anims.energy-bullet",
            frameRate: 10,
            repeat: 0,
            frames: this.scene.anims.generateFrameNames("spritesheet.energy-bullet-animation", {
                start: 0,
                end: 4
            })
        })
    }

    fire() {
        this.cooldown.fire = this.stats.fireTime;

        // add a new bullet
        const bullet = this.scene.physics.add.sprite(this.x, this.y, "images.energy-bullet").setScale(2);

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
                const energyBulletAnims = this.scene.physics.add.sprite(o1.x, o1.y, "spritesheet.energy-bullet-animation").play("anims.energy-bullet", true).on(
                    "animationcomplete", () => {
                        energyBulletAnims.destroy();
                    }
                );
                if (o2 instanceof Entity && o2.isAlive) {
                    o2.take_damage(this.stats.damage);
                }
                o1.destroy();
            }

            if (!(o2 instanceof Entity)) {
                const energyBulletAnims = this.scene.physics.add.sprite(o1.x, o1.y, "spritesheet.energy-bullet-animation").play("anims.energy-bullet", true).on(
                    "animationcomplete", () => {
                        energyBulletAnims.destroy();
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
            scene.load.image("images.energy-gun", "./assets/images/weapon/guns/energy-gun/energy-gun.png");
            scene.load.image("images.energy-bullet", "./assets/images/weapon/guns/energy-gun/energy-bullet.png");
            scene.load.spritesheet("spritesheet.energy-bullet-animation", "./assets/images/weapon/guns/energy-gun/bullet-collision.png", {
                frameHeight: 32,
                frameWidth: 32
            });
        }
    }
}