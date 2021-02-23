import { Either, left, right } from "../../shared/either";
import { InvalidPermissionsIDsError } from "./errors/invalid-permissions-ids";
import { ID } from "./id";
import { Name } from "./name";
import { PermissionsIDs } from "./permissions-ids";
import { RoleData } from "./role-data";

export class Role {
  public readonly id: ID
  public readonly name: Name
  public readonly permissionsIDs: PermissionsIDs

  private constructor(id: ID, name: Name, permissionsIDs: PermissionsIDs) {
    this.id = id
    this.name = name
    this.permissionsIDs = permissionsIDs
    Object.freeze(this)
  }

  static create(roleData: Omit<RoleData, 'id'>): Either<InvalidPermissionsIDsError, Role> {
    const id = ID.create()
    const roleName = Name.create(roleData.name)
    const permissionIDsOrError = PermissionsIDs.create(roleData.permissionsIDs)

    if (permissionIDsOrError.isLeft()) {
      return left(permissionIDsOrError.value)
    }

    return right(new Role(id, roleName, permissionIDsOrError.value))
  }
}