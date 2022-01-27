import WeaponType from '../enums/WeaponType'

const WEAPONS = {
  [WeaponType.LEG]: [
    {
      level: 1,
      bulletType: WeaponType.LEG,
      name: '腿',
      frameName: 'leg_bullet.png',
      description: '水平攻击，穿透敌人',
      tips: '',
      isUnlocked: true,
      rarity: 100,
      // 频率 越小越快
      interval: 1350,
      repeatInterval: 100,
      power: 0.1,
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
  [WeaponType.FIST]: [
    {
      level: 1,
      bulletType: WeaponType.FIST,
      name: '拳',
      frameName: 'fist_bullet.png',
      description: '圆心攻击，穿透敌人',
      tips: '',
      isUnlocked: true,
      rarity: 100,
      interval: 3000,
      repeatInterval: 100,
      power: 0.2,
      area: 1.2,
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
  ],
  [WeaponType.BONE]: [
    {
      level: 1,
      bulletType: WeaponType.BONE,
      name: '骨',
      description: '骨骨会弹弹',
      tips: '',
      frameName: 'bone_bullet.png',
      isUnlocked: true,
      rarity: 100,
      interval: 3000,
      repeatInterval: 0,
      power: 0.5,
      area: 1,
      speed: 1,
      amount: 1,
      duration: 2500
    },
    {
      duration: 200,
      area: 0.2
    },
    {
      power: 2,
      amount: 1
    },
    {
      speed: 0.5,
      area: 0.2
    },
    {
      power: 2,
      amount: 1
    },
    {
      duration: 200,
      area: 0.2
    },
    {
      power: 2,
      amount: 1
    },
    {
      duration: 200,
      speed: 0.5
    }
  ],
  [WeaponType.MAGNET]: [
    {
      level: 1,
      bulletType: WeaponType.MAGNET,
      name: '磁',
      description: '从更远处吸取掉落物品',
      frameName: 'magnet_powerup.png',
      isUnlocked: true,
      rarity: 100,
      isPowerUp: true,
      magnet: 0.5
    },
    {
      magnet: 0.33
    },
    {
      magnet: 0.25
    },
    {
      magnet: 0.2
    },
    {
      magnet: 0.33
    }
  ]
}

export default WEAPONS
