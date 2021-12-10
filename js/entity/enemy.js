import { Entity } from "./entity.js";
import { Player } from "./player.js";

export class Enemy extends Entity {
    constructor(scene, x, y, stats) {
        super(scene, x, y, stats);

        if (scene?.player instanceof Player) {
            this.player = scene.player;
        }

        

        this.weapon = null;
    }
}