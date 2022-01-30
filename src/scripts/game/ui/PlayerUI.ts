import { NumberBar } from 'phaser3-rex-plugins/templates/ui/ui-components'
import Game from '../Game'
import CHARACTERS from '../../consts/CHARACTERS'
import GameCore from '../GameCore'
window['Percent'] = Phaser.Math.Percent
export default class PlayerUI {
  scene: Phaser.Scene
  xpBar: NumberBar
  hpBarOffset: any
  hpBarHeight: number
  hpBarWidth: number
  hpBar: any
  constructor(scene: Phaser.Scene) {
    this.scene = scene
    this.hpBarOffset = new Phaser.Math.Vector2(-25, 40)
    this.hpBarHeight = 4
    this.hpBarWidth = 50
    this.hpBar = scene.add.graphics().setScrollFactor(0)
    this.Init()
  }
  Init() {
    const character = CHARACTERS[Game.Core.PlayerOptions.SelectedCharacter][0]
    this.xpBar = this.scene.rexUI.add
      .numberBar({
        anchor: {
          top: 'top',
          left: 'left+2',
          right: 'right+2'
        },
        background: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x4e342e),
        icon: this.scene.rexUI.add.circleMaskImage(0, 0, 'main', character.spriteName).setDisplaySize(15, 15),
        width: this.scene.renderer.width - 4,
        slider: {
          track: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 5, 0xd0ada7),
          indicator: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 5, 0xd7634f),
          easeValue: { duration: 250 }
        },
        text: this.scene.add.text(0, 0, '等级1').setFixedSize(50, 0),
        space: {
          left: 5,
          right: 5,
          top: 2,
          bottom: 2,

          icon: 10,
          slider: 10
        }
      })
      .setScrollFactor(0)
      .setDepth(GameCore.ZInGameUI)
      .layout()
  }
  Update() {
    this.UpdateXpBar()
    this.UpdateHpBar()
  }

  UpdatePlayerLevel() {
    this.xpBar.setText(`等级 ${Game.Core.Player.level}`)
  }

  UpdateXpBar() {
    this.xpBar.easeValueTo(Game.Core.Player.xp, 0, Game.Core.LevelUpFactory.XpRequiredToLevelUp)
  }

  UpdateHpBar() {
    this.hpBar.clear()
    const hpValue = Game.Core.Player.hp / Game.Core.Player.maxHp
    // hpBar BG
    this.hpBar.fillStyle(0x000000, 1)
    this.hpBar.fillRect(this.hpBarX, this.hpBarY, this.hpBarWidth, this.hpBarHeight)
    // value
    this.hpBar.fillStyle(0xff0000, 1)
    this.hpBar.fillRect(this.hpBarX, this.hpBarY, this.hpBarWidth * hpValue, this.hpBarHeight)
  }

  get hpBarX() {
    return 0.5 * this.scene.renderer.width + this.hpBarOffset.x
  }

  get hpBarY() {
    return 0.5 * this.scene.renderer.height + this.hpBarOffset.y
  }
}
