import { StatsEntity } from "../stats/stats-entity.js";

export class Entity extends Phaser.Physics.Arcade.Sprite {

    //instance of all entity in scene
    static instances = [];

    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {string} texture 
     * @param {StatsEntity} stats 
     */
    constructor(scene, x, y, stats) {
        super(scene, x, y, null);

        // add this sprite to scene
        this.scene.add.existing(this);

        // add physics to this game object
        this.scene.physics.add.existing(this);

        // create stats of entity
        this.stats = {
            cur: new StatsEntity(stats),
            max: new StatsEntity(stats),
        };

        // animation
        this.animations = { idle: null, move: null, die: null };
        this.create_anims();

        // add this object to instances
        Entity.instances.push(this);
    }

    /**
     * destroy the entity from this scene
     * @param {boolean} fromScene 
     */
    destroy(fromScene) {
        super.destroy(fromScene);
        Entity.instances = Entity.instances.filter((value) => value != this);
    }

    /**
     * check if an entity is alive or not
     */
    get isAlive() {
        return (this.stats.cur.hp > 0);
    }

    /**
     * create animations for entity
     * @returns {Entity} this
     */
    create_anims() {
        return this;
    }

    movement() {
        return { x: 0, y: 0 };
    }

    update() {
        super.update();

        if (this.isAlive) {
            let vec = this.movement();

            this.setVelocity(vec.x, vec.y);

            // flip sprite
            if (vec.x > 0) {
                this.setFlipX(false);
            } else if (vec.x < 0) {
                this.setFlipX(true);
            }

            // play animation
            if (vec.x * vec.x + vec.y * vec.y > 0) {
                this.play(this.animations.move, true);
            } else {
                this.play(this.animations.idle, true);
            }
        } else {
            this.play(this.animations.die, true);
            this.setVelocity(0);
        }
    }

    /**
     * get entity's position on viewport
     */
    get vpos() {
        return {
            x: (this.x - this.scene.cameras.main.worldView.x) * this.scene.cameras.main.zoom,
            y: (this.y - this.scene.cameras.main.worldView.y) * this.scene.cameras.main.zoom
        }
    }
}