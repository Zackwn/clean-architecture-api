import { PermissionData } from "../../entities/permission/permission-data";
import { RoleData } from "../../entities/role/role-data";
import { RoleDoNotExistsError } from "../../repositories/errors/role/role-do-not-exists";
import { Either } from "../../shared/either";

export interface RoleRepository {
  findByName(roleName: string): Promise<Either<RoleDoNotExistsError, RoleData>>
  getRolePermissions(roleID: string): Promise<PermissionData[]>
}