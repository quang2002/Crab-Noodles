import { Entity } from '../entity/entity.js';
import { StatsWeapon } from '../stats/stats-weapon.js';
import { Weapon } from './weapon.js';

export class Gun extends Weapon {
    static bullets = []

    // bullets killer
    static {
        setInterval(() => {
            Gun.bullets.forEach((value) => {
                if (value.timeout > 0) value.timeout -= 10;
                else value.destroy();
            });
        }, 10);
    }

    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {string} gunTexture 
     * @param {string} bulletTexture 
     * @param {StatsWeapon} stats 
     */
    constructor(scene, x, y, gunTexture, bulletTexture, stats) {
        super(scene, x, y, gunTexture, stats);

        this.bulletTexture = bulletTexture;
    }

    /**
     * fire method
     * @returns {Gun} this
     */
    fire() {
        super.fire();

        // add a new bullet
        const bullet = this.scene.physics.add.sprite(this.x, this.y, this.bulletTexture);

        // set angle, velocity for bullet
        const angle = this.angle + (this.flipX ? 180 : 0);

        const vecy = Math.sin(angle / 180 * Math.PI);
        const vecx = Math.cos(angle / 180 * Math.PI);

        bullet.setAngle(angle);
        bullet.setVelocity(vecx * this.stats.speed, vecy * this.stats.speed);
        bullet.setDepth(this.depth - 1);

        // set timeout for bullet
        bullet.timeout = 5000;

        // set collide with
        this.scene.physics.add.overlap(bullet, this.collision, (o1, o2) => {
            o1.destroy();
            if (o2 instanceof Entity) {
                o2.stats.cur.hp -= this.stats.baseDMG;
            }
        });

        // add to list of bullets
        Gun.bullets = Gun.bullets.filter((value) => value.active);
        Gun.bullets.push(bullet);
        return this;
    }
}