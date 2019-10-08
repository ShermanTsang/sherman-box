'use strict'
import defaultConfig from './default'

let customConfig = {}
try {
  customConfig = require('./custom').default
} catch (e) {
  customConfig = {}
}

const config = { ...defaultConfig, ...customConfig }

if (process.env.NODE_ENV !== 'production') {
  console.log('ShareManBoxNuxt configuration')
  console.log(config)
}

export default config
