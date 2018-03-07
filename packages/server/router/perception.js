const path = require('path')
const fs = require('fs')
const perceptionRouter = require('express').Router()
const sendFile = require('../utils/sendFile')
const setupEnv = require('../controller/setupEnv')
const externalPath = path.resolve(__dirname, '../../../external')

perceptionRouter.all('*', setupEnv.run)

const resolve = fileName =>
  path.join(`${setupEnv.outputPath}/perception`, `${fileName}.html`)

perceptionRouter.get('/', (req, res) => {
  sendFile(res, setupEnv.fs, resolve('yundun-perception'))
})

perceptionRouter.get('/cc', (req, res) => {
  sendFile(res, fs, `${externalPath}/cc.html`)
})

perceptionRouter.get('/ddos', (req, res) => {
  sendFile(res, fs, `${externalPath}/ddos.html`)
})

perceptionRouter.get('/waf', (req, res) => {
  sendFile(res, fs, `${externalPath}/waf.html`)
})

module.exports = perceptionRouter
