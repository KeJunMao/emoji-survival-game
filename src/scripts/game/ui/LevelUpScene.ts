import { APP_HEIGHT, APP_POSITION_CONFIG, DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../..'
import PickupType from '../../enums/PickupType'
import Scenes from '../../enums/Scenes'
import WeaponType from '../../enums/WeaponType'
import Game from '../Game'
import LevelUpItemPanel from './LevelUpItemPanel'
import { Sizer } from 'phaser3-rex-plugins/templates/ui/ui-components'

export default class LevelUpScene extends Phaser.Scene {
  CurrentAmountOfPanels: number
  panels: LevelUpItemPanel[]
  background: Phaser.GameObjects.Graphics
  mask: any
  headerText: Phaser.GameObjects.Text
  footerText: Phaser.GameObjects.Text
  sizer: Sizer
  constructor(scene: Phaser.Scene) {
    super({ key: Scenes.UI_levelUpScene })
    this.panels = new Array()
    this.CurrentAmountOfPanels = 3
  }
  create() {
    const width = APP_POSITION_CONFIG.width * 0.8
    this.mask = this.add.graphics().setScrollFactor(0)
    this.mask.fillStyle(0x000000, 0.8)
    this.mask.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height)
    this.sizer = this.rexUI.add.sizer({
      width: width,
      anchor: {
        centerX: 'center',
        centerY: 'center'
      },
      space: { left: 10, right: 10, top: 20, bottom: 20, item: 15 },
      orientation: 1
    })
    this.sizer.addBackground(this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0xffffff))
    this.headerText = this.add.text(0, 0, '选择强化!', { fontSize: '24px', color: '#000000' })
    this.sizer.add(this.headerText, {})
    for (let i = 0; i < 4; i++) {
      this.panels[i] = new LevelUpItemPanel(this, width)
      this.sizer.add(this.panels[i], {})
    }
    this.footerText = this.add.text(0, 0, '幸运值越高，强化选项越多!', { fontSize: '12px', color: '#000000' })
    this.sizer.add(this.footerText)
    if (Game.Core.LevelUpFactory.HasPowerupsInStore()) {
      this.PickRandomLevelUps()
    } else {
      this.PickItemLevelUps()
    }
    this.sizer.layout()
  }
  PickItemLevelUps() {
    const levelUpItems = Game.Core.LevelUpFactory.GetLevelUpItems()
    this.CurrentAmountOfPanels = levelUpItems.length
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
      this.rexUI.add.click(panel).once('click', () => {
        this.OnItemButtonClicked(panel.weaponType as PickupType)
      })
    })
  }
  OnItemButtonClicked(weaponType: PickupType) {
    Game.Core.MakeAndActivatePickup(weaponType)
    Game.Core.SceneManager.ResumeFromLevelUp()
  }
  PickRandomLevelUps() {
    const levelUpItems = Game.Core.LevelUpFactory.GetLevelUpPowerups()
    this.CurrentAmountOfPanels = levelUpItems.length
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
      this.rexUI.add.click(panel).once('click', () => {
        this.OnButtonClicked(panel.weaponType as WeaponType)
      })
    })
  }
  OnButtonClicked(weaponType: WeaponType) {
    Game.Core.LevelWeaponUp(weaponType)
    Game.Core.SceneManager.ResumeFromLevelUp()
  }
}
