import Game from '../Game'
import GameCore from '../GameCore'

export default class MainUi {
  scene: Phaser.Scene
  SurvivedSecondsText: Phaser.GameObjects.Text
  PlayerLevelText: Phaser.GameObjects.Text
  KillsText: Phaser.GameObjects.Text
  PlayerCoinsText: Phaser.GameObjects.Text
  constructor(scene: Phaser.Scene) {
    this.scene = scene
    this.SurvivedSecondsText = this.scene.add
      .text(0.5 * this.scene.renderer.width, 25, '已存活 0:00', {
        color: 'black',
        fontSize: '20px',
        fontStyle: 'bold'
      })
      .setScrollFactor(0)
      .setOrigin(0.5, 0)
    this.PlayerLevelText = this.scene.add
      .text(this.scene.renderer.width - 4, 9, '等级 99', {
        color: 'black',
        fontSize: '12px',
        fontStyle: 'bold'
      })
      .setScrollFactor(0)
      .setOrigin(1, 0.5)
    this.KillsText = this.scene.add
      .text(0.85 * this.scene.renderer.width - 4, 25, '击败 9999', {
        color: 'black',
        fontSize: '12px',
        fontStyle: 'bold'
      })
      .setScrollFactor(0)
      .setOrigin(1, 0.5)
      .setDepth(GameCore.ZInGameUI - 3)
    this.PlayerCoinsText = this.scene.add
      .text(this.scene.renderer.width - 4, 25, '金币 9999', {
        color: 'black',
        fontSize: '12px',
        fontStyle: 'bold'
      })
      .setScrollFactor(0)
      .setOrigin(1, 0.5)
      .setDepth(GameCore.ZInGameUI - 3)
  }
  SetSurvivedSeconds(survivedSeconds: number) {
    this.SurvivedSecondsText.setText(`已存活 ${MainUi.FormatTime(survivedSeconds)}`)
  }
  UpdateCoins() {
    this.PlayerCoinsText.setText(`金币 ${Game.Core.PlayerOptions.RunCoins.toFixed(0).toLocaleString()}`)
  }
  UpdateKills() {
    this.KillsText.setText(`击败 ${Game.Core.PlayerOptions.RunEnemies.toFixed(0).toLocaleString()}`)
  }
  UpdatePlayerLevel() {
    this.PlayerLevelText.setText(`等级 ${Game.Core.Player.level}`)
  }
  static FormatTime(survivedSeconds: number) {
    return `${Math.floor(survivedSeconds / 60)}:${(survivedSeconds % 60).toString().padStart(2, '0')}`
  }
}
