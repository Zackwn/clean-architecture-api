import { RepositoryError } from "../../errors/repository-error"

export class RoleDoNotExistsError extends Error implements RepositoryError {
  public constructor(roleName: string) {
    super(`The role: "${roleName}" do not exists.`)
    this.name = 'RoleDoNotExistsError'
  }
}