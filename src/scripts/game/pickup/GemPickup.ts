import PickupType from '../../enums/PickupType'
import Game from '../Game'
import GameCore from '../GameCore'
import BasePickup from './BasePickup'
import PickupGroup from './PickupGroup'

export default class GemPickup extends BasePickup {
  landingLocation: Phaser.Math.Vector2
  curve: Phaser.Curves.CubicBezier
  static detunes: [0, 1, 2, 4, 7, 8, 9, 11, 2, 3, 4, 6, 9, 10, 11, 13, 16, 13, 11, 10, 9, 6, 4, 2]
  static detune: 0
  constructor(group: PickupGroup, x: number, y: number, value = 0) {
    super(group, x, y, PickupType.GEM)
    this.landingLocation = new Phaser.Math.Vector2(0, 0)
    this.value = value
    this.SetValue(value)
    this.setScale(GameCore.PixelScale)
    this.setFrame(this.frameName)
    // 生成曲线函数
    var n = 2 * (Math.random() - 0.5) * Math.PI,
      a = 100,
      r = Math.cos(n),
      o = Math.sin(n),
      h = {
        x: x + r * a,
        y: y + o * a * 2
      }
    this.landingLocation.set(x + r * a, y + o * a)
    Game.Core.scene.tweens.add({
      targets: this,
      time: 1,
      duration: 500,
      ease: 'Linear'
    })
    var l = new Phaser.Math.Vector2(x, y),
      c = new Phaser.Math.Vector2(h.x, h.y),
      d = new Phaser.Math.Vector2(h.x, h.y),
      p = new Phaser.Math.Vector2(this.landingLocation.x, this.landingLocation.y)
    this.curve = new Phaser.Curves.CubicBezier(l, c, d, p)
  }
  static getDetune() {
    return 60 * GemPickup.detunes[GemPickup.detune++ % GemPickup.detunes.length]
  }
  SetValue(value: number) {
    this.value = value
    // TODO: set frame name
    switch (this.value) {
      case 1:
      case 2:
        this.frameName = 'gem_pickup.png'
        break
      case 3:
      default:
        this.frameName = 'gem_pickup.png'
    }
    this.setFrame(this.frameName)
  }
  FollowCurve() {
    const out = new Phaser.Math.Vector2(0, 0)
    this.curve.getPoint(this.time, out)
    this.setPosition(out.x, out.y)
  }
  Update() {
    super.Update()
    this.setDepth(this.y - Game.Core.Player.y - this.scene.renderer.height)
  }

  GetTaken(): void {
    Game.Core.Player.xp += this.value * Game.Core.Player.growth
    Game.Core.PlayerUI.Update()
    Game.Core.CheckForLevelUp()
    super.GetTaken()
  }
}
