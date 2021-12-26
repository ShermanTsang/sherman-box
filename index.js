const {Nuxt} = require('nuxt')
const serverless = require('serverless-http')
let config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
exports.main = async (...args) => {
  console.log(config.dev)
  await nuxt.ready();
  return serverless((req,res) => {
    nuxt.render(req,res)
  })(...args)
}
