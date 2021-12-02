import { Entity } from "../entity/entity.js";

export class GameScene extends Phaser.Scene {

    update() {
        Entity.instances.forEach(e => e.update());
    }

    createCollisionOnLayer(layer) {
        const walls = this.physics.add.group();
        layer.layer.data.forEach(row => {
            row.forEach(col => {
                col?.getCollisionGroup()?.objects.forEach(e => {
                    walls.add(this.physics.add.sprite(col.pixelX + e.x + layer.x - col.width / 2, col.pixelY + e.y + layer.y - col.height / 2, null)
                        .setOrigin(0, 0)
                        .setSize(e.width, e.height)
                        .setPushable(false)
                        .setImmovable()
                        .setOffset(layer.layer.baseTileWidth / 2, layer.layer.baseTileHeight / 2)
                        .setVisible(false)
                        .setActive(true)
                    );
                });
            });
        });

        return walls;
    }
}