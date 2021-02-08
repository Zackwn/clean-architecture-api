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
}