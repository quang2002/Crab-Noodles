import { BootScene } from "./scenes/boot.js";
import { LobbyScene } from "./scenes/lobby.js";
import { MenuScene } from "./scenes/menu.js";
import { StoryScene } from "./scenes/story.js";

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
            }
        },

        scene: [BootScene, MenuScene, StoryScene, LobbyScene]
    });
});