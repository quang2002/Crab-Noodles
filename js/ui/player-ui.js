import { Enemy } from "../entity/enemy.js";
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
        scene.load.spritesheet("ui.minimap", "./assets/ui/minimap.png", { frameWidth: 200, frameHeight: 200 });
    }

    create() {
        // health-bar
        this.add.container(300, 75, [
            this.add.image(0, 0, "ui.health-bar", 0),
            this.add.image(0, 0, "ui.health-bar", 1),
        ]).setScale(2);

        this.healthbar = this.add.rectangle(56, 75, 488, 70, 0x8EC4C8).setOrigin(0, 0.5);
        this.healthbar.setMask(new Phaser.Display.Masks.BitmapMask(this,
            this.make.image({
                x: 300,
                y: 75,
                key: "ui.health-bar",
                frame: 2,
                scale: 2
            }, false))
        );

        // minimap
        this.add.image(250, 300, "ui.minimap", 0).setScale(2);

        // RADAR TYPE
        this.minimap = this.add.container(250, 300, []).setMask(new Phaser.Display.Masks.BitmapMask(this,
            this.make.image({
                x: 250,
                y: 300,
                key: "ui.minimap",
                frame: 1,
                scale: 2
            }, false))
        );

        // SECONDARY CAMERA TYPE
        this.minicam = this.player.scene.cameras.add(50, 100, 380, 380)
            .startFollow(this.player)
            .setBackgroundColor(0)
            .setZoom(0.7)
            .setMask(new Phaser.Display.Masks.BitmapMask(this,
                this.make.image({
                    x: 250,
                    y: 300,
                    key: "ui.minimap",
                    frame: 1,
                    scale: 2
                }, false))
            );
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
            this.healthbar.setDisplaySize((this.player.stats.cur.hp / this.player.stats.max.hp) * 488, 70);

            // RADAR TYPE
            this.minimap.removeAll(true);
            this.minimap.add(this.add.circle(0, 0, 4, 0x00ff00));
            this.player.scene.sys.displayList.each(v => {
                if (v instanceof Enemy && v.isAlive) {
                    const vec = {
                        x: v.x - this.player.x,
                        y: v.y - this.player.y,
                    };

                    this.minimap.add(this.add.circle(vec.x * 0.7, vec.y * 0.7, 4, 0xff0000));
                }

                if (!(v instanceof Phaser.Tilemaps.TilemapLayer)) this.minicam.ignore(v);
            });
        }
    }
}