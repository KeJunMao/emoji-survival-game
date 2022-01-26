import Scenes from '../enums/Scenes'
import ContainmentRect from '../game/ContainmentRect'
import Game from '../game/Game'
import GameCore from '../game/GameCore'

export default class MainScene extends Phaser.Scene {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys
  wKey: Phaser.Input.Keyboard.Key
  aKey: Phaser.Input.Keyboard.Key
  sKey: Phaser.Input.Keyboard.Key
  dKey: Phaser.Input.Keyboard.Key
  spaceKey: Phaser.Input.Keyboard.Key
  pointer: Phaser.Input.Pointer
  _lastVelocity: Phaser.Math.Vector2
  cIndex: number
  cursorsVector: Phaser.Math.Vector2
  wasDown: boolean
  maxSpeed: number
  containmentRect_Enemies: ContainmentRect
  containmentRect_Bullets: ContainmentRect
  constructor() {
    super({ key: Scenes.MainScene })
    this._lastVelocity = new Phaser.Math.Vector2(1, 0)
    this.cIndex = 0
    this.cursorsVector = new Phaser.Math.Vector2(0, 0)
    this.wasDown = false
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this.spaceKey.on('down', () => {
      // todo pause game
    })
    this.pointer = this.input.activePointer
    Game.Core.InitGame(this, Game.Core.PlayerOptions.SelectedCharacter)
    this.containmentRect_Enemies = new ContainmentRect(0.7)
    this.containmentRect_Bullets = new ContainmentRect(0.55)
    this.cameras.main.startFollow(Game.Core.Player)
    // this.add.text(10, 10, '👻', { fontSize: '32px' })
  }

  update(time: number, delta: number): void {
    this.maxSpeed = GameCore.PlayerPxSpeed * Game.Core.Player.moveSpeed
    Game.Core.Player.lastFaceDirection = this._lastVelocity
    Game.Core.Player.Body.setVelocity(0)
    Game.Core.Player.Body.velocity = new Phaser.Math.Vector2(0, 0)
    let flag = false
    this.cursorsVector.x = 0
    this.cursorsVector.y = 0
    flag = this.updateCursors(delta)
    if (flag) {
      Game.Core.Player.setVelocity(this.cursorsVector.x, this.cursorsVector.y)
      this._lastVelocity.copy(Game.Core.Player.body.velocity)
    } else {
      Game.Core.Player.lastFaceDirection = this._lastVelocity
      // Game.Core.Player.Body.velocity.set(0)
    }
    if (!Game.Core.IsTimeStopped) {
      for (let e = 0; e < 10; e++) this.containmentRect_Enemies.DespawnIfOutside(Game.Core.EnemyGroup.children.entries)
      for (let e = 0; e < 10; e++) this.containmentRect_Bullets.DespawnIfOutside(Game.Core.BulletGroup.children.entries)
    }
    // if (!Game.Core.IsTimeStopped) {
    //   // todo
    // }
    Game.Core.Update(delta)
  }

  updateCursors(delta) {
    let flag = false
    if (this.cursors.left.isDown || this.aKey.isDown) {
      this.cursorsVector.x = -1
      flag = true
    } else if (this.cursors.right.isDown || this.dKey.isDown) {
      this.cursorsVector.x = 1
      flag = true
    }
    if (this.cursors.up.isDown || this.wKey.isDown) {
      this.cursorsVector.y = -1
      flag = true
    } else if (this.cursors.down.isDown || this.sKey.isDown) {
      this.cursorsVector.y = 1
      flag = true
    }
    if (this.cursorsVector.x !== 0 && this.cursorsVector.y !== 0) {
      this.cursorsVector.normalize()
    }
    this.cursorsVector.x *= this.maxSpeed
    this.cursorsVector.y *= this.maxSpeed
    return flag
  }
}
