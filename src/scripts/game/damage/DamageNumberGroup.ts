import DamageNumber from './DamageNumber'

export default class DamageNumberGroup {
  stored: DamageNumber[]
  spawned: DamageNumber[]
  scene: Phaser.Scene
  constructor(scene: Phaser.Scene) {
    this.stored = new Array()
    this.spawned = new Array()
    this.scene = scene
  }
  SpawnAt(x: number, y: number, PPower: number) {
    const number = this.Spawn()
    number.OnRecycle(x, y, PPower)
    return number
  }
  Spawn() {
    let number = this.stored.pop()
    if (!number) {
      number = this.Make()
      number.Init()
      this.spawned.push(number)
    }
    return number
  }
  Return(number: DamageNumber) {
    const index = this.spawned.indexOf(number)
    if (index > -1) {
      this.spawned.splice(index, 1)
    }
    this.stored.push(number)
  }
  Make() {
    return new DamageNumber(this, 0, 0)
  }
}
