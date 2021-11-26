import { Weapon } from './weapon.js';

export class GunsWeapon extends Weapon {
    //khởi tạo onclick
    //update khi mà click thì sẽ bắn đạn như thế nào
    //tốc độ bay của đạn

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
        });

        //idle : súng lúc không bắn
        //bullet : đạn của súng bắn ra
        this.animation = { idle: null, bullet: null };
        this.create_anims();

        //create mouse move
        this.scene.input.on(Phaser.Input.Events.POINTER_MOVE, (pointer) => {
            this.play(this.animation.idle, true);

            //set angle for weapon
            this.setAngle(Math.atan2(pointer.y - y, pointer.x - x) / Math.PI * 180);

            // this.body.setAngle(pointer.x, pointer.y);
        });

        //mouse click : set sao cho 
        this.scene.input.on(Phaser.Input.Events.POINTER_DOWN, (pointer) => {
            //add new bullet
            this.bullet = this.scene.physics.add.sprite(x, y, this.animation.bullet);
            //set velocity for bullet: dai = length of vector (x, y)
            let dai = Math.sqrt((pointer.x - x) * (pointer.x - x) + (pointer.y - y) * (pointer.y - y));

            //set velocity for bullet
            this.bullet.setVelocity((pointer.x - x) / dai * this.stats.bulletSpeed, ((pointer.y - y) / dai) * this.stats.bulletSpeed);

            //set angle for bullet
            this.bullet.setAngle(Math.atan2(pointer.y - y, pointer.x - x) / Math.PI * 180 + 90);
        });
    }

    create_anims() {
        return this;
    }

}