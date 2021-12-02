import { StatsEntity } from "../stats/stats-entity.js";
import { StatsWeapon } from "../stats/stats-weapon.js";

export const GameConfig = {
    "volume": 1,
    "font-size": 32,
    "font-family": "pixelvn",

    "entities": {
        "boy-player": new StatsEntity({
            hp: 2000,
            speed: 100,
            runningSpeed: 200,
        }),


        "pirate": new StatsEntity({
            hp: 1000,
            speed: 40,
            runningSpeed: 0,
        }),

        "red-gate": new StatsEntity({
            hp: 10000
        }),
    },

    "weapons": {
        "ak-47": new StatsWeapon({
            baseDMG: 200,
            critRate: 0.32,
            critDamage: 0.5,
            fireTime: 100,
            speed: 1000,
            reloadTime: 2000,
            ammo: 30,
        }),

        "light-saber": new StatsWeapon({
            baseDMG: 200,
            critRate: 0.5,
            critDamage: 0.5,
            fireTime: 250,
            speed: 30,
        }),

        "monster-spawner": new StatsWeapon({
            fireTime: 1000,
            ammo: 10,
        }),
    },
};