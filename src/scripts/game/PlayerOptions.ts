import CharacterType from '../enums/CharacterType'
import StageType from '../enums/StageType'
import GameCore from './GameCore'

export default class PlayerOptions {
  RunCoins: number
  Runenemies: number
  SelectedStage: StageType
  SelectedCharacter: CharacterType
  SelectedHyper: boolean
  RunEnemies: number
  LifetimeSurvived: number
  SoundsEnabled: boolean
  MusicEnabled: boolean
  FlashingVFXEnabled: boolean
  JoystickVisible: boolean
  DamageNumbersEnabled: boolean
  CheatCodeUsed: boolean
  BoughtCharacters: any[]
  BoughtPowerups: any[]
  CollectedWeapons: any[]
  UnlockedWeapons: any[]
  UnlockedCharacters: any[]
  CollectedItems: any[]
  Achievements: any[]
  UnlockedStages: any[]
  UnlockedHypers: any[]
  KillCount: {}
  PickupCount: {}
  DestroyedCount: {}
  Coins: number
  LifetimeCoins: number
  constructor() {
    this.SelectedCharacter = CharacterType.WOOZY
    this.SelectedStage = StageType.FOREST
    this.SelectedHyper = false
    this.Coins = 0
    this.RunCoins = 0
    this.RunEnemies = 0
    this.LifetimeCoins = 0
    this.LifetimeSurvived = 0
    this.SoundsEnabled = true
    this.MusicEnabled = true
    this.FlashingVFXEnabled = true
    this.JoystickVisible = false
    this.DamageNumbersEnabled = true
    this.CheatCodeUsed = false
    this.BoughtCharacters = new Array()
    this.BoughtPowerups = new Array()
    this.CollectedWeapons = new Array()
    this.UnlockedWeapons = new Array()
    this.UnlockedCharacters = new Array()
    this.CollectedItems = new Array()
    this.Achievements = new Array()
    this.UnlockedStages = new Array()
    this.UnlockedHypers = new Array()
    this.KillCount = {}
    this.PickupCount = {}
    this.DestroyedCount = {}
  }
  Load() {
    // todo: load player options from local storage
  }
  AddCoins(value: number) {
    value *= GameCore.GoldMultiplier
    this.Coins += value
    this.RunCoins += value
    this.LifetimeCoins += value
  }
}
