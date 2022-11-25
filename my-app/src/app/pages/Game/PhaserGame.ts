import Phaser from 'phaser'

import HelloWorldScene from './HelloWorldScene'

export function config(): Phaser.Types.Core.GameConfig {
    return ({
            type: Phaser.AUTO,
            backgroundColor: '#282c34',
            scale: {
                mode: Phaser.Scale.ScaleModes.NONE,
                width: 900,
                height: 300,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 100 },
                    debug: true
                }
            },
            scene: [HelloWorldScene],
        }
    );
}
