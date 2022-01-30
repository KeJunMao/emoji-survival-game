import NPCType from '../enums/NPCType'

const NPCS = {
  [NPCType.FAIRY]: {
    charName: '仙女',
    surname: '拯救者!',
    spriteName: 'fairy_npc.png',
    description: '救赎罪恶的仙女',
    showcase: []
  },
  [NPCType.VAMPRIE]: {
    charName: '恶魔',
    surname: '!拯救者',
    spriteName: 'vamprie_npc.png',
    description: '坏透了的人便是恶魔',
    showcase: []
  },
  [NPCType.BUSINESSMAN]: {
    charName: '商人',
    surname: '资本家',
    spriteName: 'genie_npc.png',
    description: '坏透了的恶魔便是资本家',
    showcase: []
  }
}

export default NPCS
