import { BoyPlayer } from "../entity/boyplayer.js";
import { AK47 } from "../weapon/ak47.js";

export class TestWeaponScene extends Phaser.Scene {
    constructor() {
        super("TestWeaponScene");
    }

    preload() {
        AK47.preload(this);
        BoyPlayer.preload(this);
    }


    create() {
        this.player = new BoyPlayer(this, 100, 100, {
            entityHP: 10,
            entitySpeed: 100,
            entityRunningSpeed: 150,
        });
    }

    update() {
        this.cameras.main.setBackgroundColor("#ffffff");
        this.player.update();
    }
}