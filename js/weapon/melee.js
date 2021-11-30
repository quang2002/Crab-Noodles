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
    }
}