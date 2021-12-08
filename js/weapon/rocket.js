import { GameConfig } from '../components/game-config.js';
import { StatsWeapon } from '../stats/stats-weapon.js';
import { Gun } from './gun.js';
import { Enemy } from '../entity/enemy.js';
import { Player } from '../entity/player.js';
import { Entity } from "../entity/entity.js";

export class Rocket extends Gun {
    /**
     * rocket.init
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {StatsWeapon} stats 
     */
    constructor(scene, x, y, stats) {
        stats = Object.assign({}, GameConfig.weapons["rocket"], stats);
        super(scene, x, y, "images.rocket", "images.bullet-rocket", stats);

        this.anims.create({
            key: "bullet-anims",
            frameRate: 10,
            repeat: 1,
            frames: this.anims.generateFrameNames("sprite.bullet-animation", {
                start: 0,
                end: 7
            })
        })

    }

    fire() {
        var bullet = this.scene.physics.add.sprite(this.x, this.y, "images.bullet-rocket").setScale(1.5).setVisible(true);
        super.fire(bullet);
        console.log(bullet);
        
        // set collide with
        
        this.scene.physics.add.overlap(bullet, this.collision, (o1, o2) => {
            const bulletAnims = this.scene.physics.add.sprite(o1.x, o1.y, "sprite.bullet-animation");
            if ((this.owner instanceof Player && o2 instanceof Enemy) || (this.owner instanceof Enemy && o2 instanceof Player)) {
                if (o2 instanceof Entity && o2.isAlive) {
                    // o2.take_damage(this.stats.damage);
                    bulletAnims.play("bullet-anims", true).on(
                        "animationcomplete", () => {
                            bulletAnims.destroy();
                        }
                    );
                }
                o1.destroy();
            }

            if (!(o2 instanceof Entity))
                bulletAnims.play("bullet-anims", true).on(
                    "animationcomplete", () => {
                        bulletAnims.destroy();
                    }
                );
            o1.destroy();
        });
    }

    /**
     * load game resources
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        if (scene instanceof Phaser.Scene) {
            scene.load.image("images.rocket", "./assets/images/weapon/guns/rocket/rocket.png");
            scene.load.image("images.bullet-rocket", "./assets/images/weapon/guns/rocket/rocket-bullet.png");
            scene.load.spritesheet("sprite.bullet-animation", "./assets/images/weapon/guns/rocket/rocket-bullet-anims.png", {
                frameHeight: 32,
                frameWidth: 34
            });
        }
    }
}