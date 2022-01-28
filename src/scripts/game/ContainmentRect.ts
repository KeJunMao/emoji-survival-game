import Game from './Game'

export default class ContainmentRect extends Phaser.Geom.Rectangle {
  index: number
  constructor(e = 1, t = 0, i = 0) {
    super(0, 0, 0, 0),
      (this.index = 1),
      (this.width = t > 0 ? t : Game.Core.scene.renderer.width * e),
      (this.height = i > 0 ? i : Game.Core.scene.renderer.height * e)
  }
  DespawnIfOutside(e) {
    const t = e[this.index % e.length]
    if ((this.index++, !t)) return false
    if (!t.isCullable && !t.isTeleportOnCull) return false
    var i = Math.abs(Game.Core.Player.x - t.x),
      s = Math.abs(Game.Core.Player.y - t.y)
    if (!this.contains(i, s)) {
      if (t.isTeleportOnCull) return t.OnTeleportOnCull(), false
      t.DeSpawn()
    }
    return true
  }
  Contains(e) {
    var t = Math.abs(Game.Core.Player.x - e.x),
      i = Math.abs(Game.Core.Player.y - e.y)
    return this.contains(t, i)
  }
}
