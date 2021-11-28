import { StatsEntity } from "../stats/stats-entity.js";
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
            "get": this.scene.cameras.getCamera(""),
            "zoom": 4,
            "zoomSpeed": 2,
            "currentZoom": 3,
            "smoothSpeed": 0.07,
            "zoomRange": { min: 1.5, max: 4 },

            "dummy": this.scene.physics.add.sprite(x, y, null).setVisible(false).setBodySize(1, 1),
            "followSpeed": 2
        };

        this.cameras.get.startFollow(this.cameras.dummy);

        this.scene.input.addListener(Phaser.Input.Events.POINTER_WHEEL, ({ deltaY }) => {
            this.cameras.zoom -= this.cameras.zoomSpeed * deltaY * 0.001;
            if (this.cameras.zoom < this.cameras.zoomRange.min) this.cameras.zoom = this.cameras.zoomRange.min;
            if (this.cameras.zoom > this.cameras.zoomRange.max) this.cameras.zoom = this.cameras.zoomRange.max;
        });
    }

    update() {
        super.update();

        // smooth camera for player
        if (Math.abs(this.cameras.dummy.x - this.x) + Math.abs(this.cameras.dummy.y - this.y) > 0.1) {
            this.cameras.dummy.setVelocity(-(this.cameras.dummy.x - this.x) * this.cameras.followSpeed, -(this.cameras.dummy.y - this.y) * this.cameras.followSpeed);
        }

        if (Math.abs(this.cameras.currentZoom - this.cameras.zoom) > 0.1)
            this.cameras.currentZoom += (this.cameras.zoom - this.cameras.currentZoom) * this.cameras.smoothSpeed;

        this.cameras.get.setZoom(this.cameras.currentZoom);
    }
}