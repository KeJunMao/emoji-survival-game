import Enemy from '../enemy/Enemy'
import Game from '../Game'
import GameCore from '../GameCore'
import BaseBullet from './BaseBullet'
import BaseWeapon from './BaseWeapon'
import { BulletGroup } from './BulletGroup'

export default class BoneBullet extends BaseBullet {
  bouncePositions: never[]
  save_vel_x: number
  save_vel_y: number
  ScaleTween: Phaser.Tweens.Tween
  AngleTween: Phaser.Tweens.Tween
  constructor(group: BulletGroup, weapon: BaseWeapon, indexInWeapon = 0, x: number = 0, y: number = 0) {
    super(group, weapon, indexInWeapon, 'bone_bullet.png', x, y)
    this.bouncePositions = []
    this.save_vel_x = 0
    this.save_vel_y = 0
    this.scene.physics.world.on('worldbounds', this.Bounce, this)
    this.AngleTween = this.scene.tweens.add({
      targets: this,
      angle: 360,
      duration: 1000,
      ease: 'Linear',
      repeat: -1
    })
  }
  OnRecycle() {
    super.OnRecycle()
    this.Body.setCircle(16)
    this.setScale(0.8 * GameCore.PixelScale * this.weapon.PArea)
    this.setBounce(1, 1)
    this.isCullable = false
    this.setCollideWorldBounds(true, 1, 1)
    this.Body.setBoundsRectangle(Game.Core.Player.WorldBoxCollider)
    this.Body.onWorldBounds = true
    this.AimForRandomEnemy()
    this.setAngle(360 * Math.random())
    if (this.ScaleTween) {
      this.ScaleTween.stop()
    }
    this.ScaleTween = this.scene.tweens.add({
      targets: this,
      scale: 0,
      duration: 500,
      delay: this.weapon.PDuration,
      ease: 'Linear',
      onComplete: () => {
        this.DeSpawn()
      }
    })
  }
  Bounce(body) {
    if (this.body === body) {
      this.objectsHit = []
    }
  }
  OnHasHitAnObject(enemy: Enemy) {
    if (!enemy.isDead) {
      this.setVelocity(-1 * this.body.velocity.x, -1 * this.body.velocity.y)
      this.objectsHit = []
    }
  }
  // OnHasHitWall(enemy: Enemy) {
  //   // this.save_vel_x *=  1
  //   // this.save_vel_y *=  1
  //   console.log('onHasHitWall')
  //   this.setVelocity(this.save_vel_x, this.save_vel_y)
  //   this.objectsHit = []
  // }
  Update() {
    this.save_vel_x = 0 == this.body.velocity.x ? this.save_vel_x : this.body.velocity.x
    this.save_vel_y = 0 == this.body.velocity.y ? this.save_vel_y : this.body.velocity.y
  }
  DeSpawn() {
    this.isCullable = true
    // Game.Core.scene.time.removeEvent(this.ExpireTimer)
    super.DeSpawn()
  }
}
