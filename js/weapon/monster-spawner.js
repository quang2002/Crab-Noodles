import { GameConfig } from '../components/game-config.js';
import { Enemy } from '../entity/enemy.js';
import { StatsWeapon } from '../stats/stats-weapon.js';
import { Weapon } from './weapon.js';

export class MonsterSpawner extends Weapon {
    /**
     * MonsterSpawner.init
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {Array<Enemy>} monster_types 
     * @param {StatsWeapon} stats 
     */
    constructor(scene, x, y, monster_types, stats) {
        stats = Object.assign({}, GameConfig.weapons["monster_spawner"], stats);
        super(scene, x, y, null, stats);

        this.setVisible(false);

        this.monster_types = monster_types;
        this.monsters = [];
    }

    fire() {
        if (this.isFireable && this.monster_types.length > 0 && this.monsters.length < this.stats.ammo) {
            super.fire();
            const random = (Math.random() * this.monster_types.length) | 0;

            const monster = new this.monster_types[random](this.scene, this.x, this.y);
            this.monsters.push(monster);

            this.monsters = this.monsters.filter(e => e.isAlive);
        }
        return this;
    }
}