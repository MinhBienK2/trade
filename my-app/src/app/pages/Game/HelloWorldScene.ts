import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene {
    constructor() {
        super('helloworld')
    }

    preload ()
    {
        this.load.setBaseURL('https://labs.phaser.io')

        this.load.image('logo', 'assets/sprites/a.png')
    }

    create ()
    {
        const logo = this.physics.add.image(100, 100, 'logo').setInteractive().setCollideWorldBounds();
        this.input
            .on('pointerdown', (pointer: Phaser.Input.Pointer,
                                objectsClicked: Phaser.GameObjects.GameObject[]) => {
                console.log(objectsClicked);
                var target = new Phaser.Math.Vector2();
                target.x = pointer.x;
                target.y = pointer.y;
                this.physics.moveToObject(logo, {target}, 1);
            });
    }

    update ()
    {

    }
}