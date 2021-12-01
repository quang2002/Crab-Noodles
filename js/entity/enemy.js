import { Entity } from "./entity.js";
import { Player } from "./player.js";

export class Enemy extends Entity {
    constructor(scene, x, y, stats) {
        super(scene, x, y, stats);

        if (scene?.player instanceof Player) {
            this.player = scene.player;
        }

        //heath bar for enemy
        this.healthbar = this.scene.add.container(0, 0, [
            this.scene.add.rectangle(0, 0, 1, 1, 0xff0000).setOrigin(0, 0.5),
            this.scene.add.rectangle(0, 0, 1, 1, 0x00ff00).setOrigin(0, 0.5)
        ]);
    }

    movement() {
        const vecx = this.player.x - this.x;
        const vecy = this.player.y - this.y;
        const len = Math.sqrt(vecx * vecx + vecy * vecy);

        if (200 < len && len < 400)
            return { x: vecx / len * this.stats.cur.speed, y: vecy / len * this.stats.cur.speed };
        return { x: 0, y: 0 };
    }

    update() {
        super.update();

        //health bar
        if (this.isAlive) {
            this.healthbar.setPosition(this.x - this.width / 2, this.y - 16);
            this.healthbar.getAt(0).setDisplaySize(this.width, 4);
            this.healthbar.getAt(1).setDisplaySize(this.width * (this.stats.cur.hp / this.stats.max.hp), 4);
        } else {
            this.healthbar.destroy();
        }

        //weapon fire
        if (this.isAlive) {
            this.weapon.setPosition(this.x, this.y);
            this.weapon.pointTo(this.player);

            const vecx = this.player.x - this.x;
            const vecy = this.player.y - this.y;
            const len = Math.sqrt(vecx * vecx + vecy * vecy);

            if (this.weapon.isFireable && len < 300) {
                this.weapon.fire();
            }
        } else {
            this.weapon.destroy(this.scene);
            this.body.destroy();
        }
    }
}