import EnemyType from '../../enums/EnemyType'
import EnemyData from './EnemyDataInterface'

const BOSS_ENEMYS = {
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
      level: 5,
      maxHp: 10,
      speed: 150,
      power: 8,
      skills: ['HPxLevel'],
      knockback: 1,
      deathKB: 2,
      killedAmount: 0,
      xp: 30,
      alpha: 0.5,
      spriteName: 'ghost_boss1_enemy.png',
      scale: 1.5
    }
  ],
  [EnemyType.GOBLIN_BOSS]: [
    {
      level: 10,
      maxHp: 20,
      speed: 130,
      power: 20,
      knockback: 0.1,
      deathKB: 7,
      skills: ['HPxLevel'],
      killedAmount: 0,
      xp: 2.5,
      spriteName: 'goblin_boss_enemy.png',
      scale: 1.5
    }
  ],
  [EnemyType.ALIEN_BOSS]: [
    {
      level: 15,
      maxHp: 25,
      speed: 80,
      power: 20,
      skills: ['HPxLevel'],
      res_Freeze: 1,
      knockback: 0,
      deathKB: 5,
      killedAmount: 0,
      scale: 1.5,
      xp: 25,
      spriteName: 'alien_boss_enemy.png'
    }
  ]
}
export default BOSS_ENEMYS
