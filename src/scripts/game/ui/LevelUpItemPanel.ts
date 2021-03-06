import PICKUPS from '../../consts/PICKUPS'
import WEAPONS from '../../consts/WEAPONS'
import PickupType from '../../enums/PickupType'
import WeaponType from '../../enums/WeaponType'
import { Sizer } from 'phaser3-rex-plugins/templates/ui/ui-components'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js'

export default class LevelUpItemPanel extends Sizer {
  weaponType: WeaponType | PickupType
  rexUI: RexUIPlugin
  Icon: any
  Name: any
  Description: any
  NextLevel: any
  constructor(scene: Phaser.Scene, width: number) {
    super(scene, {
      width: width - 20,
      orientation: 1,
      space: { left: 10, right: 10, top: 10, bottom: 10, item: 10 }
    })
    this.rexUI = scene.rexUI
    this.addBackground(this.rexUI.add.roundRectangle(0, 0, 0, 0, 5, 0x4e342e))
    /// @ts-ignore
    const iconAndNameSizer = this.rexUI.add
      .sizer({ width: width - 20, space: { item: 5 } })
      .add(this.scene.add.image(0, 0, 'main', 'leg_bullet.png').setDisplaySize(32, 32), { key: 'Icon' })
      .add(this.scene.add.text(0, 0, 'Name', { fontSize: '20px', color: '#ffffff' }), { key: 'Name' })
      .addSpace()
      .add(this.scene.add.text(0, 0, 'New', { fontSize: '12px', color: '#ffffff' }), {
        align: 'right-top',
        key: 'NextLevel'
      })
    this.add(iconAndNameSizer)
    /// @ts-ignore
    this.add(this.scene.add.text(0, 0, 'Description', { fontSize: '16px', color: '#ffffff' }), {
      align: 'left',
      key: 'Description'
    })
    this.Icon = iconAndNameSizer.getElement('Icon')
    this.Name = iconAndNameSizer.getElement('Name')
    this.NextLevel = iconAndNameSizer.getElement('NextLevel')
    this.Description = this.getElement('Description')
  }
  AssignData(weaponType: WeaponType, level: number = 0) {
    this.weaponType = weaponType
    const weaponData = WEAPONS[weaponType][0]
    this.Name.setText(weaponData.name)
    this.Icon.setFrame(weaponData.frameName)
    this.Icon.setDisplaySize(32, 32)
    if (level > 0) {
      const nextLevelData = WEAPONS[weaponType][level]
      this.NextLevel.setText(`lV ${level + 1}`)
      this.NextLevel.setColor('white')
      this.Description.setText(LevelUpItemPanel.ParseLevelUpInfo(nextLevelData, weaponData.isPowerUp))
    } else {
      this.NextLevel.setText('New')
      this.NextLevel.setColor('yellow')
      this.Description.setText(weaponData.description)
    }
  }
  static ParseLevelUpInfo(nextLevelData: any, isPowerUp: any): string | string[] {
    let temp = ''
    for (const key in nextLevelData) {
      const v = nextLevelData[key]
      switch (key) {
        case 'power':
          temp += `${isPowerUp ? '[??????]???????????????' : '???????????????'}${
            isPowerUp ? (v * 100).toFixed(0) : (v * 10).toFixed(0)
          }${isPowerUp ? '%' : ''}\n`
          break
        case 'area':
          temp += `${isPowerUp ? '[??????]' : ''}??????????????????${(v * 100).toFixed(0)}%\n`
          break
        case 'amount':
          temp += `${isPowerUp ? '[??????]' : ''}??????????????????${v}???\n`
          break
        case 'interval':
          temp += `${isPowerUp ? '[??????]' : ''}??????????????????${(v * -0.001).toFixed(1)}???\n`
          break
        case 'duration':
          temp += `${isPowerUp ? '[??????]' : ''}??????????????????${
            isPowerUp ? (v * 100).toFixed(1) : (v * 0.001).toFixed(1)
          }${isPowerUp ? '%' : ''}???\n`
          break
        case 'speed':
          temp += `${isPowerUp ? '[??????]' : ''}??????????????????${(v * 100).toFixed(0)}%\n`
          break
        case 'cooldown':
          temp += `${isPowerUp ? '[??????]' : ''}??????????????????${(v * -100).toFixed(1)}???\n`
          break
        case 'magnet':
          temp += '??????????????????' + (100 * v).toFixed(0) + '%\n'
          break
        case 'armor':
          temp += `????????????${v}\n`
          break
        case 'maxHp':
          temp += `??????????????????${(v * 100).toFixed(1)}%\n`
          break
        case 'growth':
          temp += '??????????????????' + (100 * v).toFixed(0) + '%\n'
          break
        case 'moveSpeed':
          temp += '??????????????????' + (100 * v).toFixed(0) + '%\n'
          break
        case 'luck':
          temp += '???????????????' + (100 * v).toFixed(0) + '%\n'
          break
        case 'penetrating':
          temp += `${isPowerUp ? '[??????]' : ''}????????????${v.toFixed(0)}\n`
          break
      }
    }
    return temp.replace(/\n$/, '')
  }

  AssignItemData(pickupType: PickupType) {
    this.weaponType = pickupType
    const itemData = PICKUPS[pickupType]
    this.Name.setText(itemData.name)
    this.Description.setText(itemData.description)
    this.NextLevel.setText('')
    this.Icon.setFrame(itemData.framName)
    this.Icon.setDisplaySize(32, 32)
  }
}
