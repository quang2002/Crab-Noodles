import { BoyPlayer } from "../entity/boy-player.js";
import { Pirate } from "../entity/pirate.js";
import { RedGate } from "../entity/red-gate.js";
import { PlayerUI } from "../ui/player-ui.js";
import { AK47 } from "../weapon/ak47.js";
import { LightSaber } from "../weapon/light-saber.js";
import { ChooseStage } from "./choosestage.js";
import { LobbyScene } from "./lobby.js";
import { MenuScene } from "./menu.js";
import { Stage01 } from "./stage-01.js";
import { Stage02 } from "./stage-02.js";
import { StoryScene } from "./story.js";

export class BootScene extends Phaser.Scene {
    constructor() {
        super("BootScene");
    }

    preload() {
        // Game Scene
        MenuScene.preload(this);
        StoryScene.preload(this);
        ChooseStage.preload(this);
        Stage01.preload(this);
        Stage02.preload(this);
        LobbyScene.preload(this);

        // UI
        PlayerUI.preload(this);

        // weapons
        LightSaber.preload(this);
        AK47.preload(this);

        // entities
        BoyPlayer.preload(this);
        Pirate.preload(this);
        RedGate.preload(this);
    }

    create() {
        this.scene.start("MenuScene");
    }
}