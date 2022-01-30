import WEAPONS from '../../consts/WEAPONS'
import WeaponType from '../../enums/WeaponType'
import Game from '../Game'
import GameCore from '../GameCore'
import { GridSizer } from 'phaser3-rex-plugins/templates/ui/ui-components'

export interface WeaponIcon {
  weaponType: WeaponType
  level: number
  isWeapon: boolean
  image?: Phaser.GameObjects.Image
}

export default class MainUi {
  scene: Phaser.Scene
  SurvivedSecondsText: Phaser.GameObjects.Text
  KillsText: Phaser.GameObjects.Text
  PlayerCoinsText: Phaser.GameObjects.Text
  sizer: GridSizer
  WeaponIcons: WeaponIcon[]
  PowerUpIcons: WeaponIcon[]
  // xIncrease: number
  // cols: number
  constructor(scene: Phaser.Scene) {
    this.scene = scene
    this.WeaponIcons = new Array()
    this.PowerUpIcons = new Array()
    // this.xIncrease = 28
    // this.cols = 6
    this.SurvivedSecondsText = this.scene.add
      .text(0.5 * this.scene.renderer.width, 30, '已存活 0:00', {
        color: 'black',
        fontSize: '20px',
        fontStyle: 'bold'
      })
      .setScrollFactor(0)
      .setOrigin(0.5, 0)
    this.KillsText = this.scene.add
      .text(0.85 * this.scene.renderer.width - 4, 30, '击败 9999', {
        color: 'black',
        fontSize: '12px',
        fontStyle: 'bold',
        align: 'right'
      })
      .setScrollFactor(0)
      .setOrigin(1, 0.5)
      .setDepth(GameCore.ZInGameUI - 3)
    this.PlayerCoinsText = this.scene.add
      .text(this.scene.renderer.width - 4, 30, '金币 9999', {
        color: 'black',
        fontSize: '12px',
        fontStyle: 'bold',
        align: 'right'
      })
      .setScrollFactor(0)
      .setOrigin(1, 0.5)
      .setDepth(GameCore.ZInGameUI - 3)
    this.sizer = this.scene.rexUI.add
      .gridSizer({
        anchor: {
          left: 'left+2',
          top: 'top+25'
        },
        width: 24 * 6 + 4 * 6,
        height: 48 + 8,
        column: 6,
        row: 2,
        columnProportions: 1,
        rowProportions: 1,
        space: {
          column: 4,
          row: 4
        },

        createCellContainerCallback: function (scene, x, y, config) {
          config.expand = true
          return scene.rexUI.add.roundRectangle(0, 0, 0, 0, 5, 0x333333).setAlpha(0.5)
        }
      })
      .setScrollFactor(0)
      .setDepth(GameCore.ZInGameUI - 2)
      .layout()
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

  static FormatTime(survivedSeconds: number) {
    return `${Math.floor(survivedSeconds / 60)}:${(survivedSeconds % 60).toString().padStart(2, '0')}`
  }

  AddWeaponIcon(bulletType: WeaponType) {
    this.Add(bulletType)
  }
  Add(bulletType: WeaponType) {
    const weaponData = WEAPONS[bulletType][0]
    const isWeapon = !(weaponData.isPowerUp || this.WeaponIcons.length >= 6)
    let theWeapon: WeaponIcon | undefined
    if (!isWeapon) {
      theWeapon = this.PowerUpIcons.find(t => t.weaponType == bulletType)
    } else {
      theWeapon = this.WeaponIcons.find(t => t.weaponType == bulletType)
    }
    if (theWeapon) {
      theWeapon.level++
    } else {
      theWeapon = {
        weaponType: bulletType,
        level: 1,
        isWeapon: isWeapon,
        image: this.scene.add.image(0, 0, 'main', weaponData.frameName).setDisplaySize(24, 24)
      }
      if (theWeapon.isWeapon) {
        this.WeaponIcons.push(theWeapon)
      } else {
        this.PowerUpIcons.push(theWeapon)
      }
    }
    this.RearrangeIcons()
  }
  RearrangeIcons() {
    this.WeaponIcons.forEach((value, index) => {
      const image = value.image
      if (image) {
        this.sizer.removeAt(index, 0)
        this.sizer.add(
          this.scene.rexUI.add
            .badgeLabel({
              main: image,
              rightBottom: this.scene.add.text(0, 0, `${value.level}`, {
                fontSize: '12px',
                color: 'yellow',
                backgroundColor: '#333'
              })
            })
            .setDepth(GameCore.ZInGameUI - 1)
            .layout(),
          {
            column: index,
            row: 0
          }
        )
      }
    })
    this.PowerUpIcons.forEach((value, index) => {
      const image = value.image
      if (image) {
        this.sizer.removeAt(index, 1)
        this.sizer.add(
          this.scene.rexUI.add
            .badgeLabel({
              main: image,
              rightBottom: this.scene.add.text(0, 0, `${value.level}`, {
                fontSize: '12px',
                color: 'yellow',
                backgroundColor: '#333'
              })
            })
            .setDepth(GameCore.ZInGameUI - 1)
            .layout(),
          {
            column: index,
            row: 1
          }
        )
      }
    })
    // this.PowerUpIcons.forEach((value, index) => {
    //   const image = value.image
    //   if (image) {
    //     image.x = this.xIncrease * (index % this.cols)
    //     image.y = 18 + this.xIncrease + this.xIncrease * Math.floor(index / this.cols)
    //   }
    // })
    this.sizer.layout()
  }
}
