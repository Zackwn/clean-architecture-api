import { ID } from "./id";
import { Name } from "./name";

export class Permission {
  public readonly id: ID
  public readonly name: Name

  private constructor(id: ID, name: Name) {
    this.id = id
    this.name = name
    Object.freeze(this)
  }

  static create(name: string): Permission {
    const id = ID.create()
    const permissionName = Name.create(name)

    return new Permission(id, permissionName)
  }
}