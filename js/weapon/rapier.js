import { Melee } from "./melee.js";

export class Rapier extends Melee {
    /**
     * Rapier.init
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {StatsWeapon} stats 
     */
    constructor(scene, x, y, stats) {
        super(scene, x, y, "image-rapier", stats);
    }

    /**
     * load game resources
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        if (scene instanceof Phaser.Scene) {
            scene.load.image("image-rapier", "./assets/images/rapier.png");
        }
    }
}