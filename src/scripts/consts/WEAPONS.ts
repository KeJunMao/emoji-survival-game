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
  ],
  [WeaponType.MIGHT]: [
    {
      level: 1,
      bulletType: WeaponType.MIGHT,
      name: 'POWER!',
      description: '增加10%的伤害',
      frameName: 'power_powerup.png',
      isUnlocked: true,
      rarity: 100,
      isPowerUp: true,
      power: 0.1
    },
    {
      power: 0.1
    },
    {
      power: 0.1
    },
    {
      power: 0.1
    },
    {
      power: 0.1
    }
  ],
  [WeaponType.AMOUNT]: [
    {
      level: 1,
      bulletType: WeaponType.AMOUNT,
      name: '复制一把梭',
      description: '额外发射一把武器',
      frameName: 'copy_powerup.png',
      isUnlocked: true,
      rarity: 50,
      isPowerUp: true,
      amount: 1
    },
    {
      amount: 1
    }
  ],
  [WeaponType.AREA]: [
    {
      level: 1,
      bulletType: WeaponType.AREA,
      name: '放大镜',
      description: '增加10%的攻击范围',
      frameName: 'magnify_powerup.png',
      isUnlocked: true,
      rarity: 100,
      isPowerUp: true,
      area: 0.1
    },
    {
      area: 0.1
    },
    {
      area: 0.1
    },
    {
      area: 0.1
    },
    {
      area: 0.1
    }
  ],
  [WeaponType.COOLDOWN]: [
    {
      level: 1,
      bulletType: WeaponType.COOLDOWN,
      name: '假装喝了红牛',
      description: '冷却缩减8%',
      frameName: 'straw_powerup.png',
      isUnlocked: true,
      rarity: 50,
      isPowerUp: true,
      cooldown: -0.08
    },
    {
      cooldown: -0.08
    },
    {
      cooldown: -0.08
    },
    {
      cooldown: -0.08
    },
    {
      cooldown: -0.08
    }
  ],
  [WeaponType.SPEED]: [
    {
      level: 1,
      bulletType: WeaponType.SPEED,
      name: '流星',
      description: '增加10%子弹速度',
      frameName: 'speed_powerup.png',
      isUnlocked: true,
      rarity: 100,
      isPowerUp: true,
      speed: 0.1
    },
    {
      speed: 0.1
    },
    {
      speed: 0.1
    },
    {
      speed: 0.1
    },
    {
      speed: 0.1
    }
  ],
  [WeaponType.DURATION]: [
    {
      level: 1,
      bulletType: WeaponType.DURATION,
      name: '伟哥',
      description: '增加10%武器效果持续时间',
      frameName: 'duration_powerup.png',
      isUnlocked: true,
      rarity: 100,
      isPowerUp: true,
      duration: 0.1
    },
    {
      duration: 0.1
    },
    {
      duration: 0.1
    },
    {
      duration: 0.1
    },
    {
      duration: 0.1
    }
  ],
  [WeaponType.ARMOR]: [
    {
      level: 1,
      bulletType: WeaponType.ARMOR,
      name: '黑洞',
      description: '吸收1点受到的伤害',
      frameName: 'armor_powerup.png',
      isUnlocked: true,
      rarity: 100,
      isPowerUp: true,
      armor: 1
    },
    {
      armor: 1
    },
    {
      armor: 1
    },
    {
      armor: 1
    },
    {
      armor: 1
    }
  ],
  [WeaponType.MAXHEALTH]: [
    {
      level: 1,
      bulletType: WeaponType.MAXHEALTH,
      name: '修好的心',
      description: '增加10%最大生命值',
      frameName: 'maxhealth_powerup.png',
      isUnlocked: true,
      rarity: 100,
      isPowerUp: true,
      maxHp: 0.1
    },
    {
      maxHp: 0.1
    },
    {
      maxHp: 0.1
    },
    {
      maxHp: 0.1
    },
    {
      maxHp: 0.1
    }
  ],
  [WeaponType.GROWTH]: [
    {
      level: 1,
      bulletType: WeaponType.GROWTH,
      name: '长大',
      description: '增加7%的经验获取',
      frameName: 'growth_powerup.png',
      rarity: 80,
      isPowerUp: true,
      growth: 0.07
    },
    {
      growth: 0.07
    },
    {
      growth: 0.07
    },
    {
      growth: 0.07
    },
    {
      growth: 0.07
    }
  ],
  [WeaponType.MOVESPEED]: [
    {
      level: 1,
      bulletType: WeaponType.MOVESPEED,
      name: '速度之靴',
      description: '移动速度加快10%。',
      frameName: 'movespeed_powerup.png',
      isUnlocked: true,
      rarity: 50,
      isPowerUp: true,
      moveSpeed: 0.1
    },
    {
      moveSpeed: 0.1
    },
    {
      moveSpeed: 0.1
    },
    {
      moveSpeed: 0.1
    },
    {
      moveSpeed: 0.1
    }
  ],
  [WeaponType.LUCK]: [
    {
      level: 1,
      bulletType: WeaponType.LUCK,
      name: '幸运草',
      description: '获得10%的幸运',
      frameName: 'luck_powerup.png',
      isUnlocked: true,
      rarity: 100,
      isPowerUp: true,
      luck: 0.1
    },
    {
      luck: 0.1
    },
    {
      luck: 0.1
    },
    {
      luck: 0.1
    },
    {
      luck: 0.1
    }
  ]
}

export default WEAPONS
