import { AK47 } from "../weapon/ak47.js";

export class TestWeaponScene extends Phaser.Scene {
    constructor() {
        super("TestWeaponScene");
    }

    preload() {
        AK47.preload(this);
    }


    create() {
        new AK47(this, 100, 100, {
            fireRate: 100,
            speed: 1000
        })
    }
}