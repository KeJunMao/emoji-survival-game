import Weapons from '../enums/WeaponType'

const WEAPONS = {
  [Weapons.LEG]: [
    {
      level: 1,
      bulletType: Weapons.LEG,
      name: '腿',
      frameName: 'leg_bullet.png',
      description: '水平攻击，穿透敌人',
      tips: '',
      isUnlocked: !0,
      rarity: 100,
      // 频率 越小越快
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
  ],
  [Weapons.FIST]: [
    {
      level: 1,
      bulletType: Weapons.FIST,
      name: '拳',
      frameName: 'fist_bullet.png',
      description: '圆心攻击，穿透敌人',
      tips: '',
      isUnlocked: !0,
      rarity: 100,
      interval: 3000,
      repeatInterval: 100,
      power: 1.2,
      area: 1.5,
      speed: 1,
      amount: 1,
      hitsWalls: false
    },
    {
      area: 0.2,
      interval: -200
    },
    {
      interval: -300
    },
    {
      interval: -400
    },
    {
      area: 0.1,
      interval: -500
    },
    {
      amount: 1,
      power: 0.5
    },
    {
      power: 0.5
    },
    {
      power: 0.5,
      interval: -800
    }
  ]
}

export default WEAPONS
