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
        scene.load.image("ui.status-bar", "./assets/ui/status-bar.png");
    }

    create() {
        this.statusbar = this.physics.add.image(30, 30, "ui.status-bar");
        this.statusbar.setScale(4).setOrigin(0);

        this.MAXBARSIZE = {
            width: 52 * this.statusbar.scale,
            height: 6 * this.statusbar.scale,
        }

        this.hp = this.add.rectangle(
            this.statusbar.x + 36 * this.statusbar.scale,
            this.statusbar.y + 3 * this.statusbar.scale,
            this.MAXBARSIZE.width,
            this.MAXBARSIZE.height,
            0xFF0000, 0.6).setOrigin(0);
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
            this.hp.setDisplaySize(this.MAXBARSIZE.width * (this.player.stats.cur.hp / this.player.stats.max.hp), this.MAXBARSIZE.height);
        }
    }
}