import { InMemoryUserRepository } from "../../repositories/user/in-memory/in-memory-user-repository"
import { UserRepository } from '../../usecases/ports/user-repository'

export const makeInMemoryUserRepository = (): UserRepository => {
  const userRepository = new InMemoryUserRepository()

  return userRepository
}

export default makeInMemoryUserRepository()