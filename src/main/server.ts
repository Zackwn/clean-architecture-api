import { MongoHelper } from '../repositories/external/mongodb/helpers/mongo-helper'
import app from './config/app'
import { config } from 'dotenv'

config()

const PORT = process.env.PORT || 3333
const MONGO_URI = String(process.env.MONGO_URI)

MongoHelper.connect(MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`> Server listening at localhost:${PORT}`)
  })
})