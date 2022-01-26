import Weapons from '../../enums/WeaponType'
import BaseWeapon from './BaseWeapon'
import Bullet from './BaseBullet'
import LegBullet from './LegBullet'
import BaseBullet from './BaseBullet'
import Game from '../Game'
import Enemy from '../enemy/Enemy'

export class BulletGroup extends Phaser.GameObjects.Group {
  stored: Bullet[]
  spawned: Bullet[]
  weaponType: Weapons

  constructor(scene, bulletType: Weapons) {
    super(scene)
    this.stored = []
    this.spawned = []
    this.weaponType = bulletType
    this.Init(bulletType)
  }
  Init(bulletType: Weapons) {
    this.weaponType = bulletType
    this.scene.add.existing(this)
  }

  SpawnAt(x: number, y: number, weapon: BaseWeapon, index: number) {
    const bullet = this.Spawn(weapon, index)
    bullet.setPosition(x, y)
    bullet.indexInWeapon = index
    this.scene.children.add(bullet)
    bullet.OnRecycle()
    return bullet
  }

  Spawn(weapon: BaseWeapon, index = 0) {
    let bullet = this.stored.pop()
    if (!bullet) {
      bullet = this.Make(weapon, index)
      bullet.Init()
      this.add(bullet, true)
      this.spawned.push(bullet)
      Game.Core.BulletGroup.add(bullet, false)
    }
    return bullet
  }

  Return(bullet: BaseBullet) {
    this.scene.children.remove(bullet)
    // 删掉就不触发重叠事件
    // this.remove(bullet, true, false)
    this.spawned.splice(this.spawned.indexOf(bullet), 1)
    Game.Core.BulletGroup.remove(bullet, false)
    this.stored.push(bullet)
  }

  Make(weapon: BaseWeapon, index = 0) {
    switch (this.weaponType) {
      default:
      case Weapons.VOID:
        return new Bullet(this, weapon, index)
      case Weapons.LEG:
        return new LegBullet(this, weapon, index)
    }
  }
}
