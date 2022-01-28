import EnemyType from '../../enums/EnemyType'

const SWARM_ENEMYS = {
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
      scale: 0.8,
      spriteName: 'ghost_enemy.png',
      skills: ['FixedDirection'],
      alpha: 0.5
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
export default SWARM_ENEMYS
