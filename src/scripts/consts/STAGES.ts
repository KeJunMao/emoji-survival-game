import DestructibleType from '../enums/DestructibleType'
import EnemyType from '../enums/EnemyType'
import StageEventType from '../enums/StageEventType'
import StageType from '../enums/StageType'

export interface StageEvent {
  eventType: StageEventType
  delay: number
  repeat: number
  // 值越小，越容易刷新
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
  destructibleType?: DestructibleType
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
      destructibleType: DestructibleType.BOX,
      destructibleFreq: 1000,
      destructibleChance: 10,
      destructibleChanceMax: 50,
      maxDestructibles: 10,
      minimum: 10,
      frequency: 1500,
      enemies: [EnemyType.GHOST1]
    },
    {
      minute: 1,
      minimum: 30,
      frequency: 1500,
      enemies: [EnemyType.ZOMBIE1, EnemyType.GHOST2],
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
      bosses: [EnemyType.GHOST_BOSS2],
      events: [
        {
          eventType: StageEventType.BAT_SWARM,
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
          chance: 50
        }
      ]
    },
    {
      minute: 5,
      minimum: 10,
      frequency: 1000,
      enemies: [EnemyType.ZOMBIE2],
      bosses: [EnemyType.GHOST_BOSS1],
      events: [
        {
          eventType: StageEventType.BAT_SWARM,
          delay: 5000,
          repeat: 3,
          chance: 50
        }
      ]
    },
    {
      minute: 6,
      minimum: 20,
      frequency: 500,
      enemies: [EnemyType.ZOMBIE1, EnemyType.ZOMBIE2],
      events: [
        {
          eventType: StageEventType.BAT_SWARM,
          delay: 5000,
          repeat: 1,
          chance: 10
        }
      ]
    },
    {
      minute: 7,
      minimum: 80,
      frequency: 500,
      enemies: [EnemyType.GHOST2, EnemyType.GHOST3, EnemyType.ZOMBIE2],
      bosses: [EnemyType.GHOST_BOSS2],
      events: [
        {
          eventType: StageEventType.BAT_SWARM,
          delay: 5000,
          repeat: 4,
          chance: 70
        }
      ]
    },
    {
      minute: 8,
      minimum: 100,
      frequency: 1500,
      enemies: [EnemyType.ZOMBIE1, EnemyType.ZOMBIE2],
      bosses: [EnemyType.OGRE],
      events: [
        {
          eventType: StageEventType.BAT_SWARM,
          delay: 15000,
          repeat: 4,
          chance: 80
        }
      ]
    },
    {
      minute: 9,
      minimum: 30,
      frequency: 500,
      enemies: [EnemyType.ZOMBIE2, EnemyType.OGRE],
      events: [
        {
          eventType: StageEventType.BAT_SWARM,
          delay: 15000,
          repeat: 2,
          chance: 70
        }
      ]
    },
    {
      minute: 10,
      minimum: 10,
      frequency: 500,
      enemies: [EnemyType.POO, EnemyType.OGRE],
      bosses: [EnemyType.GOBLIN_BOSS]
      // events: []
    },
    {
      minute: 11,
      minimum: 300,
      frequency: 100,
      enemies: [EnemyType.BAT],
      events: [
        {
          eventType: StageEventType.BAT_SWARM,
          delay: 5000,
          repeat: 1,
          chance: 10
        }
      ]
    },
    {
      minute: 12,
      minimum: 20,
      frequency: 250,
      enemies: [EnemyType.GOBLIN, EnemyType.GHOST2, EnemyType.ALIEN],
      bosses: [EnemyType.GHOST_BOSS1],
      events: [
        {
          eventType: StageEventType.BAT_SWARM,
          delay: 5000,
          repeat: 1,
          chance: 10
        }
      ]
    },
    {
      minute: 13,
      minimum: 200,
      frequency: 100,
      enemies: [EnemyType.OGRE, EnemyType.GHOST2, EnemyType.GHOST3],
      bosses: [EnemyType.GHOST_BOSS1],
      events: [
        {
          eventType: StageEventType.BAT_SWARM,
          delay: 2300,
          repeat: 20,
          chance: 70
        }
      ]
    },
    {
      minute: 14,
      minimum: 100,
      frequency: 100,
      enemies: [EnemyType.ALIEN, EnemyType.ZOMBIE1],
      bosses: [EnemyType.HORN]
    },
    {
      destructibleType: DestructibleType.GIFT,
      minute: 15,
      minimum: 100,
      frequency: 100,
      enemies: [EnemyType.GOBLIN, EnemyType.HORN],
      bosses: [EnemyType.ALIEN_BOSS]
    },
    {
      destructibleType: DestructibleType.GIFT,
      minute: 16,
      minimum: 500,
      frequency: 100,
      enemies: [EnemyType.HORN, EnemyType.GOBLIN, EnemyType.ALIEN],
      bosses: [EnemyType.ALIEN_BOSS]
    }
  ]
}

export default STAGES
