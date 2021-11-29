export class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    static preload(scene) {
        scene.load.image("images.bg", "./assets/images/bg.jpg");
        scene.load.image("ui.btn-setting", "./assets/ui/btn-setting.png");
    }

    create() {
        // this.add.image(0, 0, "images.bg").setOrigin(0).setInteractive().on("pointerdown", () => this.scene.start("StoryScene"));
        this.add.image(0, 0, "images.bg").setOrigin(0).setInteractive().on("pointerdown", () => this.scene.start("LobbyScene"));
        //this.add.image(20, 20, "ui.btn-setting").setScale(3).setOrigin(0).setInteractive().on("pointerdown", () => console.log("Clicked Setting btn!"));

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