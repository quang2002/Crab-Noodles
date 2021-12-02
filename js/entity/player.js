import { StatsEntity } from "../stats/stats-entity.js";
import { Gun } from "../weapon/gun.js";
import { Melee } from "../weapon/melee.js";
import { Weapon } from "../weapon/weapon.js";
import { Entity } from "./entity.js";

export class Player extends Entity {

    /**
     * constructor
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {StatsEntity} stats 
     */
    constructor(scene, x, y, stats) {
        super(scene, x, y, stats);

        window.player = this;

        scene.scene.launch("PlayerUI").get("PlayerUI")?.setData({
            player: this,
        });

        // camera config
        this.cameras = {
            "zoom": 4,
            "zoomSpeed": 2,
            "currentZoom": 3,
            "smoothSpeed": 0.07,
            "zoomRange": { min: 2.25, max: 4 },

            "dummy": this.scene.physics.add.sprite(x, y, null).setVisible(false).setBodySize(1, 1),
            "followSpeed": 2
        };

        this.scene.cameras.main.startFollow(this.cameras.dummy);

        // zoom by mouse wheel
        this.scene.input.addListener(Phaser.Input.Events.POINTER_WHEEL, ({ deltaY }) => {
            this.cameras.zoom -= this.cameras.zoomSpeed * deltaY * 0.001;
            if (this.cameras.zoom < this.cameras.zoomRange.min) this.cameras.zoom = this.cameras.zoomRange.min;
            if (this.cameras.zoom > this.cameras.zoomRange.max) this.cameras.zoom = this.cameras.zoomRange.max;
        });

        //add key control
        this.controller = {
            "up": this.scene.input.keyboard.addKey("W"),
            "down": this.scene.input.keyboard.addKey("S"),
            "right": this.scene.input.keyboard.addKey("D"),
            "left": this.scene.input.keyboard.addKey("A"),
            "run": this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
            "swap-weapon": this.scene.input.keyboard.addKey("J")
        }

        // weapons
        this.weapons = {
            "pri": null,
            "sec": null,
            "idx": null,

            get active() {
                return this.idx == 0 ? this.pri : this.sec;
            }
        };

        // isplayer = true
        this.isPlayer = true;
    }
    
    /**
     * get player velocity vector
     * @returns {x: number, y: number}
     */
    movement() {
        let vec = { x: 0, y: 0 };

        const speed = this.controller.run.isDown ? this.stats.cur.runningSpeed : this.stats.cur.speed;
        const sqrt2 = 1.414213;

        if (this.controller.up.isDown) vec.y -= 1;
        if (this.controller.down.isDown) vec.y += 1;
        if (this.controller.left.isDown) vec.x -= 1;
        if (this.controller.right.isDown) vec.x += 1;

        if (vec.x * vec.x + vec.y * vec.y == 2) {
            vec.x /= sqrt2;
            vec.y /= sqrt2;
        }

        return {
            x: vec.x * speed,
            y: vec.y * speed,
        }
    }

    /**
     * set weapon for player
     * @param {Weapon} weapon 
     * @returns {Player} this
     */
    setWeapon(weapon) {

        if (weapon instanceof Gun) {
            this.weapons.pri = weapon;
            this.weapons.idx = 0;
        } else if (weapon instanceof Melee) {
            this.weapons.sec = weapon;
            this.weapons.idx = 1;
        }
        return this;
    }

    /**
     * swap between gun and melee
     * @returns {Player} this
     */
    swapWeapon() {
        this.weapons.idx = (this.weapons.idx == 0 ? 1 : 0);
        return this;
    }

    /**
     * loot an weapon from scene
     * swap to the weapon that have same type to the looted weapon then drop current weapon to scene
     * @param {Weapon} weapon 
     * @returns {Player} this
     */
    lootWeapon(weapon) {
        if (weapon instanceof Gun) {
            this.weapons.pri.setVisible(true);

            this.weapons.pri = weapon;
            this.weapons.idx = 0;
        } else if (weapon instanceof Melee) {
            this.weapons.sec.setVisible(true);

            this.weapons.sec = weapon;
            this.weapons.idx = 1;
        }
        return this;
    }


    update() {
        super.update();

        if (this.isAlive) {

            if (this.controller["swap-weapon"].isDown) {
                this.swapWeapon();
            }

            // set weapons's visibility
            this.weapons.pri?.setVisible(this.weapons.idx == 0);
            this.weapons.sec?.setVisible(this.weapons.idx == 1);

            if (this.weapons.active instanceof Gun) {
                // set weapon's position, direction
                this.weapons.active?.setPosition(this.x, this.y + 5);
                this.weapons.active?.pointTo(this.scene.input.activePointer);

                // fire
                if (this.weapons.active?.isFireable && this.scene.input.activePointer.isDown) {
                    this.weapons.active?.fire();
                }
            } else if (this.weapons.active instanceof Melee) {

                // set weapon's position, direction
                this.weapons.active?.setPosition(this.x, this.y + 5);

                // fire
                if (this.scene.input.activePointer.isDown) {
                    this.weapons.active?.fire();
                } else {
                    this.weapons.active?.pointTo(this.scene.input.activePointer);
                }
            }

        }


        // set weapon's owner
        if (this.weapons.active != null) {
            this.weapons.active.owner = this.isAlive ? this : null;
        }

        // smooth camera for player
        if (Math.abs(this.cameras.dummy.x - this.x) + Math.abs(this.cameras.dummy.y - this.y) > 0.1) {
            this.cameras.dummy.setVelocity(-(this.cameras.dummy.x - this.x) * this.cameras.followSpeed, -(this.cameras.dummy.y - this.y) * this.cameras.followSpeed);
        }

        if (Math.abs(this.cameras.currentZoom - this.cameras.zoom) > 0.1)
            this.cameras.currentZoom += (this.cameras.zoom - this.cameras.currentZoom) * this.cameras.smoothSpeed;

        this.scene.cameras.main.setZoom(this.cameras.currentZoom);
    }
}