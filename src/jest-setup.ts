import { MongoHelper } from './repositories/external/mongodb/helpers/mongo-helper'

beforeAll(async () => {
  const MONGO_URI: string = String(process.env.MONGO_URI)
  await MongoHelper.connect(MONGO_URI)
})

afterAll(async () => {
  await MongoHelper.disconnect()
})