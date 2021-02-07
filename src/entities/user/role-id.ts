export class RoleID {
  private readonly roleID: string

  public get value(): string {
    return this.roleID
  }

  private constructor(roleID: string) {
    this.roleID = roleID
  }

  static validate(roleID: string) {
    return true
  }

  static create(roleID: string): RoleID {
    return new RoleID(roleID)
  }
}