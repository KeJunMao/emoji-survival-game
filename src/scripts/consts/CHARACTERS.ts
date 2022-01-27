import CharacterType from '../enums/CharacterType'
import WeaponType from '../enums/WeaponType'

const CHARACTERS = {
  [CharacterType.WOOZY]: [
    {
      level: 1,
      startingWeapon: WeaponType.LEG,
      cooldown: 1,
      charName: 'Woozy Face',
      surname: '屑',
      spriteName: 'woozy_face.png',
      description: 'Attacks deal 10% more damage every 10 levels (max +50%).',
      isBought: false,
      price: 0,
      maxHp: 100,
      power: 1,
      area: 1,
      speed: 1,
      amount: 0,
      moveSpeed: 1,
      growth: 1,
      duration: 1,
      showcase: []
    },
    {
      power: 0.1,
      level: 10
    },
    {
      power: 0.1,
      level: 20,
      growth: 1
    },
    {
      power: 0.1,
      level: 30
    },
    {
      power: 0.1,
      level: 40,
      growth: 1
    },
    {
      power: 0.1,
      level: 50
    },
    {
      level: 21,
      growth: -1
    },
    {
      level: 41,
      growth: -1
    }
  ]
}

export default CHARACTERS
