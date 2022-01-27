import { StageEvent } from '../consts/STAGES'
import EnemyType from '../enums/EnemyType'
import StageEventType from '../enums/StageEventType'
import Enemy from './enemy/Enemy'
import EnemyGroup from './enemy/EnemyGroup'
import Game from './Game'
import Stage from './Stage'

export default class StageEventManager {
  scene: Phaser.Scene
  stage: Stage
  constructor(scene: Phaser.Scene, stage: Stage) {
    this.scene = scene
    this.stage = stage
  }
  TriggerEvent(e: StageEvent) {
    const eventType = e?.eventType
    const delay = e?.delay
    const chance = e?.chance
    const repeat = e?.repeat
    const duration = e?.duration
    if (eventType) {
      Game.Core.scene.time.addEvent({
        delay: delay,
        loop: false,
        repeat: repeat,
        callback: () => {
          this.TriggerSwitchEvent(eventType, chance, duration)
        }
      })
    } else {
      this.TriggerSwitchEvent(eventType, chance, duration)
    }
  }
  TriggerSwitchEvent(eventType: StageEventType, chance: any, duration: number = 10000) {
    const player = Game.Core.Player
    const luck = player.luck || 1
    if (!(chance && 100 * Math.random() > (chance * 1) / luck)) {
      switch (eventType) {
        case StageEventType.GHOST_SWARM:
          this.PlayGhostSwarm(duration)
        case StageEventType.BAT_SWARM:
          this.PlayBatSwarm(duration)
      }
    }
  }
  PlayBatSwarm(duration: number) {
    duration = duration || 10000
    let group = this.stage.pools.find(p => p.enemyType === EnemyType.GHOST_SWARM)
    if (!group) {
      group = new EnemyGroup(this.scene, EnemyType.BAT_SWARM)
      this.stage.pools.push(group)
      group.enabled = false
    }
    let baseX = 2 * Math.PI * Math.random()
    const enemys: Enemy[] = []
    for (let i = 0; i < 20; i++) {
      const x = Game.Core.Player.x + 0.8 * Math.cos(baseX) * (0.9 * this.scene.renderer.width)
      const y = Game.Core.Player.y + 0.8 * Math.sin(baseX) * (0.9 * this.scene.renderer.height)
      baseX += Math.PI / 500
      const enemy = group.SpawnAt(x, y)
      enemy.isCullable = false
      enemys.push(enemy)
    }
    Game.Core.scene.time.addEvent({
      delay: duration,
      loop: false,
      callback: () => {
        enemys.forEach(e => {
          e.isDead || e.Disappear()
        })
      }
    })
  }
  PlayGhostSwarm(duration: number = 10000) {
    duration = duration || 10000
    let group = this.stage.pools.find(p => p.enemyType === EnemyType.GHOST_SWARM)
    if (!group) {
      group = new EnemyGroup(this.scene, EnemyType.GHOST_SWARM)
      this.stage.pools.push(group)
      group.enabled = false
    }
    let baseX = 2 * Math.PI * Math.random()
    const enemys: Enemy[] = []
    for (let i = 0; i < 20; i++) {
      const x = Game.Core.Player.x + 0.8 * Math.cos(baseX) * (0.9 * this.scene.renderer.width)
      const y = Game.Core.Player.y + 0.8 * Math.sin(baseX) * (0.9 * this.scene.renderer.height)
      baseX += Math.PI / 500
      const enemy = group.SpawnAt(x, y)
      enemy.isCullable = false
      enemys.push(enemy)
    }
    Game.Core.scene.time.addEvent({
      delay: duration,
      loop: false,
      callback: () => {
        enemys.forEach(e => {
          e.isDead || e.Disappear()
        })
      }
    })
  }
}
