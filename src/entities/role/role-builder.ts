import { Role } from "./role";
import { RoleData } from "./role-data";

export class RoleBuilder {
  private role: RoleData = {
    id: 'e7717d12-a374-4203-809d-a1082761d7af',
    name: 'Ghost',
    permissionsIDs: ["6795bb91-7566-496e-9872-dfc8baf919d5", "834332a0-f33d-4628-a93b-a21640b1fc71"]
  }

  private constructor() { }

  static aRole(): RoleBuilder {
    return new RoleBuilder()
  }

  public withInvalidPermissions(): RoleBuilder {
    this.role.permissionsIDs = [""]
    return this
  }

  public build(): RoleData {
    return this.role
  }
}