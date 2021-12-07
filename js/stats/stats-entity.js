export class StatsEntity {

    speed;

    runningSpeed;

    hp;

    /**
     * StatsEntity.init
     * @param {StatsEntity} data 
     */
    constructor(data) {
        Object.assign(this, data);
    }
}