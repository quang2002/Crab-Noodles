import { AK47 } from "../weapon/ak47.js";
import { MenuScene } from "./menu.js";
import { StoryScene } from "./story.js";

export class BootScene extends Phaser.Scene {
    constructor() {
        super("BootScene");
    }

    preload() {
        MenuScene.preload(this);
        StoryScene.preload(this);
    }

    create() {
        this.scene.start("MenuScene");
    }
}