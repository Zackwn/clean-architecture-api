import { Either, left, right } from "../../shared/either"
import { InvalidPermissionsIDsError } from "./errors/invalid-permissions-ids"

export class PermissionsIDs {
  private readonly permissionsIDs: string[]

  private constructor(permissionsIDs: string[]) {
    this.permissionsIDs = permissionsIDs
  }

  public get value(): string[] {
    return this.permissionsIDs
  }

  static create(permissionIDs: string[]): Either<InvalidPermissionsIDsError, PermissionsIDs> {
    if (PermissionsIDs.validate(permissionIDs)) {
      return right(new PermissionsIDs(permissionIDs))
    }
    return left(new InvalidPermissionsIDsError())
  }

  static validate(permissionsIDs: string[]) {
    for (let permissionID in permissionsIDs) {
      if (permissionID?.length <= 0) {
        return false
      }
    }

    return true
  }
}