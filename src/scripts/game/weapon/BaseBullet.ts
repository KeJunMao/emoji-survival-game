import WeaponType from '../../enums/WeaponType'
import Weapons from '../../enums/WeaponType'
import Enemy from '../enemy/Enemy'
import GameCore from '../GameCore'
import BaseWeapon from './BaseWeapon'
import { BulletGroup } from './BulletGroup'

export default class BaseBullet extends Phaser.GameObjects.Sprite {
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
  objectsHit: Enemy[]

  constructor(
    group: BulletGroup,
    weapon: BaseWeapon,
    indexInWeapon = 0,
    frame: string | number = Weapons.LEG,
    x: number = 0,
    y: number = 0,
    texture: string | Phaser.Textures.Texture = 'main',
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
  Init(x: number = -1e3, y: number = -1e3) {
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

  HasAlreadyHitObject(enemy: Enemy) {
    const isHit = this.objectsHit.indexOf(enemy) > -1
    if (!isHit) {
      this.objectsHit.push(enemy)
    }
    this.OnHasHitAnObject(enemy)
    return isHit
  }
  OnHasHitAnObject(enemy: Enemy) {}
  OnHasHitWall(e) {
    this.DeSpawn()
  }

  get Body() {
    return this.body as Phaser.Physics.Arcade.Body
  }
}
