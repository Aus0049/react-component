const config = require('../config')
const server = require('../server/main')
const debug = require('debug')('app:bin:server')
const port = config.server_port

server.listen(port)
debug(`🍺 项目顺利跑起来 http://localhost:${port}.`)
