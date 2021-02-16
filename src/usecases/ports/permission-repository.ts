import { PermissionData } from "../../entities/permission/permission-data";
import { Either } from "../../shared/either";
import { PermissionDoNotExistsError } from '../../repositories/errors/permission/permission-do-not-exists'

export interface PermissionRepository {
  getAllPermissions(): Promise<PermissionData[]>
  add(permissionData: PermissionData): Promise<PermissionData>
  getRolePermissions(roleID: string): Promise<PermissionData[]>
  findById(permissionID: string): Promise<Either<PermissionDoNotExistsError, PermissionData>>
}