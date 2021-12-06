import { Player } from "../entity/player.js";

export class PlayerUI extends Phaser.Scene {
    constructor() {
        super("PlayerUI");
    }

    /**
     * preload
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        scene.load.spritesheet("ui.health-bar", "./assets/ui/health-bar.png", { frameWidth: 243, frameHeight: 35 });
    }

    create() {
        this.healthbar = this.add.container(300, 75, [
            this.add.image(0, 0, "ui.health-bar", 0),
            this.add.image(0, 0, "ui.health-bar", 1),
        ]).setScale(2);

        this.abc = this.add.rectangle(56, 75, 488, 70, 0x8EC4C8).setOrigin(0, 0.5);
        this.abc.setMask(new Phaser.Display.Masks.BitmapMask(this, this.make.image({ x: 300, y: 75, key: "ui.health-bar", frame: 2, scale: 2 }, false)));
    }

    /**
     * setData
     * @param {{player: Player}} data 
     */
    setData(data) {
        if (data.player) {
            this.player = data.player;
        }
    }

    update() {
        if (this.player) {
            this.abc.setDisplaySize((this.player.stats.cur.hp / this.player.stats.max.hp) * 488, 70);
        }
    }
}