import { PermissionData } from "../../entities/permission/permission-data";

export interface PermissionRepository {
  getAllPermissions(): Promise<PermissionData[]>
}