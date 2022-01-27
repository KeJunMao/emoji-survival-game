import EnemyType from '../enums/EnemyType'

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
  [EnemyType.GHOST1]: [
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
      alpha: 0.5
    }
  ],
  [EnemyType.GHOST2]: [
    {
      level: 1,
      maxHp: 0.1,
      speed: 150,
      power: 4,
      knockback: 1,
      deathKB: 2,
      xp: 1,
      killedAmount: 0,
      spriteName: 'ghost_enemy.png',
      alpha: 0.5
    }
  ],
  [EnemyType.GHOST3]: [
    {
      level: 1,
      maxHp: 0.1,
      speed: 160,
      power: 3,
      knockback: 1,
      deathKB: 2,
      xp: 1,
      killedAmount: 0,
      spriteName: 'ghost_enemy.png',
      alpha: 0.5
    }
  ],
  [EnemyType.GHOST_BOSS1]: [
    {
      level: 1,
      maxHp: 5,
      speed: 140,
      power: 10,
      skills: ['HPxLevel'],
      knockback: 1,
      deathKB: 2,
      killedAmount: 0,
      xp: 30,
      alpha: 0.5,
      spriteName: 'ghost_boss_enemy.png',
      scale: 1.5
    }
  ],
  [EnemyType.GHOST_BOSS2]: [
    {
      level: 1,
      maxHp: 5,
      speed: 150,
      power: 8,
      skills: ['HPxLevel'],
      knockback: 1,
      deathKB: 2,
      killedAmount: 0,
      xp: 30,
      alpha: 0.5,
      spriteName: 'ghost_boss_enemy.png',
      scale: 1.5
    }
  ],
  [EnemyType.GHOST_SWARM]: [
    {
      level: 1,
      maxHp: 0.1,
      speed: 700,
      power: 1,
      knockback: 0,
      deathKB: 0,
      killedAmount: 0,
      xp: 1.5,
      spriteName: 'ghost_enemy.png',
      skills: ['FixedDirection'],
      alpha: 0.5
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
  ],
  [EnemyType.ZOMBIE]: [
    {
      level: 1,
      maxHp: 1,
      speed: 100,
      power: 1,
      knockback: 0.8,
      deathKB: 4,
      killedAmount: 0,
      xp: 1,
      spriteName: 'zombie_enemy.png'
    }
  ],
  [EnemyType.BAT]: [
    {
      level: 1,
      maxHp: 1,
      speed: 200,
      power: 5,
      knockback: 0,
      deathKB: 0,
      killedAmount: 0,
      xp: 1.5,
      spriteName: 'bat_enemy.png'
    }
  ],
  [EnemyType.BAT_SWARM]: [
    {
      level: 1,
      maxHp: 1,
      speed: 800,
      power: 1,
      knockback: 0,
      deathKB: 0,
      killedAmount: 0,
      xp: 1.5,
      spriteName: 'bat_enemy.png',
      skills: ['FixedDirection'],
      alpha: 0.5
    }
  ]
}

export default ENEMYS
