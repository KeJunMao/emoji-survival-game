import Game from '../Game'

export default class PlayerUI {
  hpBarOffset: Phaser.Math.Vector2
  hpBarHeight: number
  hpBarWidth: number
  scene: Phaser.Scene
  hpBar: Phaser.GameObjects.Graphics
  xpBarHeight: number
  xpBarWidth: number
  xpBar: Phaser.GameObjects.Graphics
  constructor(scene: Phaser.Scene) {
    this.hpBarOffset = new Phaser.Math.Vector2(-25, 40)
    this.hpBarHeight = 4
    this.hpBarWidth = 50
    this.xpBarHeight = 10
    this.xpBarWidth = scene.renderer.width - 50
    this.scene = scene
    this.hpBar = scene.add.graphics().setScrollFactor(0)
    this.xpBar = scene.add.graphics().setScrollFactor(0)
    this.Init()
  }
  Update() {
    this.UpdateXpBar()
    this.UpdateHpBar()
  }

  Init() {}

  UpdateXpBar() {
    this.xpBar.clear()
    const value =
      (Game.Core.Player.xp - Game.Core.LevelUpFactory.PreviousXpRequiredToLevelUp) /
      (Game.Core.LevelUpFactory.XpRequiredToLevelUp - Game.Core.LevelUpFactory.PreviousXpRequiredToLevelUp)
    // xpBar BG
    this.xpBar.fillStyle(0x000000, 1)
    this.xpBar.fillRect(4, 4, this.xpBarWidth, this.xpBarHeight)
    // value
    this.xpBar.fillStyle(0xea5a47, 1)
    this.xpBar.fillRect(4, 4, value * this.xpBarWidth, this.xpBarHeight)
  }

  UpdateHpBar() {
    this.hpBar.clear()
    const hpValue = Game.Core.Player.hp / Game.Core.Player.maxHp
    // hpBar BG
    this.hpBar.fillStyle(0x000000, 1)
    this.hpBar.fillRect(this.hpBarX, this.hpBarY, this.hpBarWidth, this.hpBarHeight)
    // value
    this.hpBar.fillStyle(0xff0000, 1)
    this.hpBar.fillRect(this.hpBarX, this.hpBarY, this.hpBarWidth * hpValue, this.hpBarHeight)
  }

  get hpBarX() {
    return 0.5 * this.scene.renderer.width + this.hpBarOffset.x
  }

  get hpBarY() {
    return 0.5 * this.scene.renderer.height + this.hpBarOffset.y
  }
}
