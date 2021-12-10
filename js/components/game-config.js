import { MenuScene } from "../scenes/menu.js";
import { StatsEntity } from "../stats/stats-entity.js";
import { StatsWeapon } from "../stats/stats-weapon.js";

export const GameConfig = {
    "volume": 1,
    "font-size": 32,
    "font-family": "pixelvn",
    "player_type": null,
    "scene_before_chooseplayer": MenuScene,

    "entities": {
        "boy_player": new StatsEntity({
            hp: 3000,
            speed: 130,
            runningSpeed: 240,
        }),

        "girl_player": new StatsEntity({
            hp: 4000,
            speed: 100,
            runningSpeed: 200,
        }),

        "pirate": new StatsEntity({
            hp: 600,
            speed: 40,
            runningSpeed: 0,
        }),
        "ghost": new StatsEntity({
            hp: 1000,
            speed: 60,
            runningSpeed: 80
        }),

        "endurance": new StatsEntity({
            hp: 800,
            speed: 100,
            runningSpeed: 100
        }),

        "robot": new StatsEntity({
            hp: 5000,
            speed: 120,
            runningSpeed: 120,
        }),

        "red_gate": new StatsEntity({
            hp: 10000
        }),

        "boss_lam": new StatsEntity({
            hp: 50000,
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

        "punch": new StatsWeapon({
            baseDMG: 100,
            critRate: 0.5,
            critDamage: 0.5,
            fireTime: 300,
        }),

        "xuan_yuan_sword": new StatsWeapon({
            baseDMG: 70,
            critRate: 0.5,
            critDamage: 0.5,
            fireTime: 350,
            speed: 250
        }),

        "boom": new StatsWeapon({
            baseDMG: 500,
            critRate: 0.01,
            critDamage: 0.5,
        }),

        "energy_gun": new StatsWeapon({
            baseDMG: 250,
            critRate: 0.4,
            critDamage: 0.7,
            fireTime: 200,
            speed: 500,
        }),
    },
};