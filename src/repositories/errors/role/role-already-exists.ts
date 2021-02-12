import { RepositoryError } from "../repository-error";

export class RoleAlreadyExists extends Error implements RepositoryError {
  public constructor(roleName: string) {
    super(`The role: "${roleName}" already exists.`)
    this.name = 'RoleAlreadyExists'
  }
}