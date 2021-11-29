import { StatsWeapon } from '../stats/stats-weapon.js';
import { Weapon } from './weapon.js';

export class Melee extends Weapon {
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {string} texture 
     * @param {StatsWeapon} stats 
     */
    constructor(scene, x, y, texture, stats) {
        super(scene, x, y, texture, stats);

        // set angle for weapon
        this.isAttacking == false;

        // fire system
        this.scene.time.addEvent({
            loop: true,
            delay: 10,
            callback: () => {
                const pointer = this.scene.input.activePointer;

                if (this.scene.input.activePointer.isDown)
                    this.fire(pointer);
                else this.notFire(pointer);
            }
        });
    }

    /**
     * fire method
     * @returns {Melee} this
     */
    fire(pointer) {
        if (this.isAttacking) return this;

        const vpos = this.vpos;

        const vec = {
            x: pointer.x - vpos.x,
            y: pointer.y - vpos.y,
        }
        const len = Math.sqrt(vec.x * vec.x + vec.y * vec.y);

        this.setAngle(this.angle + Math.PI / 180 * this.stats.speed);

        this.cooldown.fire = this.stats.fireRate;

        return this;
    }

    notFire(pointer) {
        this.setAngle(Math.atan2(pointer.y - this.vpos.y, pointer.x - this.vpos.x) / Math.PI * 180);
        return this;
    }

    get vpos() {
        return {
            x: (this.x - this.scene.cameras.main.worldView.x) * this.scene.cameras.main.zoom,
            y: (this.y - this.scene.cameras.main.worldView.y) * this.scene.cameras.main.zoom
        }
    }
}