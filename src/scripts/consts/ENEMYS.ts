import EnemyType from '../enums/EnemyType'
import Enemy from '../game/enemy/Enemy'

interface EnemyData {
  level: number
  maxHp: number
  speed: number
  power: number
  knockback: number
  deathKB: number
  xp: number
  killedAmount: number
  spriteName: string
  alpha?: number
  res_Freeze?: number
  res_Rosary?: number
  scale?: number
  colliderOverride?: any
  skills?: string[]
}

const ENEMYS: {
  [key in EnemyType]: EnemyData[]
} = {
  [EnemyType.GHOST]: [
    {
      level: 1,
      maxHp: 0.1,
      speed: 140,
      power: 5,
      knockback: 1,
      deathKB: 2,
      xp: 1,
      killedAmount: 0,
      spriteName: 'ghost_enemy.png',
      alpha: 1,
      res_Freeze: 0,
      res_Rosary: 0,
      scale: 1,
      colliderOverride: undefined
    }
  ],
  [EnemyType.POO]: [
    {
      level: 1,
      maxHp: 1.5,
      speed: 100,
      power: 10,
      knockback: 1,
      deathKB: 5,
      killedAmount: 0,
      xp: 2,
      spriteName: 'poo_enemy.png'
    }
  ]
}

export default ENEMYS
