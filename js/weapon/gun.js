import { GunsWeapon } from './gunsWeapon.js';

export class Gun extends GunsWeapon {

    constructor(scene, x, y, texture, {
        normalDamage,
        bulletSpeed,
        critRate,
        critDamage,
        burstNormalTime,
        speed,
        bulletNumberInMagazine,
        reloadMagazineTime,
        armorPenetration
    }) {
        super(scene, x, y, texture, {
            normalDamage,
            bulletSpeed,
            critRate,
            critDamage,
            burstNormalTime,
            speed,
            bulletNumberInMagazine,
            reloadMagazineTime,
            armorPenetration
        })

        //set scale of Gun
        this.setScale(0.2);
    }
    static preload(scene) {
        if (scene instanceof Phaser.Scene) {
            scene.load.spritesheet("spritesheet-basic-gun", "../assets/images/gun2d.png", {
                frameWidth: 840,
                frameHeight: 307
            });
            scene.load.spritesheet("spritesheet-basic-bullet", "../assets/images/bullet.png", {
                frameWidth: 128,
                frameHeight: 128
            });
        }
    }

    create_anims() {
        this.animation.idle = this.scene.anims.create({
            key: "anims-basic-gun",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers("spritesheet-basic-gun", { start: 0, end: 0 })
        });

        this.animation.bullet = "spritesheet-basic-bullet";

        return this;
    }

}