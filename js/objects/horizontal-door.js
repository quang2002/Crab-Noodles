import { Entity } from "../entity/entity.js";
import { Player } from "../entity/player.js";

export class HorizontalDoor extends Phaser.Physics.Arcade.Sprite {
    /**
     * init 
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {boolean} isAutoDoor
     */
    constructor(scene, x, y, isAutoDoor) {
        super(scene, x, y, null);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.add.collider(this, Entity.instances);

        Entity.collision.push(this);

        this.setPushable(false).setImmovable(true)

        this.anims.create({
            key: "anims.horizontal-door-open",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("spritesheet.horizontal-door", { frames: [0, 1, 2, 3, 4] }),
        });

        this.anims.create({
            key: "anims.horizontal-door-close",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("spritesheet.horizontal-door", { frames: [4, 3, 2, 1, 0] }),
        });


        this.computer = null;
        this.isopen = true;
        this.setBodySize(128, 64).setOffset(0).setDepth(-1).close();

        this.isAutoDoor = isAutoDoor;
        const sensor = scene.physics.add.image(x, y, null).setVisible(false).setBodySize(128, 96);
        this.scene.time.addEvent({
            loop: true,
            delay: 100,
            callback: () => {
                /**
                 * @type {Player}
                 */
                let opener = null;

                const isoverlap = this.scene.physics.overlap(sensor, Entity.instances, (o1, o2) => { opener = o2; });
                if (this.isAutoDoor) {
                    if (isoverlap) this.open();
                    else this.close();
                } else if (isoverlap && (opener instanceof Player)) {
                    if (!opener.isStunning && this.computer) {
                        this.scene.chat("Vui Lòng Trả Lời Câu Hỏi Ở Máy Tính!");

                        opener.cameras.follow = this.computer;
                        opener.setVelocity(0).setPosition(opener.x + (opener.x - x) * 0.5, opener.y + (opener.y - y) * 0.5).stunTime = 2000;
                    }
                }
            }
        });
    }

    /**
     * Horizontal Door preload resources
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        scene.load.spritesheet("spritesheet.horizontal-door", "./assets/images/horizontal-door.png", { frameWidth: 128, frameHeight: 64 });
    }

    open() {
        if (this.isopen) return this;
        this.play("anims.horizontal-door-open", true).on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => this.body.setEnable(false));
        this.isopen = true;
        return this;
    }

    close() {
        if (!this.isopen) return this;
        this.play("anims.horizontal-door-close", true).on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => this.body.setEnable(true));
        this.isopen = false;
        return this;
    }

    /**
     *  
     * @param {boolean} value 
     */
    setAuto(value) {
        this.isAutoDoor = value;
    }
}