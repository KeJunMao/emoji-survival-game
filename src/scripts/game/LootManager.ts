import PICKUPS from '../consts/PICKUPS'
import PickupType from '../enums/PickupType'
import Game from './Game'

class G {
  weight: number
  itemType: any
  constructor(e: PickupType, t) {
    this.weight = 0
    this.itemType = PickupType.COIN
    this.itemType = e
    this.weight = t
  }
}
export default class LootManager {
  ExcludedItems: any[]
  accumulatedWeight: number
  WeightedStore: any[]
  constructor() {
    this.ExcludedItems = new Array()
    this.accumulatedWeight = 0
    this.WeightedStore = new Array()
  }
  Init() {
    this.calculateWeights()
  }
  calculateWeights() {
    this.accumulatedWeight = 0
    this.WeightedStore = new Array()
    for (const key in PICKUPS) {
      const item = PICKUPS[key]
      if (item && Game.Core.Player.level >= item.unlocksAt) {
        if (item.isRare) {
          this.accumulatedWeight += item.rarity * Game.Core.Player.luck
        } else {
          this.accumulatedWeight += item.rarity
        }
        if (item.rarity > 0) {
          this.WeightedStore.push(new G(key as PickupType, this.accumulatedWeight))
        }
      }
    }
  }
  RecalculateLoot() {
    this.calculateWeights()
  }
  GetRandomWeightedItem() {
    var e = Math.random() * this.accumulatedWeight
    for (let t = 0; t < this.WeightedStore.length; t++) {
      const i = this.WeightedStore[t]
      if (i.weight >= e) return i.itemType
    }
  }
}
