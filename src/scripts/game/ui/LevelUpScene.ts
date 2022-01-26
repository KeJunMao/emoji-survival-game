import Scenes from '../../enums/Scenes'
import Game from '../Game'

export default class LevelUpScene extends Phaser.Scene {
  constructor(scene: Phaser.Scene) {
    super({ key: Scenes.UI_levelUpScene })
  }
  create() {
    Game.Core.SceneManager.ResumeFromLevelUp()
    console.log('LevelUpScene.create()')
  }
}
