const config = require('./utils/config')
const express = require('express')
const blogsRouter = require('./controllers/blogsRouter')
const app = express()

const cors = require('cors')

const logger = require('./utils/logger')

app.use(cors())
app.use(express.json())
app.use(blogsRouter)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
