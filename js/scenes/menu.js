export class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    static preload(scene) {
        scene.load.image("images.bg", "./assets/images/bg.png");
        scene.load.image("ui.btn-newgame", "./assets/UI/btn-newgame.png");
        scene.load.image("ui.btn-lastgame", "./assets/UI/btn-lastgame.png");
        scene.load.image("ui.btn-setting", "./assets/UI/btn-setting.png");

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
        this.newgameButton = this.add.image(375, 610, "ui.btn-newgame").setOrigin(0.5, 0.5).setScale(0.8).setInteractive()
            .on("pointerdown", () => {
                this.themeSound.stop();
                this.buttonSound.play();
                this.scene.start("StoryScene");
            })
            .on("pointerout", () => this.newgameButton.setScale(0.8))
            .on("pointermove", () => this.newgameButton.setScale(1));

        // last game from lobby button
        this.lastgameButton = this.add.image(375, 800, "ui.btn-lastgame").setOrigin(0.5, 0.5).setScale(0.8).setInteractive()
            .on("pointerdown", () => {
                this.themeSound.stop();
                this.buttonSound.play();
                this.scene.start("Stage01");
            })
            .on("pointerout", () => this.lastgameButton.setScale(0.8))
            .on("pointermove", () => this.lastgameButton.setScale(1));


        // setting button
        this.add.image(1780, 940, "ui.btn-setting").setOrigin(0).setScale(0.8);


        // text
        // const text = this.add.text(
        //     this.scale.width / 2,
        //     this.scale.height - 50,
        //     "Tap to continue",
        //     {
        //         align: "center",
        //         color: "lightblue",
        //         stroke: "blue",
        //         strokeThickness: 2,
        //         fontSize: 64,
        //         fontStyle: "bold"
        //     }
        // ).setOrigin(0.5);

        // this.time.addEvent({
        //     loop: true,
        //     delay: 10,
        //     callback: () => text.setAlpha((Math.sin(this.time.now / 200) + 1) * 0.35 + 0.3)
        // });
    }
}