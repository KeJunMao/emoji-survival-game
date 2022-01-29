import WeaponType from '../../enums/WeaponType'
import Weapons from '../../enums/WeaponType'
import Enemy from '../enemy/Enemy'
import Game from '../Game'
import GameCore from '../GameCore'
import BaseWeapon from './BaseWeapon'
import { BulletGroup } from './BulletGroup'

export default class BaseBullet extends Phaser.Physics.Arcade.Sprite {
  target: any
  weapon: BaseWeapon
  isDead: boolean
  penetrating: number
  bounces: number
  isCullable: boolean
  isTeleportOnCull: boolean
  _speed: number
  pool: BulletGroup
  indexInWeapon: any
  owner: null
  objectsHit: Phaser.Physics.Arcade.Sprite[]

  constructor(
    group: BulletGroup,
    weapon: BaseWeapon,
    indexInWeapon = 0,
    frame: string | number = '',
    x: number = 0,
    y: number = 0,
    texture: string | Phaser.Textures.Texture = 'main'
  ) {
    super(group.scene, x, y, texture, frame)
    this.isDead = false
    this.owner = null
    this.penetrating = 0
    this.bounces = 0
    this.isCullable = true
    this.isTeleportOnCull = false
    this._speed = 1
    this.objectsHit = []
    this.pool = group
    this.weapon = weapon
    this.indexInWeapon = indexInWeapon
  }
  get TrueSpeed() {
    return this.weapon.PSpeed * GameCore.ProjectileSpeed * this._speed
  }
  OnTeleportOnCull() {}
  Init(x: number = -1000, y: number = -1000) {
    this.setPosition(x, y)
    this.scene.physics.add.existing(this)
    this.OnRecycle()
  }
  OnRecycle() {
    this.isDead = false
    this.objectsHit = []
    this.setActive(true)
    this.Body.enable = true
    this.penetrating = this.weapon.penetrating
    this.bounces = this.weapon.bounces
  }

  setTarget(target: any) {
    this.target = target
  }

  DeSpawn() {
    this.setActive(false)
    this.Body.enable = false
    this.pool.Return(this)
  }

  HasAlreadyHitObject(enemy: Phaser.Physics.Arcade.Sprite) {
    const isHit = this.objectsHit.indexOf(enemy) > -1
    if (!isHit) {
      this.objectsHit.push(enemy)
    }
    this.OnHasHitAnObject(enemy)
    return isHit
  }
  OnHasHitAnObject(enemy: Phaser.Physics.Arcade.Sprite) {}
  OnHasHitWall(enemy: Enemy) {
    this.DeSpawn()
  }

  AimForRandomEnemy() {
    const enemy = Phaser.Math.RND.pick(Game.Core.Enemies)
    if (enemy) {
      this.ApplyInitialVelocity(enemy)
    } else {
      this.ApplyPlayerFacingVelocity()
    }
  }
  ApplyPlayerFacingVelocity(hasAngle: boolean = true) {
    const playerLastFaceDirection = Game.Core.Player.lastFaceDirection
    playerLastFaceDirection.normalize()
    if (playerLastFaceDirection.x === 0 && playerLastFaceDirection.y === 0) {
      playerLastFaceDirection.x = 1
    }
    this.setVelocity(this.TrueSpeed * playerLastFaceDirection.x, this.TrueSpeed * playerLastFaceDirection.y)
    if (hasAngle) {
      this.setAngle(Phaser.Math.RadToDeg(this.AngleFromVelocityRadians(this.body.velocity)))
    }
  }
  ApplyInitialVelocity(enemy: Enemy, hasAngle = true) {
    const pos = new Phaser.Math.Vector2(0, 0)
    pos.x = enemy.body.position.x - Game.Core.Player.x
    pos.y = enemy.body.position.y - Game.Core.Player.y
    pos.normalize()
    this.setVelocity(pos.x * this.TrueSpeed, pos.y * this.TrueSpeed)
    if (hasAngle) {
      this.setAngle(Phaser.Math.RadToDeg(this.AngleFromVelocityRadians(this.body.velocity)))
    }
  }
  AngleFromVelocityRadians(velocity: Phaser.Math.Vector2): number {
    const right = Phaser.Math.Vector2.RIGHT
    return Math.atan2(velocity.y - right.y, velocity.x - right.x)
  }

  get Body() {
    return this.body as Phaser.Physics.Arcade.Body
  }
}
