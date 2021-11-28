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
        this.scene.input.on(Phaser.Input.Events.POINTER_MOVE, (pointer) => this.setAngle(Math.atan2(pointer.y - this.vpos.y, pointer.x - this.vpos.x) / Math.PI * 180));

        // fire system
        this.scene.time.addEvent({
            loop: true,
            delay: 10,
            callback: () => {
                if (this.isFireable && this.scene.input.activePointer.isDown) {
                    this.fire();
                }
            }
        });
    }

    /**
     * fire method
     * @returns {Melee} this
     */
    fire() {
        const pointer = this.scene.input.activePointer;
        const vpos = this.vpos;

        const vec = {
            x: pointer.x - vpos.x,
            y: pointer.y - vpos.y,
        }
        const len = Math.sqrt(vec.x * vec.x + vec.y * vec.y);

        // test
        this.scene.tweens.createTimeline({
            tweens: [
                {
                    targets: this,
                    x: this.x + vec.x / len * this.stats.speed,
                    y: this.y + vec.y / len * this.stats.speed,
                    ease: "linear"
                },
                {
                    targets: this,
                    x: this.x,
                    y: this.y,
                    ease: "linear"
                },
            ]
        }).play();

        // set collide with
        this.scene.physics.add.collider(this, this.collision, (o1, o2) => {
            o2.destroy();
        });

        this.cooldown.fire = this.stats.fireRate;
        // this.cooldown.reload = this.stats.reloadTime;

        return this;
    }

    get vpos() {
        return {
            x: (this.x - this.scene.cameras.main.worldView.x) * this.scene.cameras.main.zoom,
            y: (this.y - this.scene.cameras.main.worldView.y) * this.scene.cameras.main.zoom
        }
    }
}