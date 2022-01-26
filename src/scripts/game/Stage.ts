import STAGES from '../consts/STAGES'
import EnemyType from '../enums/EnemyType'
import StageType from '../enums/StageType'
import EnemyGroup from './enemy/EnemyGroup'
import Game from './Game'

export default class Stage {
  CheckMinute() {
    // throw new Error('Method not implemented.')
  }
  levelName: string
  description: string
  minute: number
  frequency: number
  pause: number
  startingSpawns: number
  minimum: number
  maximum: number
  enemies: EnemyType[]
  bosses: any[]
  BGTextureName: string
  minimumMultiplier: number
  maxTreasureLuck: number
  destructibleFreq: number
  destructibleChance: number
  destructibleChanceMax: number
  maxDestructibles: number
  pools: EnemyGroup[]
  bossPools: any[]
  hasAttachedTreasure: boolean
  hasTileset: boolean
  scene: Phaser.Scene
  levelType: StageType
  rectOuter: Phaser.Geom.Rectangle
  rectInner: Phaser.Geom.Rectangle
  events: never[]
  treasure: null
  SpawnTimer: Phaser.Time.TimerEvent
  DestructibleTimer: Phaser.Time.TimerEvent
  constructor(scene: Phaser.Scene, stage: StageType) {
    this.levelName = ''
    this.description = ''
    this.minute = 0
    this.frequency = 1e3
    this.pause = 0
    this.startingSpawns = 0
    this.minimum = 0
    this.maximum = 500
    // this.destructibleType = ne.BRAZIER;
    this.enemies = new Array()
    this.bosses = new Array()
    this.BGTextureName = ''
    this.minimumMultiplier = 1
    this.maxTreasureLuck = 20
    this.destructibleFreq = 1e4
    this.destructibleChance = 5
    this.destructibleChanceMax = 50
    this.maxDestructibles = 10
    this.pools = new Array()
    this.bossPools = new Array()
    this.hasAttachedTreasure = false
    this.hasTileset = false
    this.scene = scene
    this.levelType = stage
    // this.stageEventManager = new Ye(this.scene; this)
  }
  Init() {
    this.minute = 0
    const stageData = STAGES[this.levelType][this.minute]
    this.updateData(stageData)
    this.rectOuter = new Phaser.Geom.Rectangle(
      -0.5 * this.scene.renderer.width - 150,
      -0.5 * this.scene.renderer.height - 150,
      this.scene.renderer.width + 200,
      this.scene.renderer.height + 200
    )
    this.rectInner = new Phaser.Geom.Rectangle(
      -0.5 * this.scene.renderer.width - 75,
      -0.5 * this.scene.renderer.height - 75,
      this.scene.renderer.width + 100,
      this.scene.renderer.height + 100
    )
    for (let e = 0; e < this.startingSpawns; e++) {
      this.SpawnEnemiesInOuterRect()
    }
  }

  updateData(stageData) {
    this.events = []
    this.bosses = []
    this.treasure = null
    for (const key in stageData) {
      if (this.hasOwnProperty(key)) {
        this[key] = stageData[key]
      }
    }
    this.updateEnemyPools()
    this.updateTimers()
    this.playEvents()
  }
  playEvents() {
    this.events.forEach(v => {
      // this.stageEventManager.TriggerEvent(e)
    })
  }
  updateTimers() {
    if (this.pause) {
      Game.Core.scene.time.addEvent({
        delay: this.pause,
        loop: false,
        callback: () => {
          this.startTimers()
        }
      })
    } else {
      this.startTimers()
    }
  }
  startTimers() {
    Game.Core.scene.time.removeEvent(this.SpawnTimer)
    this.SpawnTimer = Game.Core.scene.time.addEvent({
      delay: this.frequency,
      loop: true,
      callback: () => {
        this.SpawnEnemiesInOuterRect()
      }
    })
    Game.Core.scene.time.removeEvent(this.DestructibleTimer)
    this.DestructibleTimer = Game.Core.scene.time.addEvent({
      delay: this.destructibleFreq,
      loop: true,
      callback: () => {
        this.SpawnDestructibleOutOfSight()
      }
    })
  }
  SpawnDestructibleOutOfSight() {
    console.log('SpawnDestructibleOutOfSight')
    // console.log(this.pools[0].spawned)
  }
  updateEnemyPools() {
    this.pools.forEach(e => {
      e.enabled = false
    })
    this.bossPools.forEach(e => (e.enabled = false))
    this.enemies.forEach(e => {
      const enemy = this.pools.find(v => v.enemyType === e)
      if (enemy) {
        enemy.enabled = true
      } else {
        this.pools.push(new EnemyGroup(this.scene, e))
      }
    })
    this.bossPools.forEach(e => {
      const enemy = this.bossPools.find(e => e.enemyType === e)
      if (enemy) {
        enemy.enabled = true
      } else {
        this.bossPools.push(new EnemyGroup(this.scene, e))
      }
    })
  }
  SpawnEnemiesInOuterRect() {
    if (Game.Core.IsTimeStopped) {
      return
    }
    if (Game.Core.Enemies.length >= this.maximum) {
      return
    }
    let flag = false
    for (let i = 0; i < this.pools.length; i++) {
      if (!this.pools[i].enabled) continue
      const rect = Phaser.Geom.Rectangle.RandomOutside(this.rectOuter, this.rectInner)
      let x = Game.Core.Player.x + rect.x
      let y = Game.Core.Player.y + rect.y
      this.pools[i].SpawnAt(x, y)
      flag = true
    }
    if (flag) {
      // this.SwarmCheck()
    }
  }
  SwarmCheck() {
    if (!Game.Core.IsTimeStopped)
      for (var e = 0; Game.Core.Enemies.length < this.minimum * this.minimumMultiplier && e < this.maximum; )
        this.SpawnEnemiesInOuterRect(), e++
  }
}
