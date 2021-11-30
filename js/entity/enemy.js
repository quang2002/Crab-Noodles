import { Entity } from "./entity.js";
import { Player } from "./player.js";

export class Enemy extends Entity {
    constructor(scene, x, y, stats, player) {
        super(scene, x, y, stats);

        if (player instanceof Player) {
            this.player = player;
        }
    }
}