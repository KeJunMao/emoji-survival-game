import DestructibleType from '../../enums/DestructibleType'
import Game from '../Game'
import Destructible from './Destructible'

export default class DestructibleGroup extends Phaser.GameObjects.Group {
  stored: Destructible[]
  spawned: Destructible[]
  constructor(scene: Phaser.Scene) {
    super(scene)
    this.stored = new Array()
    this.spawned = new Array()
    this.Init()
  }
  Init() {
    this.scene.add.existing(this)
  }
  SpawnAt(x: number, y: number, type: DestructibleType) {
    const item = this.Spawn(type)
    item.setPosition(x, y)
    item.OnRecycle()

    return item
  }
  Spawn(type: DestructibleType) {
    let item = this.stored.pop()
    if (!item) {
      item = this.Make(type)
      item.Init()
      this.add(item, true)
      this.spawned.push(item)
      Game.Core.Destructibles.push(item)
    }
    return item
  }
  Return(item: Destructible) {
    this.remove(item, true, false)
    this.spawned.splice(this.spawned.indexOf(item), 1)
    Game.Core.Destructibles.splice(Game.Core.Destructibles.indexOf(item), 1)
    this.stored.push(item)
  }
  Make(type: DestructibleType) {
    return new Destructible(this, 0, 0, type)
  }
}
