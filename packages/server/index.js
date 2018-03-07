const { resolve, join } = require('path')
const fs = require('fs')
const express = require('express')
const compression = require('compression')
const opn = require('opn')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const addProxyMiddleware = require('./middlewares/addProxyMiddleware')
const addWinstonMiddleware = require('./middlewares/addWinstonMiddleware')
const proxyTable = require('./config/proxy-table')
const logger = require('dev-utils/logger')
const router = require('./router')
const app = express()
const isProd = process.env.NODE_ENV === 'production'

const serverConfig = isProd
  ? require(resolve(__dirname, './config/prod-server-config'))
  : require(resolve(__dirname, './config/dev-server-config'))

if (isProd) {
  const outputPath = resolve(__dirname, '../../dist')
  const publicPath = '/static'
  const staticPath = join(outputPath, './static')

  app.set('outputPath', outputPath)
  app.set('fs', fs)

  app.use(publicPath, express.static(staticPath))

  const faviconPath = join(outputPath, 'favicon.ico')
  // cache the favicon in memory
  app.use(favicon(faviconPath))

  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression())
} else {
  const setupDevServer = require(resolve(
    __dirname,
    '../../scripts/setupDevServer'
  ))

  setupDevServer(
    app,
    require(resolve(__dirname, '../../config/webpack.conf.dev'))
  )
}

// external project serve
const externalPath = resolve(__dirname, '../../external')
const externalPublicPath = '/external_static'
const externalStaticPath = join(externalPath, './external_static')

app.use(externalPublicPath, express.static(externalStaticPath))

app.use(cookieParser())

addProxyMiddleware(app, proxyTable)

app.use(addWinstonMiddleware.logger)

router(app)

app.use(addWinstonMiddleware.errorLogger)

const { port, host } = serverConfig

app.listen(port, host, err => {
  if (err) {
    return logger.log(err.message)
  }

  logger.appStarted(port, host)

  if (!isProd) opn(`http://${host}:${port}`)
})
