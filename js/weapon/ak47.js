import { StatsWeapon } from '../stats/stats-weapon.js';
import { Gun } from './gun.js';

export class AK47 extends Gun {
    /**
     * AK47.init
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {StatsWeapon} stats 
     */
    constructor(scene, x, y, stats) {
        super(scene, x, y, "image-ak47", "image-bullet-01", stats);
        this.setScale(5);
    }

    /**
     * load game resources
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        if (scene instanceof Phaser.Scene) {
            scene.load.image("image-ak47", "./assets/images/ak-47.png");
            scene.load.image("image-bullet-01", "./assets/images/bullet-01.png");
        }
    }
}