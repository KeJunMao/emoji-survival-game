import PickupType from '../enums/PickupType'

const PICKUPS: {
  [key in PickupType]: any
} = {
  [PickupType.GEM]: {
    name: '经验宝石',
    description: '增加经验',
    tips: '',
    frameName: 'gem_pickup.png',
    pickedupAmount: 0,
    rarity: 0,
    unlocksAt: 100000,
    value: 50,
    inTreasures: false,
    seen: true
  },
  [PickupType.COIN]: {
    name: '金币',
    description: '增加1金币',
    tips: '',
    frameName: 'coin_pickup.png',
    pickedupAmount: 0,
    rarity: 50,
    unlocksAt: 0,
    value: 1,
    inTreasures: false,
    seen: true
  },
  [PickupType.ROAST]: {
    name: '烤肉',
    description: '恢复30点血量',
    tips: '',
    frameName: 'roast_pickup.png',
    pickedupAmount: 0,
    rarity: 50,
    unlocksAt: 0,
    value: 30,
    inTreasures: false
  },
  [PickupType.WEAPON]: {
    name: '武器',
    description: '',
    tips: '',
    frameName: '',
    pickedupAmount: 0,
    rarity: 0,
    unlocksAt: 1e6,
    inTreasures: false,
    hidden: true,
    value: 0
  },
  0: undefined
}

export default PICKUPS
