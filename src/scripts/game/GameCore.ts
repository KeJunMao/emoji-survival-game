import WEAPONS from '../consts/WEAPONS'
import Characters from '../enums/CharacterType'
import DestructibleType from '../enums/DestructibleType'
import FixedTreasures from '../enums/FixedTreasures'
import HitVFXType from '../enums/HitVFXType'
import NPCType from '../enums/NPCType'
import PickupType from '../enums/PickupType'
import Scenes from '../enums/Scenes'
import Treasures from '../enums/TreasureType'
import WeaponType from '../enums/WeaponType'
import Weapons from '../enums/WeaponType'
import BGMan from './BGMan'
import ContainmentRect from './ContainmentRect'
import DestructibleGroup from './destructible/DestructibleGroup'
import Enemy from './enemy/Enemy'
import Game from './Game'
import LevelUpFactory from './LevelUpFactory'
import LootManager from './LootManager'
import Magnet from './Magnet'
import BaseNPC from './npc/BaseNPC'
import NPCGroup from './npc/NPCGroup'
import BasePickup from './pickup/BasePickup'
import GemPickup from './pickup/GemPickup'
import PickupGroup from './pickup/PickupGroup'
import Player from './Player'
import PlayerOptions from './PlayerOptions'
import SceneManager from './SceneManager'
import Stage from './Stage'
import MainUi from './ui/MainUI'
import PlayerUI from './ui/PlayerUI'
import BaseBullet from './weapon/BaseBullet'
import BaseWeapon from './weapon/BaseWeapon'
import WeaponFactory from './weapon/WeaponFactory'

export default class GameCore {
  Player: Player
  Magnet: Magnet
  MainUI: MainUi
  pickupPool: PickupGroup
  gemsPool: PickupGroup
  game: any
  scene: Phaser.Scene
  MaxGems: number
  CurrentTreasureLevel: number
  SurvivedSeconds: number
  MaxDestructibles: number
  baseMarkup: number
  IsTimeStopped: boolean
  TimeStopConfig: Phaser.Types.Time.TimerEventConfig
  updateTick: number
  updateFreq: number
  CurrentTreasureTypes: Treasures[]
  CurrentFixedTreasures: FixedTreasures[]
  PlayerOptions: PlayerOptions
  WeaponFactory: WeaponFactory
  LevelUpFactory: LevelUpFactory
  LootManager: LootManager
  SceneManager: SceneManager
  EnemyGroup: Phaser.GameObjects.Group
  WeaponGroup: Phaser.GameObjects.Group
  BulletGroup: Phaser.GameObjects.Group
  PickupGroup: Phaser.GameObjects.Group
  tickerEvent: Phaser.Time.TimerEvent
  Stage: Stage
  BGMan: BGMan
  Weapons: BaseWeapon[]

  private static _basePlayerPxSpeed = 82.5
  Enemies: Enemy[]
  Destructibles: any[]
  containmentRect_Screen: ContainmentRect
  containmentRect_ScreenPlus: ContainmentRect
  PfxEmitter_Pickups: Phaser.GameObjects.Particles.ParticleEmitterManager
  PlayerUI: PlayerUI
  LevelUpScene: Phaser.Scene
  destructiblesPool: DestructibleGroup
  npcPool: NPCGroup
  public static get PlayerPxSpeed() {
    return GameCore._basePlayerPxSpeed
  }
  public static set PlayerPxSpeed(value) {
    GameCore._basePlayerPxSpeed = value
  }
  private static _baseEnemySpeed = 0.77 * 0.3
  public static get EnemySpeed() {
    return GameCore._baseEnemySpeed
  }
  public static set EnemySpeed(value) {
    GameCore._baseEnemySpeed = value
  }
  private static _baseProjectileSpeed = 165
  public static get ProjectileSpeed() {
    return GameCore._baseProjectileSpeed
  }
  public static set ProjectileSpeed(value) {
    GameCore._baseProjectileSpeed = value
  }

  private static _baseGoldMultiplier = 1
  public static get GoldMultiplier() {
    return GameCore._baseGoldMultiplier
  }
  public static set GoldMultiplier(value) {
    GameCore._baseGoldMultiplier = value
  }
  static PixelScale = 1
  static RpixelScale = 1
  static ZDamageNumber = Number.MAX_SAFE_INTEGER - 1e4
  static ZInGameUI = Number.MAX_SAFE_INTEGER - 1000

  constructor(game: Phaser.Game, scene: Phaser.Scene) {
    this.game = game
    this.scene = scene
    this.MaxGems = 400
    this.CurrentTreasureLevel = 3
    this.CurrentTreasureTypes = [
      Treasures.EVOLUTION,
      Treasures.POWERUP,
      Treasures.POWERUP,
      Treasures.POWERUP,
      Treasures.POWERUP
    ]
    this.CurrentFixedTreasures = [
      FixedTreasures.HELLFIRE,
      FixedTreasures.SCYTHE,
      FixedTreasures.BONE,
      FixedTreasures.AMOUNT,
      FixedTreasures.AMOUNT
    ]
    this.PlayerOptions = new PlayerOptions()
    this.WeaponFactory = new WeaponFactory()
    this.LevelUpFactory = new LevelUpFactory()
    this.LootManager = new LootManager()
    this.Enemies = new Array()
    this.Weapons = new Array()
    this.Destructibles = new Array()
    this.SurvivedSeconds = 0
    this.MaxDestructibles = 10
    this.baseMarkup = 0.1
    this.IsTimeStopped = false
    this.TimeStopConfig = {
      delay: 1000,
      loop: false,
      callback: () => {
        Game.Core.ClearTimeStop()
      }
    }
    this.updateTick = 0
    this.updateFreq = 4
  }

  CleanUp() {
    this.WeaponFactory = new WeaponFactory()
    this.LevelUpFactory = new LevelUpFactory()
    this.LootManager = new LootManager()
    this.Enemies = new Array()
    this.Weapons = new Array()
    this.Destructibles = new Array()
    this.SurvivedSeconds = 0
    this.IsTimeStopped = false
    this.PlayerOptions.RunCoins = 0
    this.PlayerOptions.Runenemies = 0
    this.EnemyGroup.clear()
    this.PickupGroup.clear()
    this.BulletGroup.clear()
    this.destructiblesPool.clear()
  }

  InitGame(scene: Phaser.Scene, character: Characters) {
    this.scene = scene
    this.EnemyGroup = this.scene.add.group()
    this.BulletGroup = this.scene.add.group()
    this.PickupGroup = this.scene.add.group()
    this.pickupPool = new PickupGroup(this.scene)
    this.gemsPool = new PickupGroup(this.scene)
    this.destructiblesPool = new DestructibleGroup(this.scene)
    this.npcPool = new NPCGroup(this.scene)

    this.EnemyGroup['physicsType'] = Phaser.Physics.Arcade.DYNAMIC_BODY
    this.CleanUp()
    this.MakePlayer(character)
    this.scene.physics.add.collider(this.Player, this.EnemyGroup, this.onPlayerOverlapsEnemy.bind(this))
    this.scene.physics.add.collider(this.EnemyGroup, this.EnemyGroup)
    this.scene.physics.add.overlap(this.Player, this.PickupGroup, this.onPlayerOverlapsPickup.bind(this))
    this.scene.physics.add.overlap(this.Magnet, this.PickupGroup, this.onMagnetOverlapsPickup.bind(this))
    this.scene.physics.add.collider(this.Player, this.npcPool, this.onPlayerOverlapsNPC.bind(this))
    // this.hitVFXPool = new At(e),
    // this.damageNumberPool = new kt(e),

    this.tickerEvent = this.scene.time.addEvent({
      delay: 1000,
      callback: this.OnTickerEvent,
      callbackScope: this,
      loop: true
    })
    this.MainUI = new MainUi(this.scene)
    this.MainUI.UpdateCoins()
    this.MainUI.UpdateKills()
    this.Player.MakeLevelOne()
    this.LevelUpFactory.Init()
    this.PfxEmitter_Pickups = this.scene.add.particles('vfx')
    this.Stage = new Stage(this.scene, this.PlayerOptions.SelectedStage)
    this.Stage.Init()
    this.AddWeapon(this.Player.startingWeapon)
    this.LootManager.Init()

    this.BGMan = new BGMan(this.scene)
    this.BGMan.MakeBackground()
    this.containmentRect_Screen = new ContainmentRect(0.6)
    this.containmentRect_ScreenPlus = new ContainmentRect(0.8)
    this.PlayerUI.UpdatePlayerLevel()
    this.PlayerUI.Update()
    this.LevelUpScene = this.scene.scene.get(Scenes.UI_levelUpScene)
    // test code
    // this.MakeNPC(NPCType.FAIRY)
    // this.MakeNPC(NPCType.VAMPRIE)
    // this.MakeNPC(NPCType.BUSINESSMAN)
    // end test code
  }

  FreezeSnapshot(callback: () => void) {
    if (callback) {
      callback()
    }
  }
  AddWeapon(bulletType: Weapons, isLeveUp: boolean = true) {
    const weapon = this.GetWeapon(bulletType)
    weapon.level = 1
    this.Weapons.push(weapon)
    if (isLeveUp) {
      this.LevelUpFactory.RemoveFromStore(weapon)
    }
    if (this.MainUI) {
      this.MainUI.AddWeaponIcon(bulletType)
    }
  }
  RemoveWeapon(bulletType: Weapons) {
    const weapon = this.Weapons.find(w => w.bulletType === bulletType)
    if (weapon) {
      weapon.CleanUp()
      this.Weapons.splice(this.Weapons.indexOf(weapon), 1)
    }
  }
  GetWeapon(bulletType: Weapons) {
    return this.WeaponFactory.GetWeapon(bulletType)
  }
  MakePlayer(character: Characters) {
    this.Player = new Player(this.scene, 0, 0, character)
    this.PlayerUI = new PlayerUI(this.scene)
    this.Magnet = new Magnet(this.scene, 0, 0)
    return this.Player
  }
  MakeDestructible(type: DestructibleType) {
    const vector = this.GetPositionOutOfSight(45)
    this.destructiblesPool.SpawnAt(vector.x, vector.y, type)
    while (this.destructiblesPool.spawned.length > this.MaxDestructibles) {
      const furthest = this.furthest(this.Player, this.destructiblesPool.spawned)
      if (furthest) {
        furthest.DeSpawn()
      }
    }
  }

  MakeNPC(type: NPCType) {
    const vector = this.GetPositionOutOfSight(45)
    const npc = this.npcPool.SpawnAt(vector.x, vector.y, type)
    while (this.npcPool.spawned.length > 1) {
      const furthest = this.furthest(this.Player, this.npcPool.spawned)
      if (furthest) {
        furthest.DeSpawn()
      }
    }
    return npc
  }

  TurnOnVacuum() {
    const gems = this.gemsPool.spawned[PickupType.GEM]
    gems.forEach(v => (v.goToPlayer = true))
  }

  OnTickerEvent() {
    this.SurvivedSeconds++
    this.MainUI.SetSurvivedSeconds(this.SurvivedSeconds)
    if (this.SurvivedSeconds % 60 == 0) {
      this.Stage.CheckMinute()
    }
  }

  onPlayerOverlapsEnemy(object1: Phaser.GameObjects.GameObject, object2: Phaser.GameObjects.GameObject) {
    const player = object1 as Player
    const enemy = object2 as Enemy
    if (!(enemy.isDead || enemy.IsTimeStopped)) {
      player.GetDamaged(enemy.power)
    }
  }
  onPlayerOverlapsPickup(object1: Phaser.GameObjects.GameObject, object2: Phaser.GameObjects.GameObject) {
    const pickup = object2 as BasePickup
    this.GetPickup(pickup)
    pickup.GetTaken()
  }
  onPlayerOverlapsNPC(object1: Phaser.GameObjects.GameObject, object2: Phaser.GameObjects.GameObject) {
    const npc = object2 as BaseNPC
    if (!npc.isLeave) {
      npc.OnPlayerOverlaps()
    }
  }
  GetPickup(pickup: BasePickup) {
    // throw new Error('Method not implemented.')
  }

  onMagnetOverlapsPickup(object1: Phaser.GameObjects.GameObject, object2: Phaser.GameObjects.GameObject) {
    const pickup = object2 as BasePickup
    if (pickup.Vacuum()) {
      this.PfxEmitter_Pickups.emitParticleAt(pickup.x, pickup.y)
    }
  }

  ResetWeaponCooldowns() {
    this.Weapons.forEach(weapon => {
      weapon.ResetFiringTimer()
    })
  }
  GetPositionOutOfSight(e: number = -1, t: number = 0) {
    let i, s, n
    if (
      (e <= 0
        ? (i = 2 * Math.PI * Math.random())
        : ((i = Math.atan2(this.Player.body.velocity.y, this.Player.body.velocity.x)),
          (i += (Math.random() - 0.5) * Phaser.Math.DegToRad(e))),
      t > 0)
    ) {
      var a = Math.cos(i)
      ;(s = this.Player.x + 0.5 * a * this.scene.renderer.width + Math.sign(a) * t),
        (a = Math.sin(i)),
        (n = this.Player.y + 0.5 * a * this.scene.renderer.height + Math.sign(a) * t)
    } else
      (s = this.Player.x + 0.9 * Math.cos(i) * this.scene.renderer.width),
        (n = this.Player.y + 0.9 * Math.sin(i) * this.scene.renderer.height)
    return new Phaser.Math.Vector2(s, n)
  }
  MakeTreasure(x: number, y: number, treasure: any) {
    // throw new Error('Method not implemented.')
    console.log('MakeTreasure')
  }
  MakeGem(x: number, y: number, xp: number) {
    const gem = this.MakePickup(x, y, PickupType.GEM) as GemPickup
    gem.SetValue(xp)
    return gem
  }
  MakePickup(x: number, y: number, pickupType: PickupType = PickupType.COIN, s = PickupType.VOID) {
    let pickups, pickup
    let vector = new Phaser.Math.Vector2(x, y)
    if (x === null && y === null) {
      vector = this.GetPositionOutOfSight(90)
    }
    if (pickupType === PickupType.GEM) {
      let value = 0
      let flag = false
      const maxGems = this.MaxGems
      pickups = this.gemsPool.spawned[PickupType.GEM]

      for (let i = 0; pickups.length > i && i > maxGems; i++) {
        const furthest = this.furthest<Player, BasePickup>(this.Player, pickups)
        if (furthest) {
          if (this.containmentRect_Screen.Contains(furthest)) {
            flag = true
            break
          }
          value += furthest.value
          furthest.DeSpawn()
        }
      }
      const furthest = this.furthest<Player, BasePickup>(this.Player, pickups)
      if (flag && furthest) {
        furthest.SetValue(value + furthest.value)
        return furthest
      }

      pickup = this.gemsPool.SpawnAt(vector.x, vector.y, pickupType)
    } else {
      pickup = this.pickupPool.SpawnAt(vector.x, vector.y, pickupType)
    }

    if (pickup.itemType === PickupType.WEAPON && s !== PickupType.VOID) {
      pickup.SetWeaponType(s)
    }
    return pickup
  }
  furthest<P extends Phaser.Physics.Arcade.Sprite, T extends Phaser.Physics.Arcade.Sprite>(player: P, pickups: T[]): T {
    let flag = -1
    let furthest
    const x = player.x
    const y = player.y
    for (let i = 0; pickups.length > i; i++) {
      var item = pickups[i]
      const squared = Phaser.Math.Distance.Squared(x, y, item.x, item.y)
      if (squared > flag) {
        furthest = item
        flag = squared
      }
    }
    return furthest
  }
  ShowHitVFXAt(x: number, y: number, hitVFX: HitVFXType) {
    // throw new Error('Method not implemented.')
    // console.log('ShowHitVFXAt')
  }
  ShowDamageAt(x: number, y: number, PPower: number) {
    // throw new Error('Method not implemented.')
    // console.log('ShowDamageAt')
  }
  GameOver() {
    // throw new Error('Method not implemented.')
    // alert('Game Over')
    this.SceneManager.TestGameOver()
  }

  ClearTimeStop() {
    this.Enemies.forEach(enemy => {
      enemy.ResumeFromTimeStop()
    })
    this.IsTimeStopped = false
  }
  CheckForLevelUp() {
    const xpRequiredToLevelUp = this.LevelUpFactory.XpRequiredToLevelUp
    if (this.Player.xp > xpRequiredToLevelUp) {
      this.Player.LevelUp()
      this.SwapToLevelUpScene()
      this.LootManager.RecalculateLoot()
      this.LevelUpFactory.CalculateXPfactor()
      this.PlayerUI.Update()
      this.PlayerUI.UpdatePlayerLevel()
    }
  }
  SwapToLevelUpScene() {
    Game.Core.SceneManager.EnterLevelUp()
  }

  GetWeaponLevel(bulletType: WeaponType) {
    let weapon = this.Weapons.find(t => t.bulletType === bulletType)
    if (weapon) {
      return weapon.level
    }
    return 0
  }

  LevelWeaponUp(weaponType: WeaponType, isLeveUp = true) {
    if (!WEAPONS[weaponType]) return
    const weapon = this.Weapons.find(t => t.bulletType === weaponType)
    if (weapon) {
      if (!weapon.LevelUp()) {
        Game.Core.PlayerOptions.AddCoins(10)
        this.MainUI.UpdateCoins()
        if (isLeveUp) {
          this.LevelUpFactory.RemoveFromStore(weapon.bulletType)
        }
      }
      this.MainUI.AddWeaponIcon(weaponType)
    } else {
      this.AddWeapon(weaponType, isLeveUp)
      this.SetSeenWeapon(weaponType)
    }
  }
  MakeAndActivatePickup(pickupType: PickupType) {
    this.MakePickup(this.Player.x, this.Player.y, pickupType).GetTaken()
  }
  SetSeenWeapon(weaponType: WeaponType) {
    // throw new Error('Method not implemented.')
  }

  Update(delta: number) {
    this.PickupGroup.getChildren().forEach(pickup => {
      // @ts-ignore
      ;(pickup as BasePickup)?.Update(delta)
    })
    this.BulletGroup.getChildren().forEach(bullet => {
      // @ts-ignore
      bullet = bullet as BaseBullet
      // @ts-ignore
      if (bullet.Update) {
        // @ts-ignore
        bullet.Update(delta)
      }
    })
    this.Weapons.forEach(w => w.Update(delta))
    this.Player.Update(delta)
    this.Magnet.Update(delta)
    this.BGMan.Update(delta)
    this.Enemies.forEach(w => w.Update(delta))
  }
}
