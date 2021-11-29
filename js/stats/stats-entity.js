export class StatsEntity {

    // entity speed
    speed;

    // running speed of entity
    runningSpeed;

    // hp
    hp;

    // level
    level;

    // default armor(giáp mặc định)
    armor;

    /**
     * StatsEntity.init
     * @param {StatsEntity} data 
     */
    constructor(data) {
        Object.assign(this, data);
    }
}