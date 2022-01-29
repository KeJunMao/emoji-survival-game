import PICKUPS from '../../consts/PICKUPS'
import WEAPONS from '../../consts/WEAPONS'
import PickupType from '../../enums/PickupType'
import WeaponType from '../../enums/WeaponType'

export default class LevelUpItemPanel extends Phaser.GameObjects.Container {
  Icon: Phaser.GameObjects.Image
  Name: Phaser.GameObjects.Text
  Description: Phaser.GameObjects.Text
  weaponType: WeaponType | PickupType
  Background: Phaser.GameObjects.Graphics
  IconBG: any
  NextLevel: Phaser.GameObjects.Text
  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    super(scene, x, y)
    this.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains)
    this.Background = new Phaser.GameObjects.Graphics(scene).setScrollFactor(0)
    this.Background.fillStyle(0xeeeeee, 0.8)
    this.Background.fillRect(0, 0, width, height)
    this.IconBG = new Phaser.GameObjects.Graphics(scene).setScrollFactor(0)
    this.IconBG.fillStyle(0xffffff, 0.8)
    this.IconBG.fillRect(10, 10, 48, 48)
    this.Icon = new Phaser.GameObjects.Image(scene, 0, 0, 'main', '')
    this.Icon.setOrigin(0).setPosition(18, 18)
    this.Icon.setDisplaySize(32, 32)

    this.Name = new Phaser.GameObjects.Text(scene, 0, 0, 'Name', {
      fontSize: '32px',
      color: '#000000'
    })
      .setOrigin(0)
      .setPosition(74, 17)
    this.NextLevel = new Phaser.GameObjects.Text(scene, 0, 0, '新', {
      fontSize: '24px',
      color: '#000000'
    })
      .setOrigin(0)
      .setPosition(0.7 * width, 21)
    this.Description = new Phaser.GameObjects.Text(scene, 10, 74, 'Description', {
      fontSize: '24px',
      color: '#000000'
    })
    this.Description.setWordWrapWidth(0.9 * width)
    this.add([this.Background, this.IconBG, this.Icon, this.Name, this.NextLevel, this.Description])
  }
  AssignData(weaponType: WeaponType, level: number = 0) {
    this.weaponType = weaponType
    const weaponData = WEAPONS[weaponType][0]
    this.Name.setText(weaponData.name)
    this.Icon.setFrame(weaponData.frameName)
    this.Icon.setOrigin(0).setPosition(18, 18)
    this.Icon.setDisplaySize(32, 32)
    if (level > 0) {
      const nextLevelData = WEAPONS[weaponType][level]
      this.NextLevel.setText(`等级: ${level + 1}`)
      this.NextLevel.clearTint()
      this.Description.setText(LevelUpItemPanel.ParseLevelUpInfo(nextLevelData, weaponData.isPowerUp))
    } else {
      this.NextLevel.setText('新!')
      this.NextLevel.setTint(0xecec19)
      this.Description.setText(weaponData.description)
    }
  }
  static ParseLevelUpInfo(nextLevelData: any, isPowerUp: any): string | string[] {
    let temp = ''
    for (const key in nextLevelData) {
      const v = nextLevelData[key]
      switch (key) {
        case 'power':
          temp += `${isPowerUp ? '[全部]' : ''}攻击力提升${(v * 100).toFixed(0)}%\n`
          break
        case 'area':
          temp += `${isPowerUp ? '[全部]' : ''}攻击范围提升${(v * 100).toFixed(0)}%\n`
          break
        case 'amount':
          temp += `${isPowerUp ? '[全部]' : ''}攻击次数增加${v}次\n`
          break
        case 'interval':
          temp += `${isPowerUp ? '[全部]' : ''}攻击间隔减少${(v * -0.001).toFixed(1)}秒\n`
          break
        case 'duration':
          temp += `${isPowerUp ? '[全部]' : ''}持续时间增加${
            isPowerUp ? (v * 100).toFixed(1) : (v * 0.001).toFixed(1)
          }${isPowerUp ? '%' : ''}秒\n`
          break
        case 'speed':
          temp += `${isPowerUp ? '[全部]' : ''}弹道速度提升${(v * 100).toFixed(0)}%\n`
          break
        case 'cooldown':
          temp += `${isPowerUp ? '[全部]' : ''}冷却时间减少${(v * -100).toFixed(1)}秒\n`
          break
        case 'magnet':
          temp += '拾取范围提升' + (100 * v).toFixed(0) + '%\n'
          break
        case 'armor':
          temp += `护甲增加${v}\n`
          break
        case 'maxHp':
          temp += `生命上限提升${(v * 100).toFixed(1)}%\n`
          break
        case 'growth':
          temp += '经验增益提升' + (100 * v).toFixed(0) + '%\n'
          break
        case 'moveSpeed':
          temp += '移动速度提升' + (100 * v).toFixed(0) + '%\n'
          break
        case 'luck':
          temp += '幸运值提升' + (100 * v).toFixed(0) + '%\n'
          break
        case 'penetrating':
          temp += `${isPowerUp ? '[全部]' : ''}穿透提升${v.toFixed(0)}\n`
          break
      }
    }
    return temp
  }

  AssignItemData(pickupType: PickupType) {
    this.weaponType = pickupType
    const itemData = PICKUPS[pickupType]
    this.Name.setText(itemData.name)
    this.NextLevel.setText('')
    this.NextLevel.clearTint()
    this.Description.setText(itemData.description)
    this.Icon.setFrame(itemData.framName)
    this.Icon.setOrigin(0).setPosition(18, 18)
    this.Icon.setDisplaySize(32, 32)
  }
}
