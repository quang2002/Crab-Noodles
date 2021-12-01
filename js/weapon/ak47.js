import { GameConfig } from '../components/game-config.js';
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
        stats = Object.assign({}, GameConfig.weapons["ak-47"], stats);
        super(scene, x, y, "images.ak47", "images.bullet-01", stats);
    }

    /**
     * load game resources
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        if (scene instanceof Phaser.Scene) {
            scene.load.image("images.ak47", "./assets/images/weapon/guns/ak47/ak-47.png");
            scene.load.image("images.bullet-01", "./assets/images/weapon/guns/ak47/bullet-01.png");
        }
    }
}