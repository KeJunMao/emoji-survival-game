import WeaponType from '../../enums/WeaponType'
import Game from '../Game'
import BaseWeapon from './BaseWeapon'

export default class PowerUpWeapon extends BaseWeapon {
  cooldown: number
  maxHp: number
  moveSpeed: number
  growth: number
  magnet: number
  luck: number
  armor: number
  constructor(weaponType: WeaponType) {
    super(weaponType, false)
    this.level = 0
    this.power = 0
    this.area = 0
    this.speed = 0
    this.cooldown = 0
    this.amount = 0
    this.maxHp = 0
    this.moveSpeed = 0
    this.growth = 0
    this.magnet = 0
    this.luck = 0
    this.armor = 0
    this.MakeLevelOne()
  }
  Apply() {
    Game.Core.Player.power += this.power
    Game.Core.Player.area += this.area
    Game.Core.Player.speed += this.speed
    Game.Core.Player.cooldown += this.cooldown
    Game.Core.Player.amount += this.amount
    Game.Core.Player.moveSpeed += this.moveSpeed
    Game.Core.Player.growth += this.growth
    Game.Core.Player.luck += this.luck
    Game.Core.Player.armor += this.armor
    Game.Core.Player.duration += this.duration
    Game.Core.Player.maxHp += Game.Core.Player.maxHp * this.maxHp
    this.cooldown > 0 && Game.Core.ResetWeaponCooldowns()
    if (this.magnet) {
      Game.Core.Magnet.radius += Game.Core.Magnet.radius * this.magnet
      Game.Core.Magnet.RefreshSize()
    }
  }
  LevelUp() {
    return this.resetBonuses(), !!super.LevelUp() && (this.Apply(), !0)
  }
  MakeLevelOne() {
    this.resetBonuses()
    super.MakeLevelOne()
    Game.Core.Player && this.Apply()
  }
  resetBonuses() {
    this.power = 0
    this.area = 0
    this.speed = 0
    this.cooldown = 0
    this.amount = 0
    this.maxHp = 0
    this.moveSpeed = 0
    this.growth = 0
    this.magnet = 0
    this.luck = 0
    this.armor = 0
    this.duration = 0
  }
  ResetFiringTimer() {}
}
