export class StatsWeapon {

    // base damage
    baseDMG;

    // bullet speed
    speed;

    // critical rate
    critRate;

    // critical damage
    critDamage;

    // cooldown time between two shots
    fireTime;

    // number of bullets
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


    /**
     * calculate weapon DMG
     */
    get damage() {
        let result = this.baseDMG;
        const rate = Math.random() % 100;
        if (rate < this.critRate) result *= (1 + this.critDamage);
        return result;
    }
}