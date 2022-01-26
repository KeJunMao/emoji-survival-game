import EnemyType from '../../enums/EnemyType'
import Game from '../Game'
import Enemy from './Enemy'

export default class EnemyGroup extends Phaser.GameObjects.Group {
  stored: Enemy[]
  spawned: Enemy[]
  enemyType: EnemyType
  enabled: boolean
  constructor(scene: Phaser.Scene, enemyType: EnemyType) {
    super(scene)
    this.stored = []
    this.spawned = []
    this.enemyType = enemyType
    this.enabled = true
    this.Init(enemyType)
  }

  Init(enemyType: EnemyType) {
    this.enemyType = enemyType
    this.scene.add.existing(this)
  }

  SpawnAt(x: number, y: number, owner?: any) {
    const enemy = this.Spawn()
    enemy.setPosition(x, y)
    enemy.setOwner(owner)
    return enemy
  }

  Spawn() {
    let enemy = this.stored.pop()
    if (!enemy) {
      enemy = this.Make()
      enemy.Init()
      this.scene.children.add(enemy)
      enemy.OnRecycle()
      this.add(enemy, true)
      this.spawned.push(enemy)
      Game.Core.Enemies.push(enemy)
      Game.Core.EnemyGroup.add(enemy, false)
    }
    return enemy
  }
  Recycle(enemy: Enemy) {
    this.scene.children.remove(enemy)
    this.remove(enemy, true, false)
    this.spawned.splice(this.spawned.indexOf(enemy), 1)
    const index = Game.Core.Enemies.indexOf(enemy)
    if (index > -1) {
      Game.Core.Enemies.splice(index, 1)
      Game.Core.EnemyGroup.remove(enemy, false)
      this.stored.push(enemy)
      if (enemy.owner) {
        // enemy.owner.OnDespawn(enemy)
      }
    }
  }
  Make() {
    return new Enemy(this, 0, 0, this.enemyType)
  }
}
