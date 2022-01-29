import Game from '../Game'
import GameCore from '../GameCore'
import BaseBullet from './BaseBullet'
import BaseWeapon from './BaseWeapon'
import { BulletGroup } from './BulletGroup'

export default class RadioActiveBullet extends BaseBullet {
  radius: number
  ExpireTimer: Phaser.Time.TimerEvent
  constructor(group: BulletGroup, weapon: BaseWeapon, indexInWeapon = 0, x: number = 0, y: number = 0) {
    super(group, weapon, indexInWeapon, 'radioactive_bullet.png', x, y)
    this.radius = 32
    this.copyPosition(Game.Core.Player)
  }
  OnRecycle(): void {
    super.OnRecycle()
    this.body.setCircle(this.radius)
    this.setScale(2 * GameCore.PixelScale * this.weapon.PArea)
    this.setVisible(false)
    Game.Core.scene.time.removeEvent(this.ExpireTimer)
    this.ExpireTimer = Game.Core.scene.time.addEvent({
      delay: this.weapon.PInterval,
      loop: false,
      callback: () => {
        Game.Core.scene.time.removeEvent(this.ExpireTimer)
        this.DeSpawn()
      }
    })
  }
  Update() {
    this.copyPosition(Game.Core.Player)
  }
}
