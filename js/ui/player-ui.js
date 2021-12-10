import { GameConfig } from "../components/game-config.js";
import { Enemy } from "../entity/enemy.js";
import { Player } from "../entity/player.js";
import { RedGate } from "../entity/red-gate.js";
import { Computer } from "../objects/computer.js";
import { HorizontalDoor } from "../objects/horizontal-door.js";
import { VerticalDoor } from "../objects/vertical-door.js";

export class PlayerUI extends Phaser.Scene {
    constructor() {
        super("PlayerUI");

        this.zoom = 0.2;
    }

    /**
     * preload
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        scene.load.spritesheet("ui.health-bar", "./assets/ui/health-bar.png", { frameWidth: 243, frameHeight: 35 });
        scene.load.spritesheet("ui.minimap", "./assets/ui/minimap.png", { frameWidth: 200, frameHeight: 200 });
        scene.load.image("ui.chat", "./assets/ui/chat.png");
    }

    create() {
        // you die
        this.udie = this.add.text(this.scale.width / 2, this.scale.height / 2, "YOU DIE !", {
            fontFamily: GameConfig["font-family"],
            fontSize: 72,
            color: "snow",
            stroke: "crimson",
            strokeThickness: 2
        }).setVisible(false).setOrigin(0.5);

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
            .setZoom(this.zoom)
            .setMask(new Phaser.Display.Masks.BitmapMask(this,
                this.make.image({
                    x: 250,
                    y: 300,
                    key: "ui.minimap",
                    frame: 1,
                    scale: 2
                }, false))
            );


        // chat 
        const chatbox = this.add.container(this.scale.width / 2, this.scale.height - 240, [
            this.add.image(0, 0, "ui.chat"),
            this.add.text(-420, -80, "", {
                fontFamily: GameConfig["font-family"],
                fontSize: 20,
                wordWrap: {
                    width: 880
                },
                color: "snow"
            }).setOrigin(0)
        ]).setScale(2).setVisible(false);


        this.events.on("chat",
            /**
             * @param {string} msg
             */
            (msg) => {
                let timeDelay = 1000;
                chatbox.getAt(1).text = "";
                chatbox.setVisible(true);
                
                let idx = 0;
                const event = this.time.addEvent({
                    delay: 50,
                    loop: true,
                    callback: () => {
                        if (idx >= msg.length) {
                            if (timeDelay > 0) {
                                timeDelay -= 50;
                            } else {
                                chatbox.setVisible(false);
                                this.time.removeEvent(event);
                            }
                        } else {
                            chatbox.getAt(1).text += msg[idx];
                            idx++;
                        }
                    }
                });
            });
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

    minimapIgnore() {

        // RADAR TYPE
        this.minimap?.removeAll(true);
        this.minimap?.add(this.add.circle(0, 0, 4, 0x00ff00));
        this.player?.scene?.sys.displayList.each(v => {
            const vec = {
                x: v.x - this.player.x,
                y: v.y - this.player.y,
            };

            if (v instanceof Enemy && v.isAlive && !(v instanceof RedGate)) {
                this.minimap.add(this.add.circle(vec.x * this.zoom, vec.y * this.zoom, 4, 0xff0000));
            }

            if (v instanceof Computer) {
                this.minimap.add(this.add.circle(vec.x * this.zoom, vec.y * this.zoom, 4, 0x0000ff));
            }

            if (!(
                v instanceof Phaser.Tilemaps.TilemapLayer ||
                v instanceof RedGate ||
                v instanceof HorizontalDoor ||
                v instanceof VerticalDoor
            ))
                this.minicam.ignore(v);
        });
    }

    update() {
        if (this.player) {
            this.healthbar.setDisplaySize((this.player.stats.cur.hp / this.player.stats.max.hp) * 488, 70);

            if (!this.player.isAlive && this.udie.scale < 4) {
                this.udie.setVisible(true).setScale(this.udie.scale + 0.04);
            } else if (this.udie.scale >= 4) {
                this.udie.setVisible(false).setScale(1);
                this.player.scene.cameras.remove(this.minicam);
                this.scene.sleep();
            }
        }
    }
}