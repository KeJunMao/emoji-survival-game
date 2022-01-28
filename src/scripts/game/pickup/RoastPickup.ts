import PickupType from '../../enums/PickupType'
import Game from '../Game'
import GameCore from '../GameCore'
import BasePickup from './BasePickup'
import PickupGroup from './PickupGroup'

export default class RoastPickup extends BasePickup {
  constructor(group: PickupGroup, x: number, y: number) {
    super(group, x, y, PickupType.ROAST)
    Game.Core.scene.add.existing(this)
    this.setScale(GameCore.PixelScale)
  }
  Update() {
    super.Update()
    this.setDepth(9 + this.y - Game.Core.Player.y)
  }
  GetTaken() {
    Game.Core.Player.RecoverHp(this.value)
    Game.Core.Player.SetInvulForMilliSeconds(300)
    this.SetSeenItem(this.itemType)
    super.GetTaken()
  }
}
