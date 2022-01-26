import EnemyType from '../enums/EnemyType'
import StageType from '../enums/StageType'

const STAGES = {
  [StageType.FOREST]: [
    {
      stageName: 'Test',
      description:
        'Description a description thea description a description the description a description the description a description the description.',
      unlocked: !1,
      hidden: !0,
      tips: '',
      hyper: {
        unlocked: !1,
        PlayerPxSpeed: 1.5,
        EnemySpeed: 1.6,
        ProjectileSpeed: 1.2,
        GoldMultiplier: 1.5,
        EnemyMinimumMul: 1.25,
        StartingSpawns: 20,
        tips: 'Gold multiplier: x1.5'
      },
      startingSpawns: 3,
      minute: 0,
      // destructibleType: ne.BRAZIER,
      destructibleFreq: 1e3,
      destructibleChance: 10,
      destructibleChanceMax: 50,
      maxDestructibles: 10,
      minimum: 10,
      frequency: 1500,
      enemies: [EnemyType.GHOST, EnemyType.POO]
    }
  ]
}

export default STAGES
