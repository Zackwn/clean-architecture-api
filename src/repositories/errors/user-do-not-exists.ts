import { RepositoryError } from "./repository-error";

export class UserDoNotExistsError extends Error implements RepositoryError {
  public constructor(email: string) {
    super(`User with email "${email}" doesn't exists.`)
    this.name = 'UserDoNotExistsError'
  }
}