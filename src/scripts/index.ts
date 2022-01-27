import 'phaser'

import Game from './game/Game'
import LevelUpScene from './game/ui/LevelUpScene'
// import FirstGameScene from './scenes/firstGameScene'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'

export const DEFAULT_SCALE = 0.5
export const DEFAULT_WIDTH = 1024 * DEFAULT_SCALE
export const DEFAULT_HEIGHT = 1366 * DEFAULT_SCALE

const isVerticalScreen = window.innerWidth <= window.innerHeight
const scale = isVerticalScreen
  ? Math.min(DEFAULT_WIDTH / window.innerWidth, devicePixelRatio)
  : Math.min(DEFAULT_HEIGHT / window.innerHeight, devicePixelRatio)
export let APP_WIDTH = Math.floor(window.innerWidth * scale)
export let APP_HEIGHT = Math.floor(window.innerHeight * scale)

export const APP_POSITION_CONFIG = {
  left: 0,
  right: APP_WIDTH,
  gameLeft: 0,
  gameRight: APP_WIDTH,
  width: APP_WIDTH,
  height: APP_HEIGHT,
  centerX: 0.5 * APP_WIDTH,
  centerY: 0.5 * APP_HEIGHT
}

if (!isVerticalScreen) {
  APP_HEIGHT = DEFAULT_HEIGHT
  const windowWidth = window.innerWidth
  APP_WIDTH = Math.min(3 * DEFAULT_WIDTH, windowWidth)
  if (APP_WIDTH > 1.6 * APP_HEIGHT) {
    APP_WIDTH = 1.6 * APP_HEIGHT
  }
  APP_POSITION_CONFIG.left = 0.5 * APP_WIDTH - 0.5 * DEFAULT_WIDTH
  APP_POSITION_CONFIG.right = 0.5 * APP_WIDTH + 0.5 * DEFAULT_WIDTH
  APP_POSITION_CONFIG.width = APP_POSITION_CONFIG.right - APP_POSITION_CONFIG.left
  APP_POSITION_CONFIG.centerX = 0.5 * APP_WIDTH
  APP_POSITION_CONFIG.height = APP_HEIGHT
  APP_POSITION_CONFIG.centerY = 0.5 * APP_HEIGHT
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: APP_WIDTH,
    height: APP_HEIGHT
  },
  scene: [PreloadScene, MainScene, LevelUpScene],
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
      debug: false,
      gravity: { y: 0 }
    }
  }
}

window.addEventListener('load', () => {
  window['game'] = new Game(config)
})
