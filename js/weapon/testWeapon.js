import { Gun } from './gun.js';

export class TestWeapon extends Phaser.Scene {
    constructor() {
        super("TestWeapon");
    }

    preload() {
        // this.load.image('bullet', './assets/images/bullet.png');
        this.load.image('bullet', './assets/images/bullet.png');
        Gun.preload(this);
    }

    create() {
        this.weapon = new Gun(this, this.scale.width / 2, this.scale.height / 2, null, {
            normalDamage: 0,
            bulletSpeed: 1000,
            critRate: 0,
            critDamage: 0,
            burstNormalTime: 0,
            speed: 0,
            bulletNumberInMagazine: 0,
            reloadMagazineTime: 0,
            armorPenetration: 0
        });

        this.input.on(Phaser.Input.Events.POINTER_UP, (pointer) => {
            // console.log("Hello there");
            // console.log(pointer);
            // this.bullet = this.physics.add.image(this.scale.width / 2, this.scale.height / 2, 'bullet').setScale(2);

            // this.image.setTexture('bullet');
        });
    }

}