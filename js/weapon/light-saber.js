import { GameConfig } from "../components/game-config.js";
import { Enemy } from "../entity/enemy.js";
import { Entity } from "../entity/entity.js";
import { Player } from "../entity/player.js";
import { StatsWeapon } from "../stats/stats-weapon.js";
import { Melee } from "./melee.js";

export class LightSaber extends Melee {
    /**
     * light-saber.init
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {StatsWeapon} stats 
     */
    constructor(scene, x, y, stats) {
        stats = Object.assign({}, GameConfig.weapons["light-saber"].stats, stats);
        super(scene, x, y, GameConfig.weapons["light-saber"].texture.key, stats);

        //set origin for rotation
        this.setOrigin(0, 0.5);
        this.setBodySize(1, 1);

        //create animation for attacking
        this.scene.anims.create({
            key: GameConfig.weapons["light-saber"].effect.anims[0],
            frameRate: 10,
            repeat: 0,
            frames: this.anims.generateFrameNumbers(GameConfig.weapons["light-saber"].effect.key, { frames: [0, 1, 3, 4, 5] })
        });

        this.effect = this.scene.add.sprite(x, y, null).setScale(1.5).setVisible(false);
    }


    /**
    * point this weapon to point (on viewport)
    * @param {Phaser.Input.Pointer} pointer 
    * @returns {Weapon} this
    */
    pointTo(pointer) {
        this.setAngle(Math.atan2(pointer.y - this.vpos.y, pointer.x - this.vpos.x) / Math.PI * 180);
        return this;
    }


    /**
     * fire method
     */
    fire() {
        if (this.isFireable) {
            super.fire();
            Entity.instances
                .filter(value => (this.owner instanceof Player && value instanceof Enemy) || (this.owner instanceof Enemy && value instanceof Player))
                .forEach((value) => {
                    const vecx = this.x - value.x;
                    const vecy = this.y - value.y;
                    const range = 48;
                    if (vecx * vecx + vecy * vecy < range * range) {
                        value.stats.cur.hp -= this.stats.damage;
                    }
                });
        }

        this.setAngle(this.angle + this.stats.speed);

        this.effect
            .setVisible(true)
            .setPosition(this.x, this.y)
            .play(GameConfig.weapons["light-saber"].effect.anims[0], true)
            .on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                this.effect.setVisible(false);
            });
        return this;
    }

    /**
     * set position for this game object
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @param {number} w 
     * @returns {LightSaber} this
     */
    setPosition(x, y, z, w) {
        this.effect?.setPosition(x, y);
        return super.setPosition(x, y, z, w);
    }

    /**
     * load game resources
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        if (scene instanceof Phaser.Scene) {
            scene.load.image(GameConfig.weapons["light-saber"].texture.key, GameConfig.weapons["light-saber"].texture.path);
            scene.load.spritesheet(GameConfig.weapons["light-saber"].effect.key, GameConfig.weapons["light-saber"].effect.path, { frameWidth: 38, frameHeight: 38 });
        }
    }
}