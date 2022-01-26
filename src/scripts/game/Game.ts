import GameCore from './GameCore'
import GameSound from './GameSound'

export default class Game extends Phaser.Game {
  static _core: GameCore
  static _sound: GameSound

  static get Core(): GameCore {
    return this._core
  }
  static set Core(core: GameCore) {
    this._core = core
  }

  static get Sound() {
    return this._sound
  }
  static set Sound(sound: GameSound) {
    this._sound = sound
  }

  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config)
  }

  /**
   * 应用新分辨率
   */
  static ApplyGameResolution() {}

  /**
   * 应用菜单分辨率
   */
  static ApplyMenuResolution() {}
}
