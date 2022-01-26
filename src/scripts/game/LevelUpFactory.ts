import WEAPONS from '../consts/WEAPONS'
import PickupType from '../enums/PickupType'
import WeaponType from '../enums/WeaponType'
import Game from './Game'
const F = class {
  weight: number
  weaponType: any
  constructor(e, t) {
    ;(this.weight = 0), (this.weaponType = WeaponType.LEG), (this.weaponType = e), (this.weight = t)
  }
}
export default class LevelUpFactory {
  defaultXPfactor: number
  currentXPfactor: number
  previousXPfactor: number
  chanceForExistingPowerUp: number
  levelUpOptions: number
  maxTrueWeapons: number
  maxPowerUpWeapons: number
  WeaponStore: any[]
  ExcludedWeapons: any[]
  SpecialWeapons: any[]
  accumulatedWeight: number
  WeightedStore: any[]
  constructor() {
    this.defaultXPfactor = 5
    this.currentXPfactor = 5
    this.previousXPfactor = 5
    this.chanceForExistingPowerUp = 0.3
    this.levelUpOptions = 3
    this.maxTrueWeapons = 6
    this.maxPowerUpWeapons = 6
    this.WeaponStore = new Array()
    this.ExcludedWeapons = new Array()
    this.SpecialWeapons = new Array()
    this.accumulatedWeight = 0
    this.WeightedStore = new Array()
  }
  CalculateXPfactor() {
    let e = this.defaultXPfactor + 1.5 * Math.floor(Game.Core.Player.level / 20)
    e = Math.min(e, 8)
    let t = this.defaultXPfactor + 1.5 * Math.floor((Game.Core.Player.level - 1) / 20)
    t = Math.min(t, 8)
    this.currentXPfactor = e * Game.Core.Player.level * Game.Core.Player.level
    this.previousXPfactor = t * (Game.Core.Player.level - 1) * (Game.Core.Player.level - 1)
  }
  get XpRequiredToLevelUp() {
    return this.currentXPfactor
  }
  get PreviousXpRequiredToLevelUp() {
    return this.previousXPfactor
  }
  GetLevelUpOptions() {
    return Math.random() > 1 / Game.Core.Player.luck ? this.levelUpOptions + 1 : this.levelUpOptions
  }
  get ChanceForExistingPowerUp() {
    return (Game.Core.Player.level % 2 == 0 ? 2 : 1) * this.chanceForExistingPowerUp + 1 - 1 / Game.Core.Player.luck
  }
  HasPowerupsInStore() {
    return this.WeightedStore.length > 0
  }
  Init() {
    this.CalculateXPfactor()
    for (const key in WEAPONS) {
      if (WEAPONS[key][0].isEvolution) {
        this.ExcludedWeapons.push(key)
      }
      if (!WEAPONS[key][0].isUnlocked) {
        this.ExcludedWeapons.push(key)
      }
      if (WEAPONS[key][0].rarity === 0) {
        this.ExcludedWeapons.push(key)
      }
      WEAPONS[key].forEach(() => {
        this.WeaponStore.push(key)
      })
    }
    this.calculateWeights()
  }
  GetRemainingWeaponsAndPowerUps() {
    for (var e = new Array(), t = 0; t < this.WeaponStore.length; t++) {
      var i = this.WeaponStore[t]
      this.ExcludedWeapons.indexOf(i) > -1 || e.indexOf(i) > -1 || e.push(i)
    }
    return e
  }
  GetExistingNotMaxedWeapons() {
    var e = Game.Core.Weapons.map(e => e.bulletType),
      t = new Array()
    for (let i = 0; i < e.length; i++) {
      const s = e[i]
      ;-1 !== this.WeaponStore.indexOf(s) && (this.ExcludedWeapons.indexOf(s) > -1 || e.indexOf(s) > -1 || t.push(s))
    }
    return t
  }
  PullRemainingPowerUp() {
    var e,
      t = 0,
      i = new Array()
    for (const e in WEAPONS)
      if (!(this.ExcludedWeapons.indexOf(e) > -1)) {
        var s = WEAPONS[e][0]
        s.isPowerUp && ((t += s.rarity), s.rarity > 0 && i.push(new F(e, t)))
      }
    var n = Math.random() * t
    return null === (e = i.find(e => e.weight >= n)) || void 0 === e ? void 0 : e.weaponType
  }
  PullExistingRemainingWeapon(e = !0) {
    var t,
      i = 0,
      s = new Array(),
      n = Game.Core.Weapons.map(e => e.bulletType)
    for (let t = 0; t < n.length; t++) {
      const r = n[t]
      if (!(this.ExcludedWeapons.indexOf(r) > -1)) {
        var a = WEAPONS[r][0]
        ;(!e && a.isPowerUp) || ((i += a.rarity), a.rarity > 0 && s.push(new F(r, i)))
      }
    }
    var r = Math.random() * i
    return null === (t = s.find(e => e.weight >= r)) || void 0 === t ? void 0 : t.weaponType
  }
  PullExisting(e) {
    var t
    return null === (t = this.WeightedStore.find(t => t.weaponType == e)) || void 0 === t ? void 0 : t.weaponType
  }
  PullEvolution() {
    var e = 0,
      t = new Array()
    this.SpecialWeapons.forEach(i => {
      var s = WEAPONS[i][0]
      if (s.isEvolution && s.rarity > 0) {
        let n = s.requires,
          a = Game.Core.Weapons.find(e => e.bulletType === n)
        a && ((e += s.rarity), t.push(new F(i, e)))
      }
    })
    var i = Math.random() * e,
      s = t.find(e => e.weight >= i)
    return (
      s &&
        this.SpecialWeapons.splice(
          this.SpecialWeapons.findIndex(e => e == (null == s ? void 0 : s.weaponType)),
          1
        ),
      null == s ? void 0 : s.weaponType
    )
  }
  calculateWeights() {
    ;(this.accumulatedWeight = 0), (this.WeightedStore = new Array())
    for (const e in WEAPONS) {
      if (this.ExcludedWeapons.indexOf(e) > -1) continue
      const t = WEAPONS[e][0]
      if (t.isPowerUp) {
        if (
          !Game.Core.Weapons.find(t => t.bulletType === e) &&
          Game.Core.Weapons.filter(e => e.isPowerUp).length >= this.maxPowerUpWeapons
        )
          continue
      } else if (
        !Game.Core.Weapons.find(t => t.bulletType === e) &&
        Game.Core.Weapons.filter(e => !e.isPowerUp).length >= this.maxTrueWeapons
      )
        continue
      ;(this.accumulatedWeight += t.rarity), t.rarity > 0 && this.WeightedStore.push(new F(e, this.accumulatedWeight))
    }
  }
  GetRandomWeightedWeaponOrPowerup() {
    var e,
      t = Math.random() * this.accumulatedWeight
    return null === (e = this.WeightedStore.find(e => e.weight >= t)) || void 0 === e ? void 0 : e.weaponType
  }
  GetRandomWeightedWeapon() {
    var e,
      t = 0,
      i = new Array()
    for (const e in WEAPONS)
      if (!(this.ExcludedWeapons.indexOf(e) > -1)) {
        var s = WEAPONS[e][0]
        s.isPowerUp || ((t += s.rarity), s.rarity > 0 && i.push(new F(e, t)))
      }
    var n = Math.random() * t
    return null === (e = i.find(e => e.weight >= n)) || void 0 === e ? void 0 : e.weaponType
  }
  GetLevelUpPowerups() {
    var e = new Array(),
      t = 0,
      i = this.GetRandomExistingWeapon()
    i && e.push(i), (i = this.GetRandomExistingWeapon()) && e.indexOf(i) <= -1 && e.push(i)
    for (var s = this.GetLevelUpOptions(); e.length < s && t < 1e3; ) {
      var n
      t++,
        void 0 !==
          (n =
            Game.Core.Player.level <= 3 ? this.GetRandomWeightedWeapon() : this.GetRandomWeightedWeaponOrPowerup()) &&
          e.indexOf(n) <= -1 &&
          e.push(n)
    }
    return e.reverse(), e
  }
  GetLevelUpItems() {
    var e = new Array()
    // return e.push(PickupType.COINBAG2), e.push(S.ROAST), e.reverse(), e
    return e
  }
  RemoveFromStore(e) {
    this.WeaponStore.splice(this.WeaponStore.indexOf(e), 1),
      -1 === this.WeaponStore.indexOf(e) && this.ExcludedWeapons.push(e),
      this.calculateWeights()
  }
  GetRandomExistingWeapon() {
    var e
    if (Math.random() <= this.ChanceForExistingPowerUp)
      for (var t = Game.Core.Weapons.map(e => e.bulletType); t.length > 0; ) {
        var i
        i = Math.random() > 0.5 ? t[0] : t[Math.floor(Math.random() * t.length)]
        var s = null === (e = Game.Core.Weapons.find(e => e.bulletType === i)) || void 0 === e ? void 0 : e.level
        if ((s || (s = 0), 2.5 * (s + 1) > Game.Core.Player.level)) t.splice(t.indexOf(i), 1)
        else {
          if (-1 != this.WeaponStore.indexOf(i)) return i
          t.splice(t.indexOf(i), 1)
        }
      }
    return null
  }
  AddLateWeapon(e) {
    this.SpecialWeapons.push(e)
    var t = this.ExcludedWeapons.find(t => t === e)
    if (t) {
      var i = this.ExcludedWeapons.indexOf(t)
      i > -1 && this.ExcludedWeapons.splice(i, 1)
    }
    this.calculateWeights()
  }
  GetSpecialWeapon(e) {
    var t = this.SpecialWeapons.indexOf(e)
    return t > -1 ? (this.SpecialWeapons.splice(t, 1), e) : null
  }
}
