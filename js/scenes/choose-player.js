import { GameConfig } from "../components/game-config.js";
import { GameScene } from "../components/game-scene.js";
import { BoyPlayer } from "../entity/boy-player.js";
import { GirlPlayer } from "../entity/girl-player.js";
import { MenuScene } from "./menu.js";
import { StoryScene } from "./story.js";

export class ChoosePlayer extends GameScene {
    constructor() {
        super("ChoosePlayer");
    }

    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        scene.load.image("images.choose-player-bg", "./assets/ui/choose-player.png");
        scene.load.image("images.choose-boy-player", "./assets/ui/btn-boy.png");
        scene.load.image("images.choose-girl-player", "./assets/ui/btn-girl.png");
    }

    create() {
        super.create();

        this.buttonSound = this.sound.add("sounds.button");

        this.anims.create({
            key: "anims.choose-boy",
            frameRate: 10,
            repeat: -1,
            frames: this.anims.generateFrameNames("spritesheet.boy-player", { start: 0, end: 3 })
        });

        this.anims.create({
            key: "anims.choose-girl",
            frameRate: 10,
            repeat: -1,
            frames: this.anims.generateFrameNames("spritesheet.girl-player", { start: 0, end: 3 })
        });

        //background
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "images.choose-player-bg").setOrigin(0.5, 0.5).setScale(1.2);

        this.add.sprite(555, 500, null).play("anims.choose-boy").setScale(3);
        this.add.sprite(1383, 500, null).play("anims.choose-girl").setScale(3);

        //button to stage 1
        this.buttonJSBoy = this.add.image(555, 805, "images.choose-boy-player").setOrigin(0.5, 0.5).setScale(0.7);
        this.buttonJSBoy.setInteractive()
            .on("pointerdown", () => {
                this.buttonSound.play();
                GameConfig["player_type"] = BoyPlayer;
                if(GameConfig.scene_before_chooseplayer == MenuScene)
                    this.scene.start("LobbyScene");
                else 
                    this.scene.start("StoryMode");

            }
            ).on("pointermove", () => {
                this.buttonJSBoy.setScale(0.8);
            }).on("pointerout", () => {
                this.buttonJSBoy.setScale(0.7);
            })

        //button to stage 2
        this.buttonJSGirl = this.add.image(1383, 805, "images.choose-girl-player").setOrigin(0.5, 0.5).setScale(0.7);
        this.buttonJSGirl.setInteractive()
            .on("pointerdown", () => {
                this.buttonSound.play();
                GameConfig["player_type"] = GirlPlayer;
                if (GameConfig.scene_before_chooseplayer == MenuScene)
                    this.scene.start("LobbyScene");
                else
                    this.scene.start("StoryMode");
            }
            ).on("pointermove", () => {
                this.buttonJSGirl.setScale(0.8);
            }).on("pointerout", () => {
                this.buttonJSGirl.setScale(0.7);
            })
    }
}