import Weapons from '../enums/WeaponType'

const WEAPONS = {
  [Weapons.LEG]: [
    {
      level: 1,
      bulletType: Weapons.LEG,
      name: '退',
      description: '水平攻击，穿透敌人',
      tips: '忽略: 速度、持续时间。',
      isUnlocked: !0,
      rarity: 100,
      interval: 1350,
      repeatInterval: 100,
      power: 1,
      area: 1,
      speed: 1,
      amount: 1,
      hitsWalls: false
    },
    {
      amount: 1
    },
    {
      power: 0.5
    },
    {
      power: 0.5,
      area: 0.1
    },
    {
      power: 0.5
    },
    {
      power: 0.5,
      area: 0.1
    },
    {
      power: 0.5
    },
    {
      power: 0.5
    }
  ]
}

export default WEAPONS
