import EnemyType from '../../enums/EnemyType'

const MEDIUM_ENEMYS = {
  [EnemyType.OGRE]: [
    {
      level: 1,
      maxHp: 20,
      speed: 130,
      power: 15,
      knockback: 0.8,
      deathKB: 7,
      killedAmount: 0,
      xp: 1.5,
      spriteName: 'ogre_enemy.png'
    }
  ],
  [EnemyType.GOBLIN]: [
    {
      level: 10,
      maxHp: 30,
      speed: 140,
      power: 10,
      knockback: 0.1,
      deathKB: 2,
      killedAmount: 0,
      xp: 2.5,
      spriteName: 'goblin_enemy.png'
    }
  ]
}

export default MEDIUM_ENEMYS
