import { BoyPlayer } from "../entity/boy-player.js";
import { AK47 } from "../weapon/ak47.js";
import { Rapier } from "../weapon/rapier.js";
import { MenuScene } from "./menu.js";
import { StoryScene } from "./story.js";

export class BootScene extends Phaser.Scene {
    constructor() {
        super("BootScene");
    }

    preload() {
        MenuScene.preload(this);
        StoryScene.preload(this);

        Rapier.preload(this);
        AK47.preload(this);

        BoyPlayer.preload(this);
    }

    create() {
        this.scene.start("MenuScene");
    }
}