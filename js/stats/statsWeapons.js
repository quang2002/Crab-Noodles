export class StatsWeapons {

    //number
    normalDamage;

    //bulletspeed tốc độ bay của đạn
    bulletSpeed;

    //percentage of critical damage
    critRate;

    //critical damage
    critDamage;

    //time for burst one bullet
    burstNormalTime;

    //increase or decrease play speed
    speed;

    //number of bullet in a magazine (số lượng đạn có trong 1 băng đạn)
    bulletNumberInMagazine;

    //time for reload a new magazine (băng đạn)
    reloadMagazineTime;

    //xuyên giáp
    armorPenetration;

    constructor({ normalDamage, bulletSpeed, critRate, critDamage, burstNormalTime, speed, bulletNumberInMagazine, reloadMagazineTime, armorPenetration }) {
        Object.assign(this, { normalDamage, bulletSpeed, critRate, critDamage, burstNormalTime, speed, bulletNumberInMagazine, reloadMagazineTime, armorPenetration });
    }

}