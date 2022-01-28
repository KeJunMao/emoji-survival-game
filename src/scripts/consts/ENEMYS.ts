import EnemyType from '../enums/EnemyType'
import EnemyData from './enemys/EnemyDataInterface'
import EASY_ENEMYS from './enemys/EASY_ENEMYS'
import BOSS_ENEMYS from './enemys/BOSS_ENEMYS'
import SWARM_ENEMYS from './enemys/SWARM_ENEMYS'
import MEDIUM_ENEMYS from './enemys/MEDIUM_ENEMYS'
import DIFFICULT_ENEMYS from './enemys/DIFFICULT_ENEMYS'
const ENEMYS: {
  [key in EnemyType]: EnemyData[]
} = {
  ...EASY_ENEMYS,
  ...MEDIUM_ENEMYS,
  ...DIFFICULT_ENEMYS,
  ...SWARM_ENEMYS,
  ...BOSS_ENEMYS
}

export default ENEMYS
