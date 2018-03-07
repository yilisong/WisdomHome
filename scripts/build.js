const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('../config/webpack.conf.prod')
const rimraf = require('rimraf')
const spinner = require('ora')('Start building...')

spinner.start()

const distPath = path.resolve(process.cwd(), 'dist')
const distTempPath = path.resolve(process.cwd(), 'dist_temp')
const assetsPath = path.join(distTempPath, 'static')

fs.existsSync(distTempPath) && rimraf.sync(distTempPath)
fs.mkdirSync(distTempPath)
fs.mkdirSync(assetsPath)

webpack(webpackConfig, (err, stats) => {
  spinner.stop()

  if (err) {
    throw err
    rimraf.sync(distTempPath)
  } else {
    rimraf.sync(distPath)
    fs.renameSync(distTempPath, distPath)
  }

  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n'
  )
})
