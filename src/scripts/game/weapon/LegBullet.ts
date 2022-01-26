import WeaponType from '../../enums/WeaponType'
import Game from '../Game'
import GameCore from '../GameCore'
import BaseBullet from './BaseBullet'
import BaseWeapon from './BaseWeapon'
import { BulletGroup } from './BulletGroup'

export default class LegBullet extends BaseBullet {
  previousArea: number
  tween: Phaser.Tweens.Tween
  tween2: Phaser.Tweens.Tween
  constructor(group: BulletGroup, weapon: BaseWeapon, indexInWeapon = 0, x: number = 0, y: number = 0) {
    super(group, weapon, indexInWeapon, 'leg_bullet.png', x, y)
    this.previousArea = 0
  }
  Init(x = -1e3, y = -1e3) {
    super.Init(x, y)
    this.setScale(0)
    this.previousArea = this.weapon.PArea
    this.tween = this.scene.tweens.add({
      targets: this,
      scale: GameCore.PixelScale * this.weapon.PArea,
      duration: 100,
      ease: 'Linear'
    })
  }
  OnRecycle() {
    super.OnRecycle()
    this.alpha = 1
    if (this.tween) {
      if (this.previousArea !== this.weapon.PArea) {
        this.tween.stop()
        this.scene.tweens.remove(this.tween)
        this.setScale(0)
        this.tween = this.scene.tweens.add({
          targets: this,
          scale: GameCore.PixelScale * this.weapon.PArea,
          duration: 100,
          ease: 'Linear'
        })
      }
      this.tween.restart()
    }
    if (this.tween2) {
      this.tween2.restart()
    } else {
      this.tween2 = this.scene.tweens.add({
        targets: this,
        alpha: 0,
        duration: 100,
        ease: 'Linear',
        delay: 100,
        onComplete: () => {
          this.DeSpawn()
        }
      })
    }
    const t = Game.Core.Player.flipX ? this.indexInWeapon % 2 !== 1 : this.indexInWeapon % 2 === 1
    this.x += t ? -64 : 64
    // this.y += 50
    // this.y -= 16 * this.indexInWeapon
    // this.setOrigin(0, 0)
    this.setFlipY(this.indexInWeapon % 2 == 1)
    this.setFlipX(t)
  }
}
