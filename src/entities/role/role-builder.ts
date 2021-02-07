import { RoleData } from "./role-data";

export class RoleBuilder {
  private role: RoleData = {
    id: 'e7717d12-a374-4203-809d-a1082761d7af',
    name: 'Ghost'
  }

  private constructor() { }

  static aRole(): RoleBuilder {
    return new RoleBuilder()
  }

  public build(): RoleData {
    return this.role
  }
}