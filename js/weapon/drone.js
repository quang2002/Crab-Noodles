import { GameConfig } from "../components/game-config.js";
import { Enemy } from "../entity/enemy.js";
import { Entity } from "../entity/entity.js";
import { Player } from "../entity/player.js";
import { StatsWeapon } from "../stats/stats-weapon.js";
import { Gun } from "../weapon/gun.js";
 
export class Drone extends Gun {
    /**
     * light-saber.init
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {StatsWeapon} stats 
     */
    constructor(scene, x, y, stats) {
        stats = Object.assign({}, GameConfig.weapons["drone"], stats);
        
        super(scene, x, y, "images.drone","images.drone-effect", stats);

        //set origin for rotation
        this.setOrigin(0, 0.5);
        this.setBodySize(1, 1);

        //create animation for attacking
        // this.scene.anims.create({
        //     key: "anims.drone-effect",
        //     frameRate: 10,
        //     repeat: 0,
        //     frames: this.anims.generateFrameNumbers("spritesheet.drone-effect", { frames: [0, 1, 3, 4, 5] })
        // });
        
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
        super.fire();
        
        if (this.isFireable) {
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

        if (this.scene.input.activePointer.isDown) {
            this.setAngle(this.angle + 1);
        } 
        //this.effect = this.scene.add.image(x, y, "images.drone-effect").setScale(1.5).setVisible(false);


        return this;
    }
    
    /**
     * load game resources
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        if (scene instanceof Phaser.Scene) {
            scene.load.image("images.drone", "./assets/images/weapon/melees/drone/drone.png");
            scene.load.image("images.drone-effect", "./assets/images/weapon/melees/drone/drone-effect.png");
        }
    }
}