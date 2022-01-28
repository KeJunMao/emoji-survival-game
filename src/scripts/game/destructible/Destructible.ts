import DESTRUCTIBLES from '../../consts/DESTRUCTIBLES'
import DestructibleType from '../../enums/DestructibleType'
import Game from '../Game'
import GameCore from '../GameCore'
import DestructibleGroup from './DestructibleGroup'

export default class Destructible extends Phaser.Physics.Arcade.Sprite {
  hp: number
  maxHp: number
  isDead: boolean
  receivingDamage: boolean
  isTeleportOnCull: boolean
  owner: any
  pool: DestructibleGroup
  destructibleType: DestructibleType
  _blinkTimeout: Phaser.Time.TimerEvent
  constructor(group: DestructibleGroup, x: number, y: number, destructibleType: DestructibleType) {
    super(group.scene, x, y, 'main', 'gift_destructible.png')
    this.hp = 1
    this.maxHp = 1
    this.isDead = false
    this.receivingDamage = false
    this.isTeleportOnCull = false
    this.owner = null
    this.scene = group.scene
    this.pool = group
    this.destructibleType = destructibleType
    const data = DESTRUCTIBLES[this.destructibleType]
    this.maxHp = data.maxHp
    this.setFrame(data.frameName)
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.body.immovable = true
    this.setScale(GameCore.PixelScale)
    this.setDepth(this.y)
  }
  OnTeleportOnCull() {}
  Init() {
    // this.anims.play("idle")
  }
  OnRecycle() {
    this.hp = this.maxHp
    this.isDead = false
    this.visible = true
    this.body.enable = true
    this.restoreTint()
    this.setDepth(this.y)
  }
  DeSpawn() {
    this.isDead = true
    this.pool.Return(this)
    this.body.enable = false
    this.visible = false
  }
  GetTaken() {
    this.DeSpawn()
  }
  GetDamaged(hp = 1) {
    if (!this.isDead) {
      this.hp -= hp
      if (this.hp <= 0) {
        this.isDead = true
        this.OnDestroyed()
      }
      this.OnGetDamaged()
    }
  }
  OnGetDamaged() {
    Game.Core.PlayerOptions.FlashingVFXEnabled && this.setTintFill(16777215)
    this.receivingDamage = true
    this._blinkTimeout = Game.Core.scene.time.addEvent({
      delay: 120,
      loop: false,
      callback: () => {
        this.restoreTint()
      }
    })
  }
  restoreTint() {
    this.setTint(16777215)
    this.receivingDamage = false
    if (this.hp <= 0) {
      Game.Core.scene.time.removeEvent(this._blinkTimeout)
      this.DeSpawn()
    }
  }
  OnDestroyed() {
    Game.Core.MakePickup(this.x, this.y, Game.Core.LootManager.GetRandomWeightedItem())
    DESTRUCTIBLES[this.destructibleType].destroyedAmount += 1
  }
}
