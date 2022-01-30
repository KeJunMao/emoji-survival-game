import GameCore from '../GameCore'
import DamageNumberGroup from './DamageNumberGroup'

export default class DamageNumber extends Phaser.GameObjects.Text {
  isCullable: boolean
  isTeleportOnCull: boolean
  owner: null
  pool: DamageNumberGroup
  tween2: Phaser.Tweens.Tween
  tween1: Phaser.Tweens.Tween
  constructor(group: DamageNumberGroup, x: number, y: number) {
    super(group.scene, x, y, '', { stroke: '#fff', strokeThickness: 1 })
    this.isCullable = true
    this.isTeleportOnCull = !1
    this.owner = null
    this.pool = group
    this.tween2 = this.scene.tweens.add({
      targets: this,
      alpha: 0,
      scale: GameCore.PixelScale,
      duration: 400,
      paused: !0,
      onComplete: () => {
        this.DeSpawn()
      }
    })
    this.scene.add.existing(this)
  }
  OnTeleportOnCull() {}
  Init() {
    this.setDepth(GameCore.ZDamageNumber)
    this.setOrigin(0.5, 1)
  }
  OnRecycle(x: number, y: number, PPower: number) {
    const random = Math.random() - 0.5
    const damage = 10 * (PPower + random)
    this.visible = damage >= 1
    this.setAlpha(1)
    this.setScale(GameCore.PixelScale)
    this.setPosition(x + 32 * random, y - 16)
    this.setText(damage.toFixed())
    this.setColor(
      `#${Phaser.Display.Color.GetColor((PPower / 24) * 128, (PPower / 10) * 255, (PPower / 6) * 128).toString(16)}`
    )
    if (PPower >= 10) {
      this.setColor('#ffff00')
    } else if (PPower >= 6) {
      const color = Phaser.Display.Color.GetColor(255, (PPower / 10) * 255, 128).toString(16)
      this.setColor(`#${color}`)
    } else if (PPower >= 3) {
      const color = Phaser.Display.Color.GetColor(255, (PPower / 10) * 255, (PPower / 6) * 128).toString(16)
      this.setColor(`#${color}`)
    }
    if (this.tween1) {
      this.tween1.stop()
    }
    this.tween1 = this.scene.tweens.add({
      targets: this,
      y: this.y - 12 * Math.random(),
      scale: 2 * GameCore.PixelScale,
      duration: 200,
      onComplete: () => {
        this.tween2.resume()
        this.tween2.restart()
      }
    })
  }
  DeSpawn() {
    this.pool.Return(this)
  }
}
