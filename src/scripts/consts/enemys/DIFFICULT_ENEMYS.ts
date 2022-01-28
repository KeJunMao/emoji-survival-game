import EnemyType from '../../enums/EnemyType'

const DIFFICULT_ENEMYS = {
  [EnemyType.HORN]: [
    {
      level: 10,
      maxHp: 50,
      speed: 80,
      power: 20,
      knockback: 0,
      deathKB: 0,
      killedAmount: 0,
      xp: 3,
      spriteName: 'horns_enemy.png'
    }
  ]
}
export default DIFFICULT_ENEMYS
