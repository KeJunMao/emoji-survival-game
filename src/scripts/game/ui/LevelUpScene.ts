import { APP_HEIGHT, APP_POSITION_CONFIG, DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../..'
import PickupType from '../../enums/PickupType'
import Scenes from '../../enums/Scenes'
import WeaponType from '../../enums/WeaponType'
import Game from '../Game'
import LevelUpItemPanel from './LevelUpItemPanel'

export default class LevelUpScene extends Phaser.Scene {
  CurrentAmountOfPanels: number
  panels: LevelUpItemPanel[]
  background: Phaser.GameObjects.Graphics
  mask: any
  headerText: Phaser.GameObjects.Text
  footerText: Phaser.GameObjects.Text
  constructor(scene: Phaser.Scene) {
    super({ key: Scenes.UI_levelUpScene })
    this.panels = new Array()
    this.CurrentAmountOfPanels = 3
  }
  create() {
    const width = APP_POSITION_CONFIG.width * 0.8
    const height = APP_HEIGHT * 0.8
    const backgroundX = this.cameras.main.width * 0.5 - width / 2
    const backgroundY = this.cameras.main.height * 0.5 - height / 2
    this.mask = this.add.graphics().setScrollFactor(0)
    this.mask.fillStyle(0xffffff, 0.8)
    this.mask.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height)
    this.background = this.add.graphics().setScrollFactor(0)
    this.background.fillStyle(0x333333, 0.8)
    this.background.fillRect(backgroundX, backgroundY, width, height)
    this.headerText = this.add
      .text(this.renderer.width * 0.5, backgroundY + 40, '选择强化!', { fontSize: '32px', color: '#000000' })
      .setOrigin(0.5, 0.5)
    this.footerText = this.add
      .text(this.renderer.width * 0.5, this.renderer.height * 0.9, '幸运值越高，强化选项越多', {
        fontSize: '32px',
        color: '#000000'
      })
      .setOrigin(0.5, 0.5)
    for (let i = 0; i < 4; i++) {
      const panelWidth = width * 0.95
      const panelHeight = height * 0.2
      const panelX = this.renderer.width * 0.5 - panelWidth / 2
      const panelY = backgroundY + i * panelHeight + 60 + i * 2
      this.panels[i] = new LevelUpItemPanel(this, panelX, panelY, panelWidth, panelHeight)
      this.add.existing(this.panels[i])
    }
    if (Game.Core.LevelUpFactory.HasPowerupsInStore()) {
      this.PickRandomLevelUps()
    } else {
      this.PickItemLevelUps()
    }
  }
  PickItemLevelUps() {
    const levelUpItems = Game.Core.LevelUpFactory.GetLevelUpItems()
    this.CurrentAmountOfPanels = levelUpItems.length
    this.footerText.setVisible(false)
    this.panels.forEach(panel => {
      const item = levelUpItems.pop()
      if (item) {
        panel.visible = true
        panel.AssignItemData(item)
      } else {
        panel.visible = false
      }
    })
    this.enableItemPanelsInput()
  }
  enableItemPanelsInput() {
    this.panels.forEach(panel => {
      panel.once(
        'pointerdown',
        () => {
          this.OnItemButtonClicked(panel.weaponType as PickupType)
        },
        this
      )
    })
  }
  OnItemButtonClicked(weaponType: PickupType) {
    Game.Core.MakeAndActivatePickup(weaponType)
    Game.Core.SceneManager.ResumeFromLevelUp()
  }
  PickRandomLevelUps() {
    const levelUpItems = Game.Core.LevelUpFactory.GetLevelUpPowerups()
    this.CurrentAmountOfPanels = levelUpItems.length
    this.footerText.setVisible(false)
    this.panels.forEach(panel => {
      const item = levelUpItems.pop()
      if (item) {
        panel.visible = true
        panel.AssignData(item, Game.Core.GetWeaponLevel(item))
      } else {
        panel.visible = false
      }
    })
    this.enablePanelsInput()
  }
  enablePanelsInput() {
    this.panels.forEach(panel => {
      panel.once(
        'pointerdown',
        () => {
          this.OnButtonClicked(panel.weaponType as WeaponType)
        },
        this
      )
    })
  }
  OnButtonClicked(weaponType: WeaponType) {
    Game.Core.LevelWeaponUp(weaponType)
    Game.Core.SceneManager.ResumeFromLevelUp()
  }
}
