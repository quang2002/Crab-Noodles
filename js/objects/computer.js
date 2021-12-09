import { Entity } from "../entity/entity.js";
import { Player } from "../entity/player.js";

export class Computer extends Phaser.Physics.Arcade.Sprite {
    /**
     * init 
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(scene, x, y) {
        super(scene, x, y, null);

        this.solStep = 0;
        this.oncorrect = () => { };
        this.onincorrect = () => { };

        Entity.collision.push(this);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.add.collider(this, Entity.instances, (o1, o2) => {
            if (o2 instanceof Player && this.solStep == 0) {
                this.solStep = 1;
                this.scene.scene.launch("QuizUI", {
                    question: "Lâm có ny không?",
                    answer1: "Có",
                    answer2: "Kó",
                    answer3: "Ko",
                    answer4: "Khum",
                    answer: 1
                });

                this.scene.scene.get("QuizUI").events.once("correct", () => {
                    this.solStep = 3;
                    this.oncorrect();
                });
                
                this.scene.scene.get("QuizUI").events.once("incorrect", () => {
                    this.solStep = 0;
                    this.onincorrect();
                });
            }
        });

        this.setPushable(false).setImmovable(true)

        this.anims.create({
            key: "anims.computer-idle",
            frameRate: 6,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("spritesheet.computer", { start: 0 }),
        });

        this.play("anims.computer-idle", true);
        this.setBodySize(100, 25).setOffset(14, 58);
    }

    /**
     * Horizontal Door preload resources
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        scene.load.spritesheet("spritesheet.computer", "./assets/images/computer.png", { frameWidth: 128, frameHeight: 96 });
    }

    correct(callback) {
        this.oncorrect = callback;
        return this;
    }

    incorrect(callback) {
        this.onincorrect = callback;
        return this;
    }
}