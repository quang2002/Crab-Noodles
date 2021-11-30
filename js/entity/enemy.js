import { Entity } from "./entity.js";

export class Enemy extends Entity {
    constructor(scene, x, y, texture, stats) {
        super(scene, x, y, texture, stats);
    }
}