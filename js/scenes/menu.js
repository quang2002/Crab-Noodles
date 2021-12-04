export class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    static preload(scene) {
        scene.load.image("images.bg", "./assets/images/bg.png");
        scene.load.image("ui.btn-newgame", "./assets/ui/btn-newgame.png");
        scene.load.image("ui.btn-lastgame", "./assets/ui/btn-lastgame.png");
        scene.load.image("ui.btn-setting", "./assets/ui/btn-setting.png");

        scene.load.audio("sounds.menu-theme", "./assets/sounds/theme/first-scene.mp3");
        scene.load.audio("sounds.button", "./assets/sounds/ui/click-2.wav");
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
                this.scene.start("LobbyScene");
            })
            .on("pointerout", () => this.lastgameButton.setScale(0.8))
            .on("pointermove", () => this.lastgameButton.setScale(1));


        // setting button
        this.add.image(1780, 940, "ui.btn-setting").setOrigin(0).setScale(0.8);
    }
}