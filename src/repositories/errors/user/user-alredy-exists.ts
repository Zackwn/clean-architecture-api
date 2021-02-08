import { RepositoryError } from "../../errors/repository-error"

export class UserAlredyExistsError extends Error implements RepositoryError {
  public constructor(email: string) {
    super(`User with email "${email}" alredy exists.`)
    this.name = 'UserAlredyExistsError'
  }
}