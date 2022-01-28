import EnemyType from '../../enums/EnemyType'

const EASY_ENEMYS = {
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
      spriteName: 'ghost1_enemy.png',
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
      spriteName: 'ghost2_enemy.png',
      alpha: 0.5
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
  [EnemyType.ZOMBIE1]: [
    {
      level: 1,
      maxHp: 1,
      speed: 100,
      power: 10,
      knockback: 0.8,
      deathKB: 4,
      killedAmount: 0,
      xp: 2,
      spriteName: 'zombie_enemy.png'
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
  [EnemyType.ZOMBIE2]: [
    {
      level: 1,
      maxHp: 7,
      speed: 100,
      power: 10,
      knockback: 0.8,
      deathKB: 4,
      killedAmount: 0,
      xp: 2.5,
      spriteName: 'zombie1_enemy.png'
    }
  ],
  [EnemyType.ALIEN]: [
    {
      level: 1,
      maxHp: 15,
      speed: 120,
      power: 15,
      knockback: 2,
      deathKB: 1,
      killedAmount: 0,
      xp: 2.5,
      spriteName: 'alien_enemy.png'
    }
  ]
}
export default EASY_ENEMYS
