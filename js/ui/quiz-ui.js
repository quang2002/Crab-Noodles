import { GameConfig } from "../components/game-config.js";

export class QuizUI extends Phaser.Scene {
    constructor() {
        super("QuizUI");
    }

    /**
     * 
     * @param {{
     * question: string,
     * answer1: string,
     * answer2: string,
     * answer3: string,
     * answer4: string,
     * answer: number
     * }} data 
     */
    create(data) {
        const fontStyle = {
            fontFamily: GameConfig["font-family"],
            fontSize: 32,
            wordWrap: {
                width: 1024,
                useAdvancedWrap: true
            },
            color: "snow"
        };

        this.isAnsable = true;

        this.add.image(1250, 350, "ui.quiz", 0).setScale(2.5);

        const ans1 = this.add.image(975, 750, "ui.quiz-answer").setScale(2.5);
        const ans2 = this.add.image(1525, 750, "ui.quiz-answer").setScale(2.5).setFlipX(true);
        const ans3 = this.add.image(975, 950, "ui.quiz-answer").setScale(2.5).setFlipX(true);
        const ans4 = this.add.image(1525, 950, "ui.quiz-answer").setScale(2.5);

        this.add.text(975, 750, data.answer1, fontStyle).setOrigin(0.5);
        this.add.text(1525, 750, data.answer2, fontStyle).setOrigin(0.5);
        this.add.text(975, 950, data.answer3, fontStyle).setOrigin(0.5);
        this.add.text(1525, 950, data.answer4, fontStyle).setOrigin(0.5);

        this.mask = this.add.image(1250, 350, "ui.quiz", 1).setScale(2.5).setVisible(false);

        this.add.text(720, 120, data.question, fontStyle)

        ans1.setInteractive().on("pointerout", () => ans1.setScale(2.5)).on("pointermove", () => ans1.setScale(2.6)).on("pointerdown", () => this.ans(data.answer, 1));
        ans2.setInteractive().on("pointerout", () => ans2.setScale(2.5)).on("pointermove", () => ans2.setScale(2.6)).on("pointerdown", () => this.ans(data.answer, 2));
        ans3.setInteractive().on("pointerout", () => ans3.setScale(2.5)).on("pointermove", () => ans3.setScale(2.6)).on("pointerdown", () => this.ans(data.answer, 3));
        ans4.setInteractive().on("pointerout", () => ans4.setScale(2.5)).on("pointermove", () => ans4.setScale(2.6)).on("pointerdown", () => this.ans(data.answer, 4));
    }

    ans(trueans, myans) {
        if (!this.isAnsable) return;
        this.isAnsable = false;

        this.sys.displayList.removeAll();

        if (trueans == myans) {
            this.add.text(1250, 350, "CORRECT", {
                fontFamily: GameConfig["font-family"],
                fontSize: 96,
                fontStyle: "bold",
                color: "green"
            }).setMask(new Phaser.Display.Masks.BitmapMask(this, this.mask)).setOrigin(0.5);

            this.events.emit("correct");
        } else {
            this.add.text(1250, 350, "WRONG", {
                fontFamily: GameConfig["font-family"],
                fontSize: 96,
                fontStyle: "bold",
                color: "crimson"
            }).setMask(new Phaser.Display.Masks.BitmapMask(this, this.mask)).setOrigin(0.5);

            this.events.emit("incorrect");
        }

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.scene.stop();
            }
        });
    }

    /**
     * preload 
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        scene.load.spritesheet("ui.quiz", "./assets/ui/quiz.png", {
            frameWidth: 512,
            frameHeight: 256
        });

        scene.load.image("ui.quiz-answer", "./assets/ui/quiz-answer.png");
    }
}