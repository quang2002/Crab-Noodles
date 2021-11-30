import { StatsWeapon } from "../stats/stats-weapon.js";
import { Melee } from "./melee.js";

export class LightSaber extends Melee {
    /**
     * light-saber.init
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {StatsWeapon} stats 
     */
    constructor(scene, x, y, stats) {
        super(scene, x, y, "image-light-saber", stats);
        this.setOrigin(0, 0.5);
        this.setBodySize(1, 1);

        this.scene.anims.create({
            key: "anims-light-saber-effect",
            frameRate: 10,
            repeat: 0,
            frames: this.anims.generateFrameNumbers("spritesheet-light-saber-effect", { frames: [0, 1, 3, 4, 5] })
        });

        this.effect = this.scene.add.sprite(x, y, null).setScale(1.5).setVisible(false);
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

        this.setAngle(this.angle + this.stats.speed);

        this.effect
            .setVisible(true)
            .setPosition(this.x, this.y)
            .play("anims-light-saber-effect", true)
            .on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                this.effect.setVisible(false);
            });

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
            scene.load.image("image-light-saber", "./assets/images/light-saber.png");
            scene.load.spritesheet("spritesheet-light-saber-effect", "./assets/images/light-saber-effect.png", { frameWidth: 38, frameHeight: 38 });
        }
    }
}