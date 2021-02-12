import { PermissionData } from "../../entities/permission/permission-data";

export interface PermissionRepository {
  getAllPermissions(): Promise<PermissionData[]>
  add(permissionData: PermissionData): Promise<PermissionData>
  getRolePermissions(roleID: string): Promise<PermissionData[]>
}