import { StatsEntity } from "../stats/stats-entity.js";

export class Entity extends Phaser.GameObjects.Sprite {

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
    constructor(scene, x, y, texture, stats) {
        super(scene, x, y, texture);
        this.texture = texture;

        //add this sprite to scene
        this.scene.add.existing(this);

        //add this = this sprite

        //add physics to this game object
        this.scene.physics.add.existing(this);

        //create stats of entity
        this.stats = new StatsEntity(stats);

        //add this object to instance
        Entity.instances.push(this);

        //animation
        this.animations = { idle: null, move: null, die: null };
        this.create_anims();

        //add key control
        this.controller = {
            "up": this.scene.input.keyboard.addKey("W", true, true),
            "down": this.scene.input.keyboard.addKey("S", true, true),
            "right": this.scene.input.keyboard.addKey("D", true, true),
            "left": this.scene.input.keyboard.addKey("A", true, true),
            "run": this.scene.input.keyboard.addKey("J", true, true)
        }

        //Phaser.Input.Keyboard.KeyCodes.SPACE;

        //add collide with wall

    }

    get isRunAble() {

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
     * if hp > 0 -> true, false otherwise
     */
    get isAlive() {
        return (this.stats.entityHP > 0);
    }

    //create animation for entity
    create_anims() {
        return this;
    }

    update(param) {
        super.update(param);

        if (this.isAlive) {
            //movement
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
                vec.mul(this.stats.entityRunningSpeed);
            } else {
                //normal walk
                vec.mul(this.stats.entitySpeed);
            }

            //set velocity
            this.body.setVelocity(vec.x, vec.y);

            //play animation
            if (vec.x * vec.x + vec.y * vec.y > 0) {
                this.play(this.animations.move, true);
            } else {
                this.play(this.animations.idle, true);
            }
        } else {
            this.play(this.animations.die, true);
        }
    }
}