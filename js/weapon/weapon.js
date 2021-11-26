import { StatsWeapons } from '../stats/statsWeapons.js';
export class Weapon extends Phaser.GameObjects.Sprite {

    //chứa tất cả những súng đã được nhặt
    static instances = [];

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
        if (scene instanceof Phaser.Scene) {
            super(scene, x, y, texture);
            scene.add.existing(this);
            var stat = { normalDamage, bulletSpeed, critRate, critDamage, burstNormalTime, speed, bulletNumberInMagazine, reloadMagazineTime, armorPenetration };
            //create all stats of a weapon
            this.stats = new StatsWeapons(stat);
            Weapon.instances.push(this);
        }
        //skill cool down manager
        this.cooldown = {
            "normalBurst": {
                "max": stat.burstNormalTime,
                "cur": 0
            },
            "reloadMagazine": {
                "max": stat.reloadMagazineTime,
                "cur": 0
            }
        }

        //add event for cooldown
        this.scene.time.addEvent({
            delay: 100,
            callbackScope: this,
            callback: () => {
                if (!this.isNormalAttackAble) this.cooldown.normalBurst.cur += 100;
                if (!this.isReloadMagazineAble) this.cooldown.reloadMagazine.cur += 100;
            },
            loop: -1
        });
        this.scene.physics.add.existing(this);
    }

    //if able to attack
    get isNormalAttackAble() {
        return this.cooldown.normalBurst.cur >= this.cooldown.normalBurst.max;
    }

    //if able to reload magazine
    get isReloadMagazineAble() {
        return this.cooldown.reloadMagazine.cur >= this.cooldown.reloadMagazine.max;
    }

    create() {
        //create on click (phụ thuộc vào súng bắn hay rìu cầm tay => nên sẽ viết riêng ở 2 class weapon)

    }

    update() {
        //update when click -> ban dan

        //update súng, mỗi thằng chỉ được cầm max 2 loại súng (cái này viết trong weapon-manager)

    }


}