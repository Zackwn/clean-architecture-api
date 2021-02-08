import { PermissionData } from "../../../entities/permission/permission-data";
import { RoleData } from "../../../entities/role/role-data";
import { Either, left, right } from "../../../shared/either";
import { RoleRepository } from "../../../usecases/ports/role-repository";
import { RoleDoNotExistsError } from "../../errors/role/role-do-not-exists";

export class InMemoryRoleRepository implements RoleRepository {
  private roles: RoleData[]

  public constructor(roles: RoleData[] = []) {
    this.roles = roles
  }

  public async findByName(roleName: string): Promise<Either<RoleDoNotExistsError, RoleData>> {
    const roleOrUndefined = this.roles.find(role => role.name === roleName)
    if (roleOrUndefined === undefined) {
      return left(new RoleDoNotExistsError(roleName))
    }
    return right(roleOrUndefined)
  }

  public async getRolePermissions(roleID: string): Promise<PermissionData[]> {
    // :(
    return []
  }
}