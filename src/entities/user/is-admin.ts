export class IsAdmin {
  private readonly isAdmin: boolean

  public get value(): boolean {
    return this.isAdmin
  }

  private constructor(isAdmin: boolean) {
    this.isAdmin = isAdmin
  }

  static validate(isAdmin: boolean) {
    return typeof isAdmin === "boolean"
  }

  static create(isAdmin: boolean): IsAdmin {
    return new IsAdmin(isAdmin)
  }
}