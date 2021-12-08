import { StatsEntity } from "../stats/stats-entity.js";
import { StatsWeapon } from "../stats/stats-weapon.js";

export const GameConfig = {
    "volume": 1,
    "font-size": 32,
    "font-family": "pixelvn",
    "player-type": null,

    "entities": {
        "boy_player": new StatsEntity({
            hp: 2000,
            speed: 100,
            runningSpeed: 200,
        }),

        "girl_player": new StatsEntity({
            hp: 2000 * 1.25,
            speed: 100,
            runningSpeed: 200,
        }),

        "pirate": new StatsEntity({
            hp: 1000,
            speed: 40,
            runningSpeed: 0,
        }),
        "ghost": new StatsEntity({
            hp: 1500,
            speed: 50,
            runningSpeed: 80
        }),

        "robot": new StatsEntity({
            hp: 5000,
            speed: 80,
            runningSpeed: 0,
        }),

        "red_gate": new StatsEntity({
            hp: 10000
        }),
    },

    "weapons": {
        "ak_47": new StatsWeapon({
            baseDMG: 100,
            critRate: 0.32,
            critDamage: 0.5,
            fireTime: 100,
            speed: 1000,
            reloadTime: 2000,
            ammo: 30,
        }),

        "pistol": new StatsWeapon({
            baseDMG: 80,
            critRate: 0.32,
            critDamage: 0.5,
            fireTime: 200,
            speed: 500,
            reloadTime: 2000,
            ammo: 20,
        }),

        "rocket": new StatsWeapon({
            baseDMG: 300,
            critRate: 0.5,
            critDamage: 0.5,
            fireTime: 250,
            speed: 300,
            reloadTime: 2000,
            ammo: 20,
        }),

        "light_saber": new StatsWeapon({
            baseDMG: 200,
            critRate: 0.5,
            critDamage: 0.5,
            fireTime: 250,
            speed: 30,
        }),

        "monster_spawner": new StatsWeapon({
            fireTime: 1000,
            ammo: 10,
        }),

        "xuan_yuan_sword": new StatsWeapon({
            baseDMG: 200,
            critRate: 0.5,
            critDamage: 0.5,
            fireTime: 350,
            speed: 200
        })
    },
};