import { GameConfig } from "../components/game-config.js";
import { Entity } from "../entity/entity.js";
import { Player } from "../entity/player.js";

export class Boom extends Phaser.Physics.Arcade.Sprite {
    /**
     * init 
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(scene, x, y) {
        super(scene, x, y, null);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.add.collider(this, Entity.instances, (o1, o2) => {
            if (o2 instanceof Player) {
                o2.take_damage(GameConfig.weapons.boom.damage).setVelocity((o2.x - x) * 6, (o2.y - y) * 6).stunTime = 500;
                this.body.destroy();
                this.play("anims.boom-active", true).on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => this.destroy(true));
            }
        });

        this.setPushable(false).setImmovable(true)

        this.anims.create({
            key: "anims.boom-idle",
            frameRate: 6,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("spritesheet.boom", { start: 0 }),
        });

        this.scene.anims.create({
            key: "anims.boom-active",
            frameRate: 10,
            frames: this.scene.anims.generateFrameNames("spritesheet.bullet-animation", {
                start: 0,
                end: 7
            })
        })

        this.play("anims.boom-idle", true);
        this.setBodySize(32, 32).setOffset(0);
    }

    /**
     * Horizontal Door preload resources
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        scene.load.spritesheet("spritesheet.boom", "./assets/images/boom.png", { frameWidth: 32, frameHeight: 32 });
    }
}