import { MongoDBPostRepository } from "../../../repositories/external/mongodb/post/mongodb-post-repository"

export const makePostRepository = () => {
  return new MongoDBPostRepository()
}