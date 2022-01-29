import PickupType from '../../enums/PickupType'
import Game from '../Game'
import BasePickup from './BasePickup'
import CoinPickup from './CoinPickup'
import GemPickup from './GemPickup'
import RoastPickup from './RoastPickup'
import VacuumPickup from './VacuumPickup'

export default class PickupGroup extends Phaser.GameObjects.Group {
  stored: { [key: string]: BasePickup[] }
  spawned: { [key: string]: BasePickup[] }
  constructor(scene: Phaser.Scene) {
    super(scene)
    this.stored = {}
    this.spawned = {}
    this.Init()
    for (const pickup in PickupType) {
      this.stored[pickup] = []
      this.spawned[pickup] = []
    }
  }
  Init() {
    this.scene.add.existing(this)
  }

  SpawnAt(x: number, y: number, pickup: PickupType) {
    const pickupObj = this.Spawn(pickup) as BasePickup
    this.scene.children.add(pickupObj)
    pickupObj.setPosition(x, y)
    pickupObj.OnRecycle()
    return pickupObj
  }

  Spawn(pickup: PickupType) {
    let pickupObj
    if (this.stored[pickup]) {
      pickupObj = this.stored[pickup].pop()
    } else {
      this.stored[pickup] = []
      this.spawned[pickup] = []
    }
    if (!pickupObj) {
      pickupObj = this.Make(pickup)
      pickupObj.Init()
    }
    this.add(pickupObj, false)
    this.spawned[pickup].push(pickupObj)
    Game.Core.PickupGroup.add(pickupObj, false)
    return pickupObj
  }

  Return(pickup: BasePickup) {
    this.scene.children.remove(pickup)
    this.remove(pickup, true, false)
    this.spawned[pickup.itemType].splice(this.spawned[pickup.itemType].indexOf(pickup), 1)
    Game.Core.PickupGroup.remove(pickup, true)
    this.stored[pickup.itemType].push(pickup)
  }
  Make(pickup: PickupType): BasePickup {
    switch (pickup) {
      default:
      case PickupType.COIN:
        return new CoinPickup(this, 0, 0)
      case PickupType.GEM:
        return new GemPickup(this, 0, 0)
      case PickupType.ROAST:
        return new RoastPickup(this, 0, 0)
      case PickupType.VACUUM:
        return new VacuumPickup(this, 0, 0)
    }
  }
}
