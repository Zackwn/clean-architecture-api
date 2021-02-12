import { PermissionData } from "./permission-data";

export class PermissionBuilder {
  private permission: PermissionData = {
    description: 'permission-description',
    id: '2d53676a-ce73-4c85-aed4-52a8091daf81',
    name: 'permission-name'
  }

  private constructor() { }

  public build(): PermissionData {
    return this.permission
  }

  static aPermission(): PermissionBuilder {
    return new PermissionBuilder()
  }
}