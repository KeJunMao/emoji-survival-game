// import EmojiPlayer from '../objects/emoji'
// import { WeaponPlugin } from 'phaser3-weapon-plugin'
// import TestWeapon from '../objects/testWeapon'

// export default class TestScene extends Phaser.Scene {
//   bgtile: Phaser.GameObjects.TileSprite
//   player: EmojiPlayer
//   cursors: Phaser.Types.Input.Keyboard.CursorKeys
//   weapon: TestWeapon
//   constructor() {
//     super({ key: 'TestScene' })
//   }
//   preload() {
//     this.load.image('tiles', 'assets/img/bgTile.png')
//     this.load.image('player', 'assets/img/player.png')
//     this.load.image('bullet', 'assets/img/bullet.png')
//   }

//   create() {
//     this.plugins.installScenePlugin('WeaponPlugin', WeaponPlugin, 'weapons', this, true)

//     this.bgtile = this.add.tileSprite(
//       this.renderer.width / 2,
//       this.renderer.height / 2,
//       this.renderer.width,
//       this.renderer.height,
//       'tiles'
//     )
//     this.bgtile.setScale(1).setScrollFactor(0).setDepth(Number.NEGATIVE_INFINITY)
//     this.player = new EmojiPlayer(this, this.renderer.width / 2, this.renderer.height / 2)
//     this.cameras.main.startFollow(this.player)

//     this.weapon = new TestWeapon(this, this.player)

//     this.cursors = this.input.keyboard.createCursorKeys()
//   }
//   update(time: number, delta: number): void {
//     const body = this.player.body as Phaser.Physics.Arcade.Body
//     this.player.update(time, delta)
//     body.setVelocity(0)
//     if (this.cursors.left.isDown) {
//       body.setVelocityX(-500)
//     } else if (this.cursors.right.isDown) {
//       body.setVelocityX(500)
//     }

//     if (this.cursors.up.isDown) {
//       body.setVelocityY(-500)
//     } else if (this.cursors.down.isDown) {
//       body.setVelocityY(500)
//     }

//     this.bgtile.tilePositionY = this.player.y
//     this.bgtile.tilePositionX = this.player.x
//     this.weapon.update()
//   }
// }
