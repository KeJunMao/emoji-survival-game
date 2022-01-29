import Game from '../Game'
import GameCore from '../GameCore'
import BaseBullet from './BaseBullet'
import BaseWeapon from './BaseWeapon'
import { BulletGroup } from './BulletGroup'

export default class RockBullet extends BaseBullet {
  AngleTween: Phaser.Tweens.Tween
  MovementTween: Phaser.Tweens.Tween
  moveAngle: number
  ScaleTween: Phaser.Tweens.Tween
  initialVelocity: Phaser.Math.Vector2
  constructor(group: BulletGroup, weapon: BaseWeapon, indexInWeapon = 0, x: number = 0, y: number = 0) {
    super(group, weapon, indexInWeapon, 'rock_bullet.png', x, y)
    this.initialVelocity = new Phaser.Math.Vector2()
    this.moveAngle = 0
    this.setScale(GameCore.PixelScale * this.weapon.PArea)
    this.AngleTween = this.scene.tweens.add({
      targets: this,
      angle: 360,
      duration: 1000,
      ease: 'Linear',
      repeat: -1
    })
    this.MovementTween = this.scene.tweens.add({
      targets: this,
      moveAngle: Math.PI,
      duration: 1e3,
      ease: 'Linear'
    })
  }
  OnRecycle(): void {
    super.OnRecycle()
    this._speed = 2
    this.setScale(GameCore.PixelScale * this.weapon.PArea)
    const dot = Game.Core.Player.lastFaceDirection.dot(Phaser.Math.Vector2.RIGHT) < 0 ? -1 : 1
    var i = ((45 * dot) / this.weapon.PAmount) * this.indexInWeapon - 90
    this.scene.physics.velocityFromRotation(Phaser.Math.DegToRad(i), this.TrueSpeed, this.body.velocity)
    this.moveAngle = Phaser.Math.DegToRad(i)
    this.initialVelocity.x = this.body.velocity.x
    this.initialVelocity.y = Math.max(-600, this.body.velocity.y * this.weapon.PArea - 100)
    this.MovementTween = this.scene.tweens.add({
      targets: this,
      moveAngle: Phaser.Math.DegToRad(i + 180 * dot),
      duration: 1500,
      ease: 'Linear'
    })
    if (this.ScaleTween) {
      this.ScaleTween.stop()
    }

    this.ScaleTween = this.scene.tweens.add({
      targets: this,
      scale: 0,
      duration: 500,
      delay: this.weapon.PDuration * this.weapon.PArea,
      ease: 'Linear',
      onComplete: () => {
        this.DeSpawn()
      }
    })
  }
  DeSpawn() {
    super.DeSpawn()
    if (this.ScaleTween) {
      this.ScaleTween.stop()
    }
    if (this.MovementTween) {
      this.MovementTween.stop()
    }
  }
  OnHasHitAnObject(e) {
    if (!e.isDead) {
      this.penetrating--
      if (this.penetrating <= 0) {
        this.DeSpawn()
      }
    }
  }
  Update() {
    this.initialVelocity.y += 10
    this.setVelocity(this.initialVelocity.x, this.initialVelocity.y)
  }
}
