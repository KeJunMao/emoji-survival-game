import Game from './Game'

export default class BGMan {
  timeOffset: number
  dayCycleDuration: number
  DayColor: number
  NightColor: number
  RunTimeHue: boolean
  canScroll: boolean
  scene: Phaser.Scene
  bgtile: Phaser.GameObjects.TileSprite
  constructor(scene: Phaser.Scene) {
    this.timeOffset = 0
    this.dayCycleDuration = 900
    this.DayColor = 16777215
    this.NightColor = 279790
    this.RunTimeHue = true
    this.canScroll = true
    this.scene = scene
  }
  MakeBackground(texture: string = 'bgTile') {
    this.bgtile = this.scene.add.tileSprite(
      0.5 * this.scene.renderer.width,
      0.5 * this.scene.renderer.height,
      this.scene.renderer.width,
      this.scene.renderer.height,
      texture
    )
    this.bgtile.setScrollFactor(0).setDepth(Number.NEGATIVE_INFINITY)
  }

  Update(delta: number = 0) {
    if (this.canScroll) {
      this.bgtile.tilePositionX = Game.Core.Player.x
      this.bgtile.tilePositionY = Game.Core.Player.y
    }
  }

  ToggleScrolling(canScroll: boolean) {
    this.canScroll = canScroll
  }
}
