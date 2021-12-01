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
        stats = Object.assign({}, GameConfig.weapons["ak-47"].stats, stats);
        super(scene, x, y, GameConfig.weapons["ak-47"].texture.key, GameConfig.weapons["ak-47"].bullet.key, stats);
    }

    /**
     * load game resources
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        if (scene instanceof Phaser.Scene) {
            scene.load.image(GameConfig.weapons["ak-47"].texture.key, GameConfig.weapons["ak-47"].texture.path);
            scene.load.image(GameConfig.weapons["ak-47"].bullet.key, GameConfig.weapons["ak-47"].bullet.path);
        }
    }
}