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
        ;
    }

    /**
     * fire method
     * @returns {Melee} this
     */
    fire(pointer) {

        //set angle for weapons
        this.setAngle(this.angle + Math.PI / 180 * this.stats.speed);

        //fire 
        this.cooldown.fire = this.stats.fireRate;

        return this;
    }

    /**
     * if not fire
     * @param {Phaser.Input.Pointer} pointer 
     * @returns 
     */
    notFire(pointer) {
        //view position for pointer in camera view
        this.setAngle(Math.atan2(pointer.y - this.vpos.y, pointer.x - this.vpos.x) / Math.PI * 180);
        return this;
    }
}