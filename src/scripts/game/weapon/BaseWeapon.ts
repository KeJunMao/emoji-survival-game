import WEAPONS from '../../consts/WEAPONS'
import HitVFXType from '../../enums/HitVFXType'
import Weapons from '../../enums/WeaponType'
import Enemy from '../enemy/Enemy'
import Game from '../Game'
import Stage from '../Stage'
import BaseBullet from './BaseBullet'
import { BulletGroup } from './BulletGroup'

export default class BaseWeapon {
  level: number
  bulletType: Weapons
  interval: number
  repeatInterval: number
  power: number
  area: number
  speed: number
  amount: number
  duration: number
  intervalDependsOnDuration: boolean
  charges: number
  seen: boolean
  addWeapon: null
  isPowerUp: boolean
  hitBoxDelay: number
  knockback: number
  hitsWalls: boolean
  penetrating: number
  bounces: number
  firingTimer: Phaser.Time.TimerEvent
  pool: BulletGroup
  target: any
  lastShotTimer: Phaser.Time.TimerEvent
  hitVFX: HitVFXType
  constructor(bulletType: Weapons, isNewWeapon: boolean = true) {
    this.level = 0
    this.interval = 1e3
    this.repeatInterval = 1000
    this.power = 1
    this.area = 1
    this.speed = 1
    this.amount = 1
    this.duration = 1e3
    this.intervalDependsOnDuration = false
    this.charges = 0
    this.seen = false
    this.addWeapon = null
    this.isPowerUp = false
    this.hitBoxDelay = 1e3
    this.hitVFX = HitVFXType.DEFAULT
    this.knockback = 5
    this.hitsWalls = false
    this.penetrating = 1
    this.bounces = 0
    this.bulletType = bulletType

    if (isNewWeapon) {
      this.pool = new BulletGroup(Game.Core.scene, this.bulletType)
      this.MakeLevelOne()
      this.OnStart()
    }
  }
  get PArea() {
    return Game.Core.Player.area * this.area
  }
  get PAmount() {
    return Game.Core.Player.amount + this.amount
  }
  get PPower() {
    return Game.Core.Player.power * this.power
  }
  get PSpeed() {
    return Game.Core.Player.speed * this.speed
  }
  get PInterval() {
    return Math.max(0.1, Game.Core.Player.cooldown) * this.interval
  }
  get PDuration() {
    return Game.Core.Player.duration * this.duration
  }
  ActiveBulletCount() {
    return this.pool ? this.pool.countActive(true) : 0
  }
  OnStart() {
    this.ResetFiringTimer()
    Game.Core.scene.physics.add.overlap(this.pool, Game.Core.Enemies, this.onBulletOverlapsEnemy.bind(this))
    Game.Core.scene.physics.add.overlap(this.pool, Game.Core.Destructibles, this.onBulletOverlapsDestuctible.bind(this))
    // if (this.hitsWalls && Game.Core.Stage.hasTileset) {
    //   Game.Core.scene.physics.add.collider(this.pool, Stage.WallLayer, this.onBulletOverlapsWall.bind(this))
    //   Game.Core.scene.physics.add.collider(this.pool, Stage.ObstacleLayer, this.onBulletOverlapsWall.bind(this))
    // }
  }
  onBulletOverlapsEnemy(object1: Phaser.GameObjects.GameObject, object2: Phaser.GameObjects.GameObject) {
    const bullet = object1 as unknown as BaseBullet
    const enemy = object2 as Enemy
    if (!enemy.isDead) {
      bullet.HasAlreadyHitObject(enemy)
      enemy.GetDamaged(this.PPower, this.hitVFX, this.knockback)
    }
  }
  onBulletOverlapsWall() {}
  onBulletOverlapsDestuctible() {}
  ResetFiringTimer() {
    if (this.firingTimer) {
      this.firingTimer.destroy()
    }
    const delay = this.intervalDependsOnDuration ? this.duration + this.PInterval : this.PInterval
    this.firingTimer = Game.Core.scene.time.addEvent({
      delay,
      loop: !0,
      callback: this.Fire.bind(this)
    })
  }
  MakeLevelOne() {
    this.level = 0
    const weaponData = WEAPONS[this.bulletType][this.level]
    for (const key in weaponData) {
      if (this.hasOwnProperty(key)) {
        this[key] = weaponData[key]
      }
    }
    if (weaponData.evolvesFrom) {
      Game.Core.RemoveWeapon(weaponData.evolvesFrom)
    }
  }
  DPS() {
    return (
      (this.PPower * this.PAmount * this.penetrating * (this.duration / this.hitBoxDelay)) /
      (this.PInterval / 1e3)
    ).toFixed(2)
  }
  Update(delta: number): void {}
  CleanUp() {
    this.firingTimer && this.firingTimer.destroy()
    if (this.pool) {
      this.pool.spawned.forEach(bullet => {
        bullet.DeSpawn()
      })
    }
  }
  Fire() {
    this.FireOneBullet(Game.Core.Player.x, Game.Core.Player.y, 0, this.target)
    if (this.PAmount > 1) {
      for (let i = 1; i < this.PAmount; i++) {
        if (this.repeatInterval * i > 0) {
          this.lastShotTimer = Game.Core.scene.time.addEvent({
            delay: this.repeatInterval * i,
            loop: false,
            callback: () => {
              this.FireOneBullet(Game.Core.Player.x, Game.Core.Player.y, i, this.target)
            }
          })
        }
      }
    }
  }
  FireOneBullet(x: number, y: number, index: number, target) {
    const bullet = this.pool.SpawnAt(x, y, this, index)
    if (target) {
      bullet.setTarget(target)
    }
    return bullet
  }
}
