import { RoleDomainError } from "./role-domain-error";

export class InvalidPermissionsIDsError extends Error implements RoleDomainError {
  public constructor() {
    super(`Invalid Permissions IDs.`)
  }
}