import NPCS from '../../consts/NPCS'
import NPCType from '../../enums/NPCType'
import GameCore from '../GameCore'
import NPCGroup from './NPCGroup'

export default class BaseNPC extends Phaser.Physics.Arcade.Sprite {
  showcase: never[]
  charName: string
  surname: string
  spriteName: string
  description: string
  pool: NPCGroup
  npcType: NPCType
  isLeave: boolean
  LeaveTween: Phaser.Tweens.Tween
  constructor(group: NPCGroup, x: number, y: number, npcType: NPCType) {
    super(group.scene, x, y, 'main')
    this.showcase = []
    this.charName = ''
    this.surname = ''
    this.spriteName = ''
    this.description = ''
    this.npcType = npcType
    this.pool = group
    this.isLeave = false
  }
  Init() {
    this.ApplyData(this.npcType)
    this.setScale(GameCore.PixelScale)
    this.setDepth(this.y)
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
  }
  OnRecycle() {
    this.isLeave = false
    this.visible = true
    this.body.enable = true
    this.setDepth(this.y)
    this.body.immovable = true
  }

  OnPlayerOverlaps() {
    this.body.enable = false
    // todo: open store ui
    this.Leave()
  }
  DeSpawn() {
    this.pool.Return(this)
    this.body.enable = false
    this.visible = false
  }
  Leave() {
    if (this.isLeave) return
    this.isLeave = true
    this.LeaveTween = this.scene.tweens.add({
      targets: this,
      duration: 800,
      loop: false,
      y: this.y - this.scene.renderer.height,
      ease: Phaser.Math.Easing.Back.In,
      onComplete: () => {
        this.DeSpawn()
      }
    })
  }
  ApplyData(npcType: NPCType) {
    const NPCData = this.getNPCData(npcType)
    for (const key in NPCData) {
      if (this.hasOwnProperty(key)) {
        this[key] = NPCData[key]
      }
    }
    if (this.spriteName !== '') {
      this.setFrame(this.spriteName)
    }
  }
  getNPCData(npcType: NPCType) {
    const data = NPCS[npcType]
    if (data) {
      return data
    }
    return {}
  }
}
