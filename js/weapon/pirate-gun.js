import { GameConfig } from '../components/game-config.js';
import { StatsWeapon } from '../stats/stats-weapon.js';
import { Gun } from './gun.js';

export class PirateGun extends Gun {
    /**
     * PirateGun.init
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {StatsWeapon} stats 
     */
    constructor(scene, x, y, stats) {
        stats = Object.assign({}, GameConfig.weapons["pistol"], stats);
        super(scene, x, y, "image.pirate-gun", "spritesheet.bullet", stats);

        this.scene.anims.create({
            key: "anims.bullet",
            repeat: -1,
            frameRate: 10,
            frames: this.scene.anims.generateFrameNumbers("spritesheet.bullet", {
                start: 0, 
                end: 3
            })
        })
    }

    fire() {
        const bullet = this.scene.physics.add.sprite(this.x, this.y, "spritesheet.bullet").play("anims.bullet", true).setScale(2);
        super.fire(bullet);
        bullet.setCircle(4, 0, 0)
    }

    /**
     * load game resources
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        if (scene instanceof Phaser.Scene) {
            scene.load.image("image.pirate-gun", "./assets/images/weapon/guns/pirate-gun/pirate-gun.png");
            scene.load.spritesheet("spritesheet.bullet", "./assets/images/weapon/guns/pirate-gun/pirate-bullet.png", {
                frameWidth: 8,
                frameHeight: 8
            });
        }
    }
}