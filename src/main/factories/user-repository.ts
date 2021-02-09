import { MongoDBUserRepository } from "../../repositories/external/mongodb/user/mongodb-user-repository"

export const makeUserRepository = () => {
  return new MongoDBUserRepository()
}