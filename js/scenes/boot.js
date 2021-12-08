import { BoyPlayer } from "../entity/boy-player.js";
import { GirlPlayer } from "../entity/girl-player.js";
import { Pirate } from "../entity/pirate.js";
import { RedGate } from "../entity/red-gate.js";
import { Robot } from "../entity/robot.js";
import { PlayerUI } from "../ui/player-ui.js";
import { AK47 } from "../weapon/ak47.js";
import { XuanYuanSword } from "../weapon/xuan-yuan-sword.js";
import { LightSaber } from "../weapon/light-saber.js";
import { Pistol } from "../weapon/pistol.js";
import { Rocket } from "../weapon/rocket.js";
import { ChoosePlayer } from "./choose-player.js";
import { ChooseStage } from "./choose-stage.js";
import { LobbyScene } from "./lobby.js";
import { MenuScene } from "./menu.js";
import { Stage01 } from "./stage-01.js";
import { Stage02 } from "./stage-02.js";
import { StoryScene } from "./story.js";
import { QuizUI } from "../ui/quiz-ui.js";

export class BootScene extends Phaser.Scene {
    constructor() {
        super("BootScene");
    }

    preload() {
        // Game Scene
        MenuScene.preload(this);
        StoryScene.preload(this);
        Stage01.preload(this);
        Stage02.preload(this);
        LobbyScene.preload(this);

        // UI
        ChooseStage.preload(this);
        ChoosePlayer.preload(this);
        PlayerUI.preload(this);
        QuizUI.preload(this);

        // weapons
        LightSaber.preload(this);
        AK47.preload(this);
        XuanYuanSword.preload(this);
        Pistol.preload(this);
        Rocket.preload(this);

        // entities
        BoyPlayer.preload(this);
        GirlPlayer.preload(this);
        Pirate.preload(this);
        Robot.preload(this);
        RedGate.preload(this);

        // sounds
        this.load.audio("sounds.blastershot", "./assets/sounds/BlasterShot.wav");
        this.load.audio("sounds.flameshot", "./assets/sounds/FlameShot.wav");
        this.load.audio("sounds.girlhurt", "./assets/sounds/GirlHurt.wav");
        this.load.audio("sounds.boyhurt", "./assets/sounds/BoyHurt.wav");
        this.load.audio("sounds.boydeath", "./assets/sounds/BoyDeath.wav");
        this.load.audio("sounds.girldeath", "./assets/sounds/GirlDeath.wav");
        this.load.audio("sounds.changegun", "./assets/sounds/ChangeGun.wav");
    }

    create() {
        this.scene.start("MenuScene");
    }
}