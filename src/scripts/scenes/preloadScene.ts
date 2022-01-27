import CharacterType from '../enums/CharacterType'
import Scenes from '../enums/Scenes'
import Weapons from '../enums/WeaponType'
import Game from '../game/Game'
import GameCore from '../game/GameCore'
import SceneManager from '../game/SceneManager'

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: Scenes.PreloadScene })
  }

  preload() {
    this.load.image('bgTile', 'assets/img/bgTile.png')
    this.load.multiatlas('main', 'assets/img/main.json', 'assets/img')
  }

  create() {
    this.cameras.main.setBackgroundColor('#eee')
    this.cameras.main.zoom = 1.1
    Game.Core = new GameCore(this.game, this)
    Game.Core.SceneManager = new SceneManager(this.game, this.scene)
    Game.Core.SceneManager.Init()
    Game.Core.PlayerOptions.Load()

    this.scene.start(Scenes.MainScene)
  }
}
