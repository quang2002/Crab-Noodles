import { GameConfig } from "../components/game-config.js";
import { Enemy } from "../entity/enemy.js";
import { Entity } from "../entity/entity.js";
import { Player } from "../entity/player.js";
import { StatsWeapon } from "../stats/stats-weapon.js";
import { Gun } from "./gun.js";
import { Melee } from "./melee.js";

export class XuanYuanSword extends Melee {
    /**
     * light-saber.init
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {StatsWeapon} stats 
     */
    constructor(scene, x, y, stats) {
        stats = Object.assign({}, GameConfig.weapons["xuan_yuan_sword"], stats);
        super(scene, x, y, "images.drone", stats);

        //set origin for rotation
        this.setOrigin(0, 0.5);
        this.setBodySize(1, 1);

        this.fireSound = this.scene.sound.add("sounds.flameshot");
    }


    /**
    * point this weapon to point (on viewport)
    * @param {Phaser.Input.Pointer} pointer 
    * @returns {Weapon} this
    */
    pointTo(pointer) {
        this.setAngle(Math.atan2(pointer.y - this.vpos.y, pointer.x - this.vpos.x) / Math.PI * 180);
        return this;
    }


    /**
     * fire method
     */
    fire() {

        this.pointer = this.scene.input.activePointer;
        if (this.pointer.isDown && this.isFireable) {
            this.fireSound.play();
            super.fire();

            // effect for drone
            const power_wave = this.scene.physics.add.image(this.x, this.y, "images.drone-effect");

            // set angle, velocity for bullet
            const angle = this.angle;

            const vecy = Math.sin(angle / 180 * Math.PI);
            const vecx = Math.cos(angle / 180 * Math.PI);

            power_wave.setPosition(this.x, this.y);
            power_wave.setAngle(angle);
            power_wave.setVelocity(vecx * this.stats.speed, vecy * this.stats.speed);

            // set timeout
            power_wave.timeout = 5000;
            Gun.bullets.push(power_wave);

            let lstEnemyTookDMG = [];
            // set collide with
            this.scene.physics.add.overlap(power_wave, this.collision, (o1, o2) => {
                if ((this.owner instanceof Player && o2 instanceof Enemy) || (this.owner instanceof Enemy && o2 instanceof Player)) {
                    if (o2.isAlive && lstEnemyTookDMG.indexOf(o2) < 0) {
                        o2.take_damage(this.stats.damage);
                        lstEnemyTookDMG.push(o2);
                    }
                }

                if (!(o2 instanceof Entity))
                    o1.destroy();
            });
        }
        return this;
    }

    /**
     * load game resources
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        if (scene instanceof Phaser.Scene) {
            scene.load.image("images.drone", "./assets/images/weapon/melee/drone/drone.png");
            scene.load.image("images.drone-effect", "./assets/images/weapon/melee/drone/drone-effect.png");
        }
    }
}