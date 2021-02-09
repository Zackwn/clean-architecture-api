import { PermissionData } from "../../../entities/permission/permission-data";
import { PermissionRepository } from "../../../usecases/ports/permission-repository";

export class InMemoryPermissionRepository implements PermissionRepository {
  private permissions: PermissionData[]

  public constructor(permissions: PermissionData[]) {
    this.permissions = permissions
  }

  public async getAllPermissions(): Promise<PermissionData[]> {
    return this.permissions
  }

  public async add(permissionData: PermissionData): Promise<PermissionData> {
    this.permissions.push(permissionData)
    return permissionData
  }
}