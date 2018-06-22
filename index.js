require('dotenv').config()
const getNextJobFromQueue = require('./lib/steps/get-next-job-from-queue')
const logger = require('./lib/logger')

logger('info', ['index', 'start'])

getNextJobFromQueue()
  .then(data => {
    logger('info', ['index', 'finished'])
    process.exit(0)
  })
  .catch(error => {
    logger('error', ['index', 'error', JSON.stringify(error && error.message ? error.message : error)])
    process.exit(1)
  })
