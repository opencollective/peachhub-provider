const findPort = require('find-port-sync')

const apiPort = findPort()
const assetPort = findPort()

module.exports = {
  authentication: {
    secret: 'secret'
  },
  api: {
    port: apiPort,
    url: `http://localhost:${apiPort}`
  },
  asset: {
    port: assetPort,
    url: `http://localhost:${assetPort}`
  },
  mailer: {
    port: findPort(),
    web: findPort(),
    ignoreTLS: true
  },
  log: {
    level: 'fatal'
  },
  sql: {
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'password',
      database: 'butthub_provider_test'
    }
  },
  worker: {
    queue: 'test'
  }
}