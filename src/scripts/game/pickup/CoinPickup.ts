import PickupType from '../../enums/PickupType'
import Game from '../Game'
import GameCore from '../GameCore'
import BasePickup from './BasePickup'
import PickupGroup from './PickupGroup'

export default class CoinPickup extends BasePickup {
  landingLocation: Phaser.Math.Vector2
  constructor(group: PickupGroup, x: number, y: number, pickupType = PickupType.COIN) {
    super(group, x, y, pickupType)
    this.landingLocation = new Phaser.Math.Vector2(0, 0)
    this.time = 0
    Game.Core.scene.add.existing(this)
    this.setScale(GameCore.PixelScale)
  }
  Update(): void {
    super.Update()
    this.setDepth(this.y - Game.Core.Player.y)
  }
  GetTaken(): void {
    // Game.Core.PlayerOptions.AddCoins(this.value);
    Game.Core.MainUI.UpdateCoins()
    super.GetTaken()
  }
}
