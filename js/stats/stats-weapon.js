export class StatsWeapon {

    // base damage
    baseDMG;

    // bullet speed
    speed;

    // critical rate
    critRate;

    // critical damage (% more)
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
        const iscrit = Math.random() < this.critRate;
        if (iscrit) result *= (1 + this.critDamage);
        return {
            get value() {
                return result;  
            },

            get crit() {
                return iscrit;
            }
        };
    }
}