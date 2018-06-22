const { readdir } = require('fs').promises
const { QUEUE_DIRECTORY_PATH } = require('../../config')
const logger = require('../logger')
const isJson = file => file.endsWith('.json')
const fullPath = file => `${process.cwd()}/${QUEUE_DIRECTORY_PATH}/${file}`

module.exports = async () => {
  let files
  try {
    files = await readdir(QUEUE_DIRECTORY_PATH)
  } catch (error) {
    logger('error', ['get-next-job-from-queue', 'error', JSON.stringify(error)])
    throw error
  }

  const file = files.find(isJson)

  if (!file) {
    logger('info', ['get-next-job-from-queue', 'no jobs found'])
    process.exit(0)
  }

  logger('info', ['get-next-job-from-queue', 'job found', file])
  const filePath = fullPath(file)

  try {
    const data = require(filePath)
    return data
  } catch (error) {
    logger('error', ['get-next-job-from-queue', 'error', JSON.stringify(error)])
    throw error
  }
}
