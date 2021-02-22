import { RepositoryError } from "../../errors/repository-error"

export class PermissionDoNotExistsError extends Error implements RepositoryError {
  public constructor(permissionID: string) {
    super(`The permission with id: "${permissionID}" do not exists.`)
    this.name = 'PermissionDoNotExistsError'
  }
}