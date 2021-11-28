export class StatsEntity {

    // entity speed
    entitySpeed;

    // running speed of entity
    entityRunningSpeed;

    // hp
    entityHP;

    // level
    entityLevel;

    // default armour(giáp mặc định)
    defaultArmour;

    /**
     * StatsWeapons.init
     * @param {StatsEntity} data 
     */
    constructor(data) {
        Object.assign(this, data);
    }
}