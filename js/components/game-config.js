import { StatsEntity } from "../stats/stats-entity.js";
import { StatsWeapon } from "../stats/stats-weapon.js";

export const GameConfig = {
    "volume": 1,
    "font-size": 32,
    "font-family": "pixelvn",

    "entities": {
        "boy-player": {
            "stats": new StatsEntity({
                hp: 2000,
                armor: 100,
                level: 20,
                speed: 100,
                runningSpeed: 200,
            }),
        },

        "pirate": {
            "stats": new StatsEntity({
                hp: 1000,
                armor: 100,
                level: 20,
                speed: 40,
                runningSpeed: 0,
            }),
        },
    },

    "weapons": {
        "ak-47": {
            "stats": new StatsWeapon({
                baseDMG: 100,
                critRate: 0.32,
                critDamage: 0.5,
                fireTime: 100,
                speed: 1000,
                reloadTime: 2000,
                ammo: 30,
            }),
            "texture": {
                "key": "images.ak47",
                "path": "./assets/images/ak-47.png"
            },
            "bullet": {
                "key": "images.bullet-01",
                "path": "./assets/images/bullet-01.png"
            },
        },

        "light-saber": {
            "stats": new StatsWeapon({
                baseDMG: 400,
                critRate: 0.5,
                critDamage: 0.5,
                fireTime: 400,
                speed: 30,
            }),
            "texture": {
                "key": "images.light-saber",
                "path": "./assets/images/light-saber.png"
            },
            "effect": {
                "key": "spritesheet.light-saber-effect",
                "path": "./assets/images/light-saber-effect.png",
                "anims": ["anims.light-saber-effect"]
            }
        },
    }
};