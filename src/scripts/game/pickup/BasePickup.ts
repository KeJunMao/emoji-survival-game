import PICKUPS from '../../consts/PICKUPS'
import PickupType from '../../enums/PickupType'
import Game from '../Game'
import GameCore from '../GameCore'
import PickupGroup from './PickupGroup'

export default class BasePickup extends Phaser.Physics.Arcade.Sprite {
  SetValue(value: number) {
    this.value = value
  }
  private static DEFAULT_SPEED = 250
  radius: number
  frameName: string
  speed: any
  goToPlayer: boolean
  time: number
  originPos: Phaser.Math.Vector2
  currentDirection: Phaser.Math.Vector2
  value: number
  isStationary: boolean
  owner: null
  isCullable: boolean
  isTeleportOnCull: boolean
  pool: PickupGroup
  itemType: PickupType
  vacuumTween: Phaser.Tweens.Tween
  constructor(group: PickupGroup, x: number, y: number, pickupType: PickupType) {
    super(group.scene, x, y, 'main')
    this.radius = 10
    this.frameName = 'gem_pickup.png'
    this.speed = BasePickup.DEFAULT_SPEED
    this.goToPlayer = false
    this.time = 0
    this.currentDirection = new Phaser.Math.Vector2(0, 0)
    this.value = 0
    this.isStationary = false
    this.owner = null
    this.isCullable = true
    this.isTeleportOnCull = false
    this.pool = group
    this.itemType = pickupType
    const itemData = PICKUPS[pickupType]
    this.frameName = itemData.frameName
    this.value = itemData.value
    this.setFrame(this.frameName)
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.setScale(GameCore.PixelScale)
    this.body.setCircle(this.radius)
    this.originPos = new Phaser.Math.Vector2(this.x, this.y)
    this.vacuumTween = this.scene.tweens.add({
      targets: this,
      time: 1,
      duration: 500,
      ease: 'Linear'
    })
    this.vacuumTween.pause()
  }
  OnTeleportOnCull() {}
  Init(x = -1000, y = -1000) {
    this.setPosition(x, y)
    this.OnRecycle()
  }
  OnRecycle() {
    this.setActive(true)
    this.setVisible(true)
    this.setFrame(this.frameName)
    this.Body.enable = true
    this.goToPlayer = false
    this.speed = BasePickup.DEFAULT_SPEED
    this.value = PICKUPS[this.itemType].value
  }

  DeSpawn() {
    this.setActive(false)
    this.setVisible(false)
    this.Body.enable = false
    this.setVelocity(0)
    this.anims.stop()
    this.pool.Return(this)
  }

  GetTaken() {
    this.DeSpawn()
    PICKUPS[this.itemType].pickedupAmount += 1
  }

  Update() {
    if (this.goToPlayer && !this.isStationary) {
      this.GoToPlayer()
    }
  }
  GoToPlayer() {
    ;(this.currentDirection.x = Game.Core.Player.x - this.x),
      (this.currentDirection.y = Game.Core.Player.y - 8 - this.y)
    this.currentDirection.normalize()
    this.setVelocity(this.speed * this.currentDirection.x * this.time, this.speed * this.currentDirection.y * this.time)
    this.speed++
  }

  Vacuum() {
    if (!this.goToPlayer) {
      this.time = -1
      this.vacuumTween.restart()
      this.goToPlayer = true
      return false
    } else {
      return true
    }
  }

  SetSeenItem(...arg) {
    // TODO:
  }

  get Body() {
    return this.body as Phaser.Physics.Arcade.Body
  }
}
