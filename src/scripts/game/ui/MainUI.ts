import WEAPONS from '../../consts/WEAPONS'
import WeaponType from '../../enums/WeaponType'
import Game from '../Game'
import GameCore from '../GameCore'

export interface WeaponIcon {
  weaponType: WeaponType
  level: number
  isWeapon: boolean
  image?: Phaser.GameObjects.Image
}

export default class MainUi {
  scene: Phaser.Scene
  SurvivedSecondsText: Phaser.GameObjects.Text
  PlayerLevelText: Phaser.GameObjects.Text
  KillsText: Phaser.GameObjects.Text
  PlayerCoinsText: Phaser.GameObjects.Text
  WeaponIcons: WeaponIcon[]
  PowerUpIcons: WeaponIcon[]
  xIncrease: number
  cols: number
  constructor(scene: Phaser.Scene) {
    this.scene = scene
    this.WeaponIcons = new Array()
    this.PowerUpIcons = new Array()
    this.xIncrease = 28
    this.cols = 6
    this.SurvivedSecondsText = this.scene.add
      .text(0.5 * this.scene.renderer.width, 25, '已存活 0:00', {
        color: 'black',
        fontSize: '20px',
        fontStyle: 'bold'
      })
      .setScrollFactor(0)
      .setOrigin(0.5, 0)
    this.PlayerLevelText = this.scene.add
      .text(this.scene.renderer.width - 4, 9, '等级 99', {
        color: 'black',
        fontSize: '12px',
        fontStyle: 'bold'
      })
      .setScrollFactor(0)
      .setOrigin(1, 0.5)
    this.KillsText = this.scene.add
      .text(0.85 * this.scene.renderer.width - 4, 25, '击败 9999', {
        color: 'black',
        fontSize: '12px',
        fontStyle: 'bold'
      })
      .setScrollFactor(0)
      .setOrigin(1, 0.5)
      .setDepth(GameCore.ZInGameUI - 3)
    this.PlayerCoinsText = this.scene.add
      .text(this.scene.renderer.width - 4, 25, '金币 9999', {
        color: 'black',
        fontSize: '12px',
        fontStyle: 'bold'
      })
      .setScrollFactor(0)
      .setOrigin(1, 0.5)
      .setDepth(GameCore.ZInGameUI - 3)
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
  UpdatePlayerLevel() {
    this.PlayerLevelText.setText(`等级 ${Game.Core.Player.level}`)
  }
  static FormatTime(survivedSeconds: number) {
    return `${Math.floor(survivedSeconds / 60)}:${(survivedSeconds % 60).toString().padStart(2, '0')}`
  }

  AddWeaponIcon(bulletType: WeaponType) {
    this.Add(bulletType)
  }
  Add(bulletType: WeaponType) {
    const weaponData = WEAPONS[bulletType][0]
    let theWeapon: WeaponIcon | undefined
    if (weaponData.isPowerUp || this.WeaponIcons.length >= 6) {
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
        isWeapon: !(weaponData.isPowerUp || this.WeaponIcons.length >= 6)
      }
      const x = theWeapon.isWeapon
        ? this.xIncrease * this.WeaponIcons.length
        : this.xIncrease * (this.PowerUpIcons.length % this.cols)
      const y = theWeapon.isWeapon
        ? 18
        : 18 + this.xIncrease + this.xIncrease * Math.floor(this.PowerUpIcons.length / this.cols)
      const weaonIcon = this.scene.add
        .image(x, y, 'main', weaponData.frameName)
        .setOrigin(0, 0)
        .setScrollFactor(0)
        .setDepth(GameCore.ZInGameUI - 2)
      weaonIcon.setDisplaySize(24, 24)
      theWeapon.image = weaonIcon
      if (theWeapon.isWeapon) {
        this.WeaponIcons.push(theWeapon)
      } else {
        this.PowerUpIcons.push(theWeapon)
      }
      this.RearrangeIcons()
    }
  }
  RearrangeIcons() {
    this.WeaponIcons.forEach((value, index) => {
      const image = value.image
      if (image) {
        image.x = this.xIncrease * index
        image.y = 18
      }
    })
    this.PowerUpIcons.forEach((value, index) => {
      const image = value.image
      if (image) {
        image.x = this.xIncrease * (index % this.cols)
        image.y = 18 + this.xIncrease + this.xIncrease * Math.floor(index / this.cols)
      }
    })
  }
}
