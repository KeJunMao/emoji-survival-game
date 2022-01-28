import ENEMYS from '../../consts/ENEMYS'
import EnemyType from '../../enums/EnemyType'
import Game from '../Game'
import EnemyGroup from './EnemyGroup'
import Player from '../Player'
import GameCore from '../GameCore'
import HitVFXType from '../../enums/HitVFXType'

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  hp: number
  maxHp: number
  dataMaxHp: number
  power: number
  knockback: number
  deathKB: number
  damageKB: number
  xp: number
  speed: number
  scaleMul: number
  enemyType: EnemyType
  HPxLevel: boolean
  FixedDirection: boolean
  owner: null
  isDead: boolean
  receivingDamage: boolean
  _currentDirection: Phaser.Math.Vector2
  defaultName: string
  isCullable: boolean
  IsTimeStopped: boolean
  IsFrozen: boolean
  defaultSpeed: number
  res_Freeze: number
  res_Rosary: number
  moveTweenIndex: number
  isTeleportOnCull: boolean
  pool: EnemyGroup
  colliderOverride: any
  target: Player
  private _blinkTimeout: Phaser.Time.TimerEvent
  treasure: any
  FreezeTimer: Phaser.Time.TimerEvent

  constructor(group: EnemyGroup, x: number, y: number, enemyType: EnemyType) {
    super(group.scene, x, y, 'main', 'ghost_enemy.png')
    this.hp = 3
    this.maxHp = 3
    this.dataMaxHp = 3
    this.power = 10
    this.knockback = 10
    this.deathKB = 10
    this.damageKB = 1
    this.xp = 1
    this.speed = 100
    this.scaleMul = 1
    this.enemyType = enemyType
    this.HPxLevel = false
    this.FixedDirection = false
    this.owner = null
    this.isDead = false
    this.receivingDamage = false
    this._currentDirection = new Phaser.Math.Vector2(0, 0)
    this.defaultName = ''
    this.isCullable = true
    this.IsTimeStopped = false
    this.IsFrozen = false
    this.defaultSpeed = 100
    this.res_Freeze = 0
    this.res_Rosary = 0
    this.moveTweenIndex = 0
    this.isTeleportOnCull = false
    this.pool = group
  }

  Init(x: number = -1000, y: number = -1000) {
    const enemyData = ENEMYS[this.enemyType][0]
    this.dataMaxHp = enemyData.maxHp
    this.maxHp = enemyData.maxHp
    this.power = enemyData.power
    this.knockback = enemyData.knockback
    this.deathKB = enemyData.deathKB
    this.xp = enemyData.xp
    this.speed = enemyData.speed
    this.defaultSpeed = enemyData.speed
    this.alpha = enemyData.alpha ? enemyData.alpha : 1
    this.scaleMul = enemyData.scale ? enemyData.scale : 1
    this.res_Freeze = enemyData.res_Freeze ? enemyData.res_Freeze : 0
    this.res_Rosary = enemyData.res_Rosary ? enemyData.res_Rosary : 0
    this.colliderOverride = enemyData.colliderOverride

    const skills = enemyData.skills
    if (skills) {
      if (skills.includes('HPxLevel')) {
        this.HPxLevel = true
      }
      if (skills.includes('FixedDirection')) {
        this.FixedDirection = true
      }
    }
    this.setFrame(enemyData.spriteName)
    this.setPosition(x, y)
    this.scene.physics.add.existing(this)
    this.OnRecycle()
  }
  Freeze(delay: number, t = 1) {
    if (!(this.res_Freeze > t || this.IsTimeStopped)) {
      if (this.FreezeTimer) {
        this.FreezeTimer.destroy()
      }
      this.FreezeTimer = this.scene.time.addEvent({
        delay,
        callback: () => this.ResumeFromFreeze()
      })
      this.IsTimeStopped = true
      this.speed = 0
      this.setVelocity(0)
      this.setTint(255)
    }
  }
  ResumeFromFreeze() {
    this.IsTimeStopped = false
    this.speed = this.defaultSpeed
    this.restoreTint()
  }
  TimeStop() {
    if (this.FreezeTimer) {
      this.FreezeTimer.destroy()
      this.IsTimeStopped = true
      this.speed = 0
      this.setVelocity(0)
      this.setTint(255)
    }
  }
  ResumeFromTimeStop() {
    this.IsTimeStopped = false
    this.speed = this.defaultSpeed
    this.restoreTint()
  }
  setOwner(owner: any) {
    this.owner = owner
  }
  GetDamaged(PPower: number = 1, hitVFX: HitVFXType = HitVFXType.DEFAULT, knockback: number) {
    if (PPower > 0 && Game.Core.PlayerOptions.DamageNumbersEnabled) {
      Game.Core.ShowDamageAt(this.x, this.y, PPower)
    }
    this.hp -= PPower
    if (this.hp <= 0) {
      this.Die()
    } else {
      this.damageKB = knockback
    }
    // TODO: Play Sound
    if (hitVFX !== HitVFXType.NONE) {
      Game.Core.ShowHitVFXAt(this.x, this.y, hitVFX)
    }
    this.OnGetDamaged(hitVFX)
  }
  Die() {
    if (this.isDead) return
    this.isDead = true
    const e = -this.deathKB
    this.setVelocity(
      GameCore.EnemySpeed * this.speed * this._currentDirection.x * e,
      GameCore.EnemySpeed * this.speed * this._currentDirection.y * e
    )
    // TODO: play die anims
    this.DeSpawn()
    Game.Core.scene.time.removeEvent(this._blinkTimeout)
    const xp = Math.floor((Math.random() + 0.5) * this.xp)
    if (xp > 0) {
      Game.Core.MakeGem(this.x, this.y, xp)
    }
    if (this.treasure) {
      Game.Core.MakeTreasure(this.x, this.y, this.treasure)
      this.treasure = null
    }
    if (this.treasure) {
      Game.Core.MakeTreasure(this.x, this.y, this.treasure)
    }
    ENEMYS[this.enemyType][0].killedAmount += 1
    Game.Core.PlayerOptions.RunEnemies += 1
    Game.Core.MainUI.UpdateKills()
  }
  OnGetDamaged(hitVFX: HitVFXType = HitVFXType.DEFAULT) {
    if (Game.Core.PlayerOptions.FlashingVFXEnabled && hitVFX !== HitVFXType.NONE) {
      this.setTintFill()
      // TODO: 特效判断
    }
    this._blinkTimeout = Game.Core.scene.time.addEvent({
      delay: this.isDead ? 60 : 120,
      loop: false,
      callback: () => {
        this.restoreTint()
      }
    })
    this.receivingDamage = true
  }
  restoreTint() {
    this.IsTimeStopped ? this.setTint(255) : this.setTint(0xffffff)
    this.receivingDamage = false
  }

  OnRecycle() {
    this.damageKB = 1
    this.target = Game.Core.Player
    if (this.HPxLevel) {
      this.maxHp = Game.Core.Player.level * this.dataMaxHp
    }
    if (this.FixedDirection) {
      this._currentDirection.x = 0
      this._currentDirection.y = 0
    }
    this.hp = this.maxHp
    this.isDead = false
    this.visible = true
    this.Body.enable = true
    this.IsTimeStopped = false
    this.speed = this.defaultSpeed
    this.restoreTint()
    this.setOrigin(0.5)
    this.setScale(1)
    let radius = this.width * 0.4
    let offset = radius * 0.5
    if (this.colliderOverride) {
      radius = this.width * this.colliderOverride.radius
      offset = radius * 0.5
      this.Body.setOffset(offset, offset + this.colliderOverride.offsetY)
    }
    this.Body.setCircle(radius, offset, offset)
    this.setOrigin(0.5, 1)
    this.setScale(GameCore.PixelScale * this.scaleMul)
  }

  get Body() {
    return this.body as Phaser.Physics.Arcade.Body
  }
  OnTeleportOnCull() {
    var e = Game.Core.GetPositionOutOfSight(5, 48)
    this.setPosition(e.x, e.y)
  }
  Update(delta: number): void {
    if (this.isDead) return
    this.setDepth(this.y - Game.Core.Player.y)
    if (this.IsTimeStopped) return

    if (
      !this.FixedDirection ||
      (this.FixedDirection && 0 == this._currentDirection.x && 0 == this._currentDirection.y)
    ) {
      this._currentDirection.x = this.target.x - this.x
      this._currentDirection.y = this.target.y - this.y
      this._currentDirection.normalize()
    }
    const damage = this.receivingDamage ? -this.knockback * this.damageKB : 1
    this.setFlipX(this._currentDirection.x > 0)
    this.setVelocity(
      GameCore.EnemySpeed * this.speed * this._currentDirection.x * damage,
      GameCore.EnemySpeed * this.speed * this._currentDirection.y * damage
    )
    // this.setAngle(We.TweenAngles[this.moveTweenIndex].angle)
  }
  Disappear() {
    this.DeSpawn()
  }

  DeSpawn() {
    this.isDead = true
    this.Body.enable = false
    this.visible = false
    this.pool.Recycle(this)
  }
}
