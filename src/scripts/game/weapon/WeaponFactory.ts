import Weapons from '../../enums/WeaponType'
import BaseWeapon from './BaseWeapon'
import LegWeapon from './LegWeapon'
import PowerUpWeapon from './PowerUpWepaon'

export default class WeaponFactory {
  GetWeapon(weapon: Weapons): BaseWeapon {
    // todo power up
    // if (!weapon) {
    //   return new PowerUpWeapon(weapon)
    // }
    switch (weapon) {
      default:
      case Weapons.LEG:
        return new LegWeapon(weapon)
    }
  }
}
