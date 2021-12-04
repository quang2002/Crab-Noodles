import { GameConfig } from "../components/game-config.js";
import { Enemy } from "../entity/enemy.js";
import { Entity } from "../entity/entity.js";
import { Player } from "../entity/player.js";
import { StatsWeapon } from "../stats/stats-weapon.js";
import { Melee } from "./melee.js";

export class Drone extends Melee {
    /**
     * light-saber.init
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {StatsWeapon} stats 
     */
    constructor(scene, x, y, stats) {
        stats = Object.assign({}, GameConfig.weapons["drone"], stats);
        super(scene, x, y, "images.drone", stats);

        //set origin for rotation
        this.setOrigin(0, 0.5);
        this.setBodySize(1, 1);

        //create animation for attacking
        this.scene.anims.create({
            key: "anims.drone-effect",
            frameRate: 10,
            repeat: 0,
            frames: this.anims.generateFrameNumbers("spritesheet.light-saber-effect", { frames: [0, 1, 3, 4, 5] })
        });


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

        //effect for drone
        this.anims_drone = this.scene.physics.add.sprite(this.x, this.y, "images.drone-effect").setVisible(false);

        /*if (this.isFireable) {
            Entity.instances
                .filter(value => value.isAlive && (this.owner instanceof Player && value instanceof Enemy) || (this.owner instanceof Enemy && value instanceof Player))
                .forEach((value) => {
                    const vecx = this.x - value.x;
                    const vecy = this.y - value.y;
                    const range = 48;
                    if (vecx * vecx + vecy * vecy < range * range) {
                        super.fire();
                        value.take_damage(this.stats.damage);
                    }
                });
        }
        */

        this.pointer = this.scene.input.activePointer;
        if (this.pointer.isDown && this.isFireable) {
            this.anims_drone.setVisible(true).setAngle(this.angle).setPosition(this.x, this.y);

            // set angle, velocity for bullet
            const angle = this.angle;

            const vecy = Math.sin(angle / 180 * Math.PI);
            const vecx = Math.cos(angle / 180 * Math.PI);

            // this.anims_drone.setCircle(6, 2, 2);
            this.anims_drone.setAngle(angle).setVisible(true);
            this.anims_drone.setVelocity(vecx * this.stats.speed, vecy * this.stats.speed);

            //add event for destroy anims_drone
            this.scene.time.addEvent({
                delay: 100,
                loop: 10,
                callback: () => {

                }
            })

            var enemyGetdamage =[];
            // set collide with
            this.scene.physics.add.overlap(this.anims_drone, this.collision, (o1, o2) => {
                if ((this.owner instanceof Player && o2 instanceof Enemy) || (this.owner instanceof Enemy && o2 instanceof Player)) {
                    if (o2 instanceof Entity && o2.isAlive && enemyGetdamage.indexOf(o2) < 0) {
                        o2.take_damage(this.stats.damage);
                        enemyGetdamage.push(o2);
                    }
                }

                if (!(o2 instanceof Entity))
                    o1.destroy();
            });

            
            if (this.isFireable) {
                super.fire();
            }
        }



        //this.setAngle(this.angle + this.stats.speed);

        return this;
    }

    /**
     * set position for this game object
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @param {number} w 
     * @returns {LightSaber} this
     */
    setPosition(x, y, z, w) {
        this.effect?.setPosition(x, y);
        return super.setPosition(x, y, z, w);
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