import { BoyPlayer } from "../entity/boy-player.js";
import { Pirate } from "../entity/pirate.js";
import { AK47 } from "../weapon/ak47.js";
import { Drone } from "../weapon/drone.js";
import { LightSaber } from "../weapon/light-saber.js";
import { MenuScene } from "./menu.js";
import { StoryScene } from "./story.js";

export class BootScene extends Phaser.Scene {
    constructor() {
        super("BootScene");
    }

    preload() {
        this.load.spritesheet("spritesheet.gate", "./assets/images/gate.png", {
            frameWidth: 96,
            frameHeight: 96
        });

        MenuScene.preload(this);
        StoryScene.preload(this);

        LightSaber.preload(this);
        AK47.preload(this);
        Drone.preload(this);

        BoyPlayer.preload(this);
        Pirate.preload(this);
    }

    create() {
        this.scene.start("MenuScene");
    }
}