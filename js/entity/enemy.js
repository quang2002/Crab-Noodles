import { Entity } from "./entity.js";
import { Player } from "./player.js";

export class Enemy extends Entity {
    constructor(scene, x, y, stats) {
        super(scene, x, y, stats);

        if (scene?.player instanceof Player) {
            this.player = scene.player;
        }

        // heath bar for enemy
        // this.healthbar = this.scene.add.container(0, 0, [
        //     this.scene.add.rectangle(0, 0, 1, 1, 0xff0000).setOrigin(0, 0.5),
        //     this.scene.add.rectangle(0, 0, 1, 1, 0x00ff00).setOrigin(0, 0.5)
        // ]);

        this.weapon = null;
    }

    // update() {
    //     super.update();
    //     // health bar
    //     if (this.isAlive) {
    //         this.healthbar.setPosition(this.x - this.width / 2, this.y - 16);
    //         this.healthbar.getAt(0).setDisplaySize(this.width, 4);
    //         this.healthbar.getAt(1).setDisplaySize(this.width * (this.stats.cur.hp / this.stats.max.hp), 4);
    //     } else {
    //         this.healthbar.destroy();
    //     }
    // }
}