export class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    static preload(scene) {
        scene.load.image("images.bg", "./assets/images/background/bg.png");
        scene.load.image("button-newgame", "./assets/images/background/newgame.png");
        scene.load.image("button-lastgame", "./assets/images/background/lastgame.png");
        scene.load.image("button-setting", "./assets/images/background/setting.png");
    }

    create() {
        // this.add.image(0, 0, "images.bg").setOrigin(0).setInteractive().on("pointerdown", () => this.scene.start("StoryScene"));
        //this.add.image(0, 0, "images.bg").setOrigin(0).setInteractive().on("pointerdown", () => this.scene.start("Stage01"));

        //this.add.image(0, 0, "images.bg").setOrigin(0).setInteractive().on("pointerdown", () => this.scene.start("LobbyScene"));

        //this.add.image(20, 20, "ui.btn-setting").setScale(3).setOrigin(0).setInteractive().on("pointerdown", () => console.log("Clicked Setting btn!"));
        
        //add images
        this.add.image(0, 0, "images.bg").setOrigin(0).setInteractive().on("pointermove",
            () => {
                this.newgameButton.setScale(0.8);
                this.lastgameButton.setScale(0.8);
            });

        //new game button
        this.newgameButton = this.add.image(375, 610, "button-newgame").setOrigin(0.5, 0.5).setScale(0.8).setInteractive().on("pointerdown",
            () => this.scene.start("StoryScene"));

        //if pointer move => zoom out
        this.newgameButton.setInteractive().on("pointermove", () => {
            this.newgameButton.setScale(1);
        });

        //last game from lobby button
        this.lastgameButton = this.add.image(375, 800, "button-lastgame").setOrigin(0.5, 0.5).setScale(0.8).setInteractive().on("pointerdown",
            () => this.scene.start("LobbyScene"));

        //if pointer move => zoom out
        this.lastgameButton.setInteractive().on("pointermove", () => {
            this.lastgameButton.setScale(1);
        })

        //setting button
        this.add.image(1780, 940, "button-setting").setOrigin(0).setScale(0.8);

        const text = this.add.text(
            this.scale.width / 2,
            this.scale.height - 50,
            "Tap to continue",
            {
                align: "center",
                color: "lightblue",
                stroke: "blue",
                strokeThickness: 2,
                fontSize: 64,
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        this.time.addEvent({
            loop: true,
            delay: 10,
            callback: () => text.setAlpha((Math.sin(this.time.now / 200) + 1) * 0.35 + 0.3)
        });
    }
}