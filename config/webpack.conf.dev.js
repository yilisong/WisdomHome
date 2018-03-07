const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const cheerio = require('cheerio')
const glob = require('glob')
const dllConfig = require('./dll-config')
const logger = require('../packages/dev-utils/logger')
const htmlHandlers = require('./html-handlers')

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new FriendlyErrorsPlugin(),
  new CircularDependencyPlugin({
    exclude: /a\.js|node_modules/,
    failOnError: false
  })
]

process.env.ANALYZE &&
  plugins.push(new (require('webpack-bundle-analyzer')).BundleAnalyzerPlugin())

module.exports = require('./webpack.conf.base')({
  entry: getEntriesWithHMR(
    path.resolve(__dirname, '../src/*/modules/**/main.js')
  ),
  output: {
    filename: '[name].js',
    chunkFilename: '[id].[name].js'
  },
  module: {
    rules: [
      {
        resource: {
          test(filePath) {
            return /\.css$/.test(filePath) && !/\.module\.css$/.test(filePath)
          }
        },
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        resource: {
          test: /\.module\.css$/
        },
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        resource: {
          test: /\.vue$/
        },
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              css: [
                'vue-style-loader',
                {
                  loader: 'css-loader'
                }
              ]
            }
          }
        }
      }
    ]
  },
  plugins: plugins.concat(dependencyHandlers()).concat(
    htmlHandlers({
      templateContent: templateContent()
    })
  ),
  devtool: 'cheap-module-eval-source-map',
  performance: {
    hints: false
  }
})

function getEntriesWithHMR(globPath) {
  const entries = {}
  glob.sync(globPath).forEach(entry => {
    const tmp = entry.split('/').splice(-3)
    entries[tmp[1]] = ['eventsource-polyfill', entry]
  })

  return entries
}

function dependencyHandlers() {
  const manifestPath = path.resolve(dllConfig.path, 'dependencies.json')

  if (!fs.existsSync(manifestPath)) {
    logger.error('The DLL manifest is missing. Please run `npm run build:dll`')
    process.exit(0)
  }

  return new webpack.DllReferencePlugin({
    context: path.resolve(__dirname, '../'),
    manifest: require(manifestPath)
  })
}

function templateContent() {
  const html = fs
    .readFileSync(path.resolve(__dirname, '../public/template.html'))
    .toString()
  const doc = cheerio(html)
  const body = doc.find('body')
  const dllName = ['dependencies']

  body.append(
    `<script data-dll='true' type='text/javascript' src='/${dllName}.dll.js'></script>`
  )

  return doc.toString()
}
