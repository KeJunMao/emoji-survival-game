export default interface EnemyData {
  level: number
  maxHp: number
  speed: number
  power: number
  knockback: number
  deathKB: number
  xp: number
  killedAmount: number
  spriteName: string
  alpha?: number
  res_Freeze?: number
  res_Rosary?: number
  scale?: number
  colliderOverride?: any
  skills?: string[]
}
