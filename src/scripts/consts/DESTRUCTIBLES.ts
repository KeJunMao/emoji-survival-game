import DestructibleType from '../enums/DestructibleType'

interface DestructibleData {
  frameName: string
  maxHp: number
  destroyedAmount: number
  destructibleType: DestructibleType
}

const DESTRUCTIBLES: { [key in DestructibleType]: DestructibleData } = {
  [DestructibleType.BOX]: {
    frameName: 'box_destructible.png',
    destroyedAmount: 0,
    maxHp: 0.2,
    destructibleType: DestructibleType.GIFT
  },
  [DestructibleType.GIFT]: {
    frameName: 'gift_destructible.png',
    destroyedAmount: 0,
    maxHp: 0.5,
    destructibleType: DestructibleType.GIFT
  }
}

export default DESTRUCTIBLES
