'use strict'
import defaultConfig from './default'

let customConfig = {}
try {
  customConfig = require('./custom').default
} catch (e) {
  customConfig = {}
}

const config = Object.assign(defaultConfig, customConfig)

if (!process.BROWSER_BUILD) {
  console.log('ShareManBoxNuxt configuration')
  console.log(config)
}

export default config
