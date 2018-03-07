const perceptionRouter = require('./perception')

module.exports = app => {
  app.use('/', perceptionRouter)
}
