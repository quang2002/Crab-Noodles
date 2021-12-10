import { QuizBank } from "../components/game-quiz.js";
import { Entity } from "../entity/entity.js";
import { Player } from "../entity/player.js";
import { HorizontalDoor } from "./horizontal-door.js";
import { VerticalDoor } from "./vertical-door.js";

export class Computer extends Phaser.Physics.Arcade.Sprite {
    static questions = Array().concat(QuizBank);

    /**
     * init 
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {HorizontalDoor | VerticalDoor} door
     */
    constructor(scene, x, y, door) {
        super(scene, x, y, null);

        this.solStep = 0;

        Entity.collision.push(this);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.add.collider(this, Entity.instances, (o1, o2) => {
            if (o2 instanceof Player && this.solStep == 0 && this.scene.input.activePointer.isDown) {
                this.solStep = 1;

                this.setDepth(10);

                const ques = Computer.questions[Math.round(Math.random() * (Computer.questions.length - 1))];

                this.scene.scene.launch("QuizUI", ques);

                o2.setVelocity(0).stunTime = 1e9;

                this.scene.scene.get("QuizUI").events.once("correct", () => {
                    this.solStep = 3;
                    this.door.setAuto(true);
                    Computer.questions = Computer.questions.filter(e => e != ques);

                    o2.stunTime = 0;
                });

                this.scene.scene.get("QuizUI").events.once("incorrect", () => {
                    this.solStep = 0;
                    o2.stunTime = 0;
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

        this.door = door;
        this.door.computer = this;
    }

    /**
     * Horizontal Door preload resources
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        scene.load.spritesheet("spritesheet.computer", "./assets/images/computer.png", { frameWidth: 128, frameHeight: 96 });
    }
}