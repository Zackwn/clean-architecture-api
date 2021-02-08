import { RepositoryError } from "../../errors/repository-error"

export class UserDoNotExistsError extends Error implements RepositoryError {
  public constructor(identifier: string) {
    super(`User with identifier "${identifier}" doesn't exists.`)
    this.name = 'UserDoNotExistsError'
  }
}