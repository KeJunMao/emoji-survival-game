import WeaponType from '../../enums/WeaponType'
import Game from '../Game'
import GameCore from '../GameCore'
import BaseWeapon from './BaseWeapon'

export default class RadioActiveWeapon extends BaseWeapon {
  image: Phaser.GameObjects.Image
  imageTween: Phaser.Tweens.Tween
  imageTween2: Phaser.Tweens.Tween
  constructor(bulletType: WeaponType, isNewWeapon: boolean = true) {
    super(bulletType, isNewWeapon)
    this.image = Game.Core.scene.add.image(0, 0, 'main', 'radioactive_bullet.png')
    this.image.setAlpha(0.1)
    this.image.copyPosition(Game.Core.Player)
    this.image.setScale(2 * GameCore.PixelScale * this.PArea)
    this.imageTween = Game.Core.scene.add.tween({
      targets: this.image,
      alpha: 0.3,
      loop: true,
      yoyo: true,
      loopDelay: 100,
      duration: 1000,
      ease: 'Linear',
      repeat: -1
    })
    this.imageTween2 = Game.Core.scene.add.tween({
      targets: this.image,
      angle: 360,
      loop: true,
      duration: 6000,
      ease: 'Linear',
      repeat: -1
    })
  }
  get PAmount() {
    return 1
  }
  Fire() {
    return this.image.setScale(2 * GameCore.PixelScale * this.PArea), super.Fire()
  }
  Update() {
    this.image.copyPosition(Game.Core.Player),
      this.image.setDepth(Game.Core.Player.depth - 0.5 * Game.Core.scene.renderer.height)
  }
  CleanUp() {
    super.CleanUp()
    this.image.setVisible(!1)
    this.image.setActive(!1)
    this.image.destroy()
    this.imageTween.stop()
    this.imageTween2.stop()
  }
}
