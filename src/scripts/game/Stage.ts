import STAGES, { StageEvent } from '../consts/STAGES'
import EnemyType from '../enums/EnemyType'
import StageType from '../enums/StageType'
import EnemyGroup from './enemy/EnemyGroup'
import Game from './Game'
import StageEventManager from './StageEventManager'

export default class Stage {
  stageEventManager: StageEventManager
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
  events: StageEvent[]
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
    this.stageEventManager = new StageEventManager(scene, this)
  }
  Init() {
    this.minute = 0
    const stageData = STAGES[this.levelType][this.minute]
    this.UpdateData(stageData)
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

  CheckMinute() {
    var e,
      t = Math.floor(Game.Core.SurvivedSeconds / 60)
    t > this.minute &&
      (e = STAGES[this.levelType].find(e => e.minute === t)) &&
      ((this.minute = e.minute), this.UpdateData(e)),
      (this.hasAttachedTreasure = !1),
      this.SpawnBoss()
  }
  SpawnBoss() {
    for (let t = 0; t < this.bossPools.length; t++) {
      if (!this.bossPools[t].enabled) continue
      let i = 2 * Math.PI * Math.random(),
        s = 256 * Math.random(),
        n = Game.Core.Player.x + 0.9 * Math.cos(i) * (this.scene.renderer.width + s),
        a = Game.Core.Player.y + 0.9 * Math.sin(i) * (this.scene.renderer.height + s)
      var e = this.bossPools[t].SpawnAt(n, a)
      ;(e.isTeleportOnCull = !0),
        !this.hasAttachedTreasure &&
          this.treasure &&
          this.SetTreasureLevelFromChance(this.treasure) > 0 &&
          ((this.hasAttachedTreasure = !0), e.AttachTreasure(this.treasure))
    }
  }
  SetTreasureLevelFromChance(e: any) {
    var t,
      i = null === (t = Game.Core.Player) || void 0 === t ? void 0 : t.luck
    return (
      void 0 === i && (i = 1),
      100 * Math.random() <= e.chances[0] * i
        ? ((e.level = 3), 3)
        : 100 * Math.random() <= e.chances[1] * i
        ? ((e.level = 2), 2)
        : 100 * Math.random() <= e.chances[2] * i
        ? ((e.level = 1), 1)
        : 0
    )
  }

  UpdateData(stageData) {
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
      this.stageEventManager.TriggerEvent(v)
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
    // console.log('SpawnDestructibleOutOfSight')
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
    this.bosses.forEach(e => {
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
      this.SwarmCheck()
    }
  }
  SwarmCheck() {
    if (!Game.Core.IsTimeStopped)
      for (var e = 0; Game.Core.Enemies.length < this.minimum * this.minimumMultiplier && e < this.maximum; )
        this.SpawnEnemiesInOuterRect(), e++
  }
  SpawnAt(e, t, i, s) {
    if (Game.Core.IsTimeStopped) return null
    if (Game.Core.Enemies.length >= this.maximum) return null
    let n = this.pools.find(e => e.enemyType === i),
      a
    return n && (a = n.SpawnAt(e, t, s)), a
  }
}
