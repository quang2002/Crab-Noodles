import { BootScene } from "./scenes/boot.js";
import { ChooseStage } from "./scenes/choosestage.js";
import { LobbyScene } from "./scenes/lobby.js";
import { MenuScene } from "./scenes/menu.js";
import { Stage01 } from "./scenes/stage-01.js";
import { Stage02 } from "./scenes/stage-02.js";
import { StoryScene } from "./scenes/story.js";
import { PlayerUI } from "./ui/player-ui.js";

window.addEventListener("load", () => {
    window.game = new Phaser.Game({
        type: Phaser.AUTO,
        scale: {
            parent: 'game-canvas',
            mode: Phaser.Scale.CENTER_VERTICALLY,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 1920,
            height: 1080
        },
        audio: {
            disableWebAudio: true
        },
        physics: {
            default: "arcade",
            arcade: {
                fps: 60,
                gravity: {},
                debug: false
            },
            matter: {
                gravity: {},
                debug: false
            }
        },

        scene: [BootScene, MenuScene, StoryScene, LobbyScene, Stage01, Stage02, PlayerUI, ChooseStage]
    });
});