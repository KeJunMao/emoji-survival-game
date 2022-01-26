import Scenes from '../enums/Scenes'
import Game from './Game'

export default class SceneManager {
  Game: Phaser.Game
  scene: Phaser.Scenes.ScenePlugin
  MainScene: Phaser.Scene
  UI_levelUpScene: Phaser.Scene
  constructor(game: Phaser.Game, scene: Phaser.Scenes.ScenePlugin) {
    this.Game = game
    this.scene = scene
  }
  Init() {
    this.MainScene = this.scene.get(Scenes.MainScene)
    this.UI_levelUpScene = this.scene.get(Scenes.UI_levelUpScene)
  }
  EnterLevelUp() {
    this.scene.pause(this.MainScene)
    Game.Core.FreezeSnapshot(() => {
      this.scene.launch(this.UI_levelUpScene)
    })
  }
  ResumeFromLevelUp() {
    // us.ApplyGameResolution(),
    this.scene.resume(this.MainScene)
    this.scene.stop(this.UI_levelUpScene)
    // this.UI_overlayScene.DestroyGrid()
    // Game.Core.RemoveSnapshot()
    // Game.Core.ExitLevelUpScene()
  }
}
