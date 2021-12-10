import { GameConfig } from "../components/game-config.js";
import { StoryScene } from "./story.js";

export class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    static preload(scene) {
        scene.load.image("images.bg", "./assets/images/bg.png");
        scene.load.image("ui.btn-storymode", "./assets/ui/btn-storymode.png");
        scene.load.image("ui.btn-endlessmode", "./assets/ui/btn-endlessmode.png");
        scene.load.image("ui.btn-question", "./assets/ui/btn-question.png");
        scene.load.image("ui.tutorial", "./assets/ui/tutorial.png");

        scene.load.audio("sounds.menu-theme", "./assets/sounds/theme/first-scene.mp3");
        scene.load.audio("sounds.button", "./assets/sounds/UI/click-2.wav");
    }

    create() {
        // add theme sounds
        this.themeSound = this.sound.add("sounds.menu-theme", { volume: 0.5, loop: true });
        this.themeSound.play();

        // add button sounds
        this.buttonSound = this.sound.add("sounds.button");

        // add images
        this.add.image(0, 0, "images.bg").setOrigin(0);

        // new game button
        const btn_storymode = this.add.image(375, 610, "ui.btn-storymode").setOrigin(0.5, 0.5).setScale(0.8).setInteractive()
            .on("pointerdown", () => {
                this.themeSound.stop();
                this.buttonSound.play();
                this.scene.start("StoryScene");
            })
            .on("pointerout", () => btn_storymode.setScale(0.8))
            .on("pointermove", () => btn_storymode.setScale(1));

        // last game from lobby button
        const btn_endlessmode = this.add.image(375, 800, "ui.btn-endlessmode").setOrigin(0.5, 0.5).setScale(0.8).setInteractive()
            .on("pointerdown", () => {
                GameConfig.scene_before_chooseplayer = StoryScene;
                this.themeSound.stop();
                this.buttonSound.play();
                this.scene.start("ChoosePlayer");
            })
            .on("pointerout", () => btn_endlessmode.setScale(0.8))
            .on("pointermove", () => btn_endlessmode.setScale(1));


        // question button
        const tutorial = this.add.image(this.scale.width / 2, this.scale.height / 2, "ui.tutorial").setVisible(false);
        const btn_question = this.add.image(1780, 940, "ui.btn-question").setOrigin(0.5).setScale(0.8).setInteractive()
            .on("pointerout", () => {
                btn_question.setScale(0.8);
                tutorial.setVisible(false);
            })
            .on("pointermove", () => {
                btn_question.setScale(1);
                tutorial.setVisible(true);
            });
    }
}