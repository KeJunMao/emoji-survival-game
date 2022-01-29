import WEAPONS from '../../consts/WEAPONS'
import WeaponType from '../../enums/WeaponType'
import BaseWeapon from './BaseWeapon'
import PowerUpWeapon from './PowerUpWeapon'
import RadioActiveWeapon from './RadioActiveWeapon'

export default class WeaponFactory {
  GetWeapon(weapon: WeaponType): BaseWeapon {
    const weaponData = WEAPONS[weapon][0]
    if (weaponData.isPowerUp) {
      return new PowerUpWeapon(weapon)
    }
    switch (weapon) {
      default:
      case WeaponType.LEG:
        return new BaseWeapon(weapon)
      case WeaponType.BONE:
        return new BaseWeapon(weapon)
      case WeaponType.FIST:
        return new BaseWeapon(weapon)
      case WeaponType.ROCK:
        return new BaseWeapon(weapon)
      case WeaponType.RADIOACTIVE:
        return new RadioActiveWeapon(weapon)
    }
  }
}
