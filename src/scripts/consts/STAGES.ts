import EnemyType from '../enums/EnemyType'
import StageEventType from '../enums/StageEventType'
import StageType from '../enums/StageType'

export interface StageEvent {
  eventType: StageEventType
  delay: number
  repeat: number
  chance?: any
  duration?: number
}

export interface StageHyper {}

export interface StageData {
  stageName?: string
  description?: string
  unlocked?: boolean
  hidden?: boolean
  tips?: string
  hyper?: StageHyper
  startingSpawns?: number
  minute?: number
  destructibleFreq?: number
  destructibleChance?: number
  destructibleChanceMax?: number
  maxDestructibles?: number
  minimum?: number
  frequency?: number
  bosses?: EnemyType[]
  enemies?: EnemyType[]
  events?: StageEvent[]
}

const STAGES: {
  [key in StageType]: StageData[]
} = {
  [StageType.FOREST]: [
    {
      stageName: 'Test',
      description:
        'Description a description thea description a description the description a description the description a description the description.',
      unlocked: false,
      hidden: false,
      tips: '',
      hyper: {
        unlocked: false,
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
      enemies: [EnemyType.GHOST3]
    },
    {
      minute: 1,
      minimum: 30,
      frequency: 1500,
      enemies: [EnemyType.ZOMBIE, EnemyType.GHOST1],
      bosses: [EnemyType.GHOST_BOSS1]
    },
    {
      minute: 2,
      minimum: 50,
      frequency: 500,
      enemies: [EnemyType.GHOST1, EnemyType.GHOST2, EnemyType.GHOST3],
      events: [
        {
          eventType: StageEventType.GHOST_SWARM,
          delay: 5000,
          repeat: 2
        }
      ]
    },
    {
      minute: 3,
      minimum: 40,
      frequency: 250,
      enemies: [EnemyType.POO],
      bosses: [EnemyType.GHOST_BOSS1],
      events: [
        {
          eventType: StageEventType.GHOST_SWARM,
          delay: 5000,
          repeat: 1,
          chance: 10
        }
      ]
    },
    {
      minute: 4,
      minimum: 40,
      frequency: 250,
      enemies: [EnemyType.POO, EnemyType.BAT],
      events: [
        {
          eventType: StageEventType.GHOST_SWARM,
          delay: 5000,
          repeat: 1,
          chance: 10
        }
      ]
    }
  ]
}

export default STAGES
