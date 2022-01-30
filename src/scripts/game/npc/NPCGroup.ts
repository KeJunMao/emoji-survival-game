import NPCType from '../../enums/NPCType'
import Game from '../Game'
import BaseNPC from './BaseNPC'

export default class NPCGroup extends Phaser.GameObjects.Group {
  stored: BaseNPC[]
  spawned: BaseNPC[]
  constructor(scene: Phaser.Scene) {
    super(scene)
    this.stored = new Array()
    this.spawned = new Array()
    this.Init()
  }
  Init() {
    this.scene.add.existing(this)
  }
  SpawnAt(x: number, y: number, type: NPCType) {
    const item = this.Spawn(type)
    item.setPosition(x, y)
    item.OnRecycle()

    return item
  }
  Spawn(type: NPCType) {
    let item = this.stored.pop()
    if (!item) {
      item = this.Make(type)
      item.Init()
    }
    this.add(item, true)
    this.spawned.push(item)
    // Game.Core.Destructibles.push(item)
    return item
  }
  Return(item: BaseNPC) {
    this.remove(item, true, false)
    this.spawned.splice(this.spawned.indexOf(item), 1)
    // Game.Core.Destructibles.splice(Game.Core.Destructibles.indexOf(item), 1)
    this.stored.push(item)
  }
  Make(type: NPCType) {
    return new BaseNPC(this, 0, 0, type)
  }
}
