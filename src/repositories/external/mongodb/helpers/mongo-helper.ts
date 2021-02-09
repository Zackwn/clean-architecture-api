import { MongoClient, Collection } from 'mongodb'

interface IMongoHelper {
  client: null | MongoClient
  connect: (uri: string) => Promise<void>
  disconnect: () => Promise<void>
  getCollection: (collectionName: string) => Collection,
  clearCollection: (collectionName: string) => Promise<void>
}

export const MongoHelper: IMongoHelper = {
  client: null,

  connect: async function (uri: string) {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    this.client = client
  },

  disconnect: async function () {
    await this.client?.close()
  },

  getCollection: function (collectionName: string): Collection {
    return this.client!.db().collection(collectionName)
  },

  clearCollection: async function (collectionName: string): Promise<void> {
    await this.client!.db().collection(collectionName).deleteMany({})
  }
}