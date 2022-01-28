import CHARACTERS from '../consts/CHARACTERS'
import Characters from '../enums/CharacterType'
import HitVFXType from '../enums/HitVFXType'
import Weapons from '../enums/WeaponType'
import Game from './Game'
import GameCore from './GameCore'

export default class Player extends Phaser.Physics.Arcade.Sprite {
  startingWeapon: Weapons
  lastFaceDirection: Phaser.Math.Vector2
  moveSpeed: number
  area: number
  amount: number
  power: number
  speed: number
  duration: number
  cooldown: number
  radius: number
  hp: number
  isDead: boolean
  xp: number
  level: number
  maxHp: number
  growth: number
  luck: number
  shields: number
  armor: number
  maxHistory: number
  historyIndex: number
  HasWalkingAnimation: boolean
  invulTime: number
  private _invul: boolean
  WorldBoxCollider: Phaser.Geom.Rectangle
  private _blinkTimeout: Phaser.Time.TimerEvent
  public get IsInvul(): boolean {
    return this._invul
  }
  public set IsInvul(value: boolean) {
    if (this._invul !== value) {
      this._invul = value
      if (this._invul) {
        this.setTintFill(0xffffbb)
      } else {
        this.clearTint()
      }
    }
  }
  receivingDamage: boolean
  characterType: Characters
  wiggleTween: Phaser.Tweens.Tween
  posHistory: Phaser.Math.Vector2[]
  constructor(scene: Phaser.Scene, x: number, y: number, character: Characters) {
    super(scene, x, y, 'main')
    this.radius = 18
    this.lastFaceDirection = new Phaser.Math.Vector2(1, 0)
    this.hp = 100
    this.isDead = false
    this.xp = 0
    this.level = 1
    this.maxHp = 100
    this.power = 1
    this.area = 1
    this.speed = 1
    this.cooldown = 1
    this.amount = 0
    this.moveSpeed = 1
    this.growth = 1
    this.duration = 1
    this.luck = 1
    this.shields = 0
    this.armor = 0
    this.startingWeapon = Weapons.LEG
    // this.ghosts = new Array
    this.posHistory = new Array()
    this.maxHistory = 3
    this.historyIndex = 0
    this.HasWalkingAnimation = false
    this.invulTime = 0
    this._invul = false
    this.receivingDamage = false
    this.characterType = character

    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.setOrigin(0, 0)
    this.Body.setCircle(this.radius, 14, 14)
    // this.Body.setOffset(6, 16)
    // console.log(this.body.position)
    this.setScale(GameCore.PixelScale)
    // this.setAngle(-5)
    this.wiggleTween = this.scene.tweens.add({
      targets: this,
      angle: 5,
      duration: 250,
      ease: 'Linear',
      loop: -1,
      yoyo: true,
      paused: true
    })
    for (let i = 0; i <= this.maxHistory; i++) {
      this.posHistory.push(new Phaser.Math.Vector2(this.x, this.y))
    }
    this.WorldBoxCollider = new Phaser.Geom.Rectangle(0, 0, this.scene.renderer.width, this.scene.renderer.height)
  }

  RecoverHp(hp: number) {
    if (this.isDead) return
    this.hp += hp
    if (this.hp > this.maxHp) {
      this.hp = this.maxHp
    }
    Game.Core.PlayerUI.Update()
  }

  LevelUp() {
    this.level++
    const playerDatas = CHARACTERS[this.characterType]
    const playerData = playerDatas.find(e => e.level === this.level)
    if (playerData) {
      for (const key in playerData) {
        if (this.hasOwnProperty(key) && key !== 'level') {
          if (key === 'maxHp') {
            this.hp = playerData[key] || this.hp
          }
          this[key] = playerData[key]
        }
      }
      if (playerData.cooldown) {
        Game.Core.ResetWeaponCooldowns()
      }
    }
  }

  MakeLevelOne() {
    this.level = 0
    const playerData = CHARACTERS[this.characterType][this.level]
    for (const key in playerData) {
      if (this.hasOwnProperty(key)) {
        this[key] = playerData[key]
      }
    }
    if (playerData.spriteName) {
      this.setFrame(playerData.spriteName)
    }
  }

  GetDamaged(PPower: number = 1) {
    if (!this.receivingDamage && !(this.IsInvul || this.hp <= 0)) {
      if (this.shields > 0) {
        this.shields -= 1
        this.OnGetDamaged(0xffffbb, 240)
        return Game.Core.scene.events.emit('Player_LostShield')
      }
      if (this.armor > 0) {
        PPower -= this.armor
        PPower = PPower < 1 ? 1 : PPower
      }
      this.hp -= PPower
      if (this.hp <= 0) {
        this.hp = 0
        this.Die()
        Game.Core.GameOver()
      } else {
        this.OnGetDamaged()
      }
      Game.Core.PlayerUI.Update()
    }
  }
  Die() {
    // throw new Error('Method not implemented.')
  }

  Revive() {
    this.isDead = false
    this.Body.enable = true
    this.setScale(GameCore.PixelScale)
    this.RecoverHp(this.maxHp)
    this.SetInvulForMilliSeconds(2e3)
    Game.Core.PlayerUI.Update()
  }
  SetInvulForMilliSeconds(time: number) {
    this.IsInvul = true
    this.invulTime += time
  }

  OnGetDamaged(fill = 16711680, delay = 120) {
    if (!this.receivingDamage) {
      this.setTintFill(fill)
      this._blinkTimeout = Game.Core.scene.time.addEvent({
        delay: delay,
        loop: false,
        callback: () => {
          this.restoreTint()
        }
      })
      this.receivingDamage = true
    }
  }
  restoreTint() {
    this.setTint(0xffffff)
    this.receivingDamage = false
  }

  Update(delta: number = 0) {
    if (!this.isDead) {
      this.invulTime -= delta
      if (this.invulTime <= 0) {
        this.invulTime = 0
      }
      this.IsInvul = this.invulTime > 0
      this.setDepth(0)
      if (this.body.velocity.x < 0) {
        this.setFlipX(true)
      }
      if (this.body.velocity.x > 0) {
        this.setFlipX(false)
      }

      if (this.body.velocity.x === 0 && this.body.velocity.y == 0) {
        this.wiggleTween.pause()
        this.setAngle(0)
      }

      this.historyIndex < this.maxHistory ? this.historyIndex++ : (this.historyIndex = 0)
      this.posHistory[this.historyIndex].copy(this.body.position)
      this.WorldBoxCollider.x = this.x - 0.5 * this.scene.renderer.width
      this.WorldBoxCollider.y = this.y - 0.5 * this.scene.renderer.height
    }
  }

  public get Body(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body
  }
}
