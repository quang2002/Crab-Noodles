import { StatsWeapon } from '../stats/stats-weapon.js';

export class Weapon extends Phaser.GameObjects.Sprite {

    /**
     * Weapon.init
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {string} texture 
     * @param {StatsWeapon} stats 
     */
    constructor(scene, x, y, texture, stats) {
        super(scene, x, y, texture);

        // add this sprite to scene
        this.scene.add.existing(this);

        // add physics to this game object
        this.scene.physics.add.existing(this);

        // create stats of a weapon
        this.stats = new StatsWeapon(stats);

        // cooldown
        this.cooldown = {
            reload: 0,
            fire: 0
        };

        // add event for cooldown system
        this.scene.time.addEvent({
            loop: true,
            delay: 10,
            callback: () => {
                if (this.cooldown.fire > 0) this.cooldown.fire -= 10;
                if (this.cooldown.reload > 0) this.cooldown.reload -= 10;
            }
        });


        // collision group
        this.collision = [];
    }

    get isFireable() {
        return this.cooldown.reload <= 0 && this.cooldown.fire <= 0;
    }
}