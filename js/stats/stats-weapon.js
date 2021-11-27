export class StatsWeapon {

    // base damage
    baseDMG;

    // bullet speed
    speed;

    // critical rate
    critRate;

    // critical damage
    critDamage;

    // time for burst one bullet
    burstNormalTime;

    // number of bullets per second
    fireRate;

    // number of bullet in a magazine (số lượng đạn có trong 1 băng đạn)
    ammo;

    // time for reload a new magazine (băng đạn)
    reloadTime;

    /**
     * StatsWeapons.init
     * @param {StatsWeapon} data 
     */
    constructor(data) {
        Object.assign(this, data);
    }
}