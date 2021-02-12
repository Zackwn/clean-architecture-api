import { PermissionData } from "../../entities/permission/permission-data";
import { RoleData } from "../../entities/role/role-data";
import { RoleAlreadyExists } from "../../repositories/errors/role/role-already-exists";
import { RoleDoNotExistsError } from "../../repositories/errors/role/role-do-not-exists";
import { Either } from "../../shared/either";

export interface RoleRepository {
  findByName(roleName: string): Promise<Either<RoleDoNotExistsError, RoleData>>
  add(roleData: RoleData, permissionsIDs: string[]): Promise<Either<RoleAlreadyExists, RoleData>>
}