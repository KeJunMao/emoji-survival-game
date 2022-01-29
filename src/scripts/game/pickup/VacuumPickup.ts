import PickupType from '../../enums/PickupType'
import Game from '../Game'
import GameCore from '../GameCore'
import BasePickup from './BasePickup'
import PickupGroup from './PickupGroup'

export default class VacuumPickup extends BasePickup {
  constructor(group: PickupGroup, x: number, y: number) {
    super(group, x, y, PickupType.VACUUM)
    this.scene.add.existing(this)
    this.setScale(GameCore.PixelScale)
  }

  Update(): void {
    super.Update()
    this.setDepth(this.y - Game.Core.Player.y)
  }
  GetTaken() {
    Game.Core.TurnOnVacuum()
    this.SetSeenItem(this.itemType)
    super.GetTaken()
  }
}
