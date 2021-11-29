import { StatsEntity } from "../stats/stats-entity.js";
import { Weapon } from "../weapon/weapon.js";
import { Entity } from "./entity.js";

export class Player extends Entity {

    /**
     * constructor
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {String} texture 
     * @param {StatsEntity} stats 
     */
    constructor(scene, x, y, texture, stats) {
        super(scene, x, y, texture, stats);

        // camera for player
        this.cameras = {
            "main": this.scene.cameras.main,
            "zoom": 4,
            "zoomSpeed": 2,
            "currentZoom": 3,
            "smoothSpeed": 0.07,
            "zoomRange": { min: 1.5, max: 4 },

            "dummy": this.scene.physics.add.sprite(x, y, null).setVisible(false).setBodySize(1, 1),
            "followSpeed": 2
        };

        this.cameras.main.startFollow(this.cameras.dummy);

        this.scene.input.addListener(Phaser.Input.Events.POINTER_WHEEL, ({ deltaY }) => {
            this.cameras.zoom -= this.cameras.zoomSpeed * deltaY * 0.001;
            if (this.cameras.zoom < this.cameras.zoomRange.min) this.cameras.zoom = this.cameras.zoomRange.min;
            if (this.cameras.zoom > this.cameras.zoomRange.max) this.cameras.zoom = this.cameras.zoomRange.max;
        });

        //add key control
        this.controller = {
            "up": this.scene.input.keyboard.addKey("W", true, true),
            "down": this.scene.input.keyboard.addKey("S", true, true),
            "right": this.scene.input.keyboard.addKey("D", true, true),
            "left": this.scene.input.keyboard.addKey("A", true, true),
            "run": this.scene.input.keyboard.addKey("J", true, true)
        }

        // weapon
        this.weapon = null;
    }

    getVelocity() {
        let vec = {
            x: 0,
            y: 0,
            mul(value) {
                this.x *= value;
                this.y *= value;
            }
        };

        if (this.controller.up.isDown) vec.y -= 1;
        if (this.controller.down.isDown) vec.y += 1;
        if (this.controller.left.isDown) vec.x -= 1;
        if (this.controller.right.isDown) vec.x += 1;

        //running
        if (this.controller.run.isDown) {
            vec.mul(this.stats.runningSpeed);
        } else {
            //normal walk
            vec.mul(this.stats.speed);
        }

        return vec
    }

    setWeapon(weapon) {
        if (weapon instanceof Weapon) {
            this.weapon = weapon;
        }
        return this;
    }

    update() {
        super.update();

        // set weapon position
        //this.weapon?.setPosition(this.x + 8, this.y + 6);

        // smooth camera for player
        if (Math.abs(this.cameras.dummy.x - this.x) + Math.abs(this.cameras.dummy.y - this.y) > 0.1) {
            this.cameras.dummy.setVelocity(-(this.cameras.dummy.x - this.x) * this.cameras.followSpeed, -(this.cameras.dummy.y - this.y) * this.cameras.followSpeed);
        }

        if (Math.abs(this.cameras.currentZoom - this.cameras.zoom) > 0.1)
            this.cameras.currentZoom += (this.cameras.zoom - this.cameras.currentZoom) * this.cameras.smoothSpeed;

        this.cameras.main.setZoom(this.cameras.currentZoom);
    }
}