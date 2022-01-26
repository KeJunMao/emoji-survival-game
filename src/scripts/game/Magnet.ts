import Game from './Game'

export default class Magnet extends Phaser.GameObjects.Ellipse {
  radius: number
  constructor(scene, x: number, y: number) {
    super(scene, x, y)
    this.radius = 50
    this.visible = false
    this.setOrigin(0, 0)
    scene.physics.add.existing(this)
    this.setScale(Game.Core.Player.scale)
    this.Body.setCircle(this.radius, -this.radius, -this.radius)
  }
  RefreshSize() {
    this.Body.setCircle(this.radius, -this.radius, -this.radius)
  }
  get Body() {
    return this.body as Phaser.Physics.Arcade.Body
  }
  Update(delta: number) {
    this.copyPosition(Game.Core.Player)
  }
}
