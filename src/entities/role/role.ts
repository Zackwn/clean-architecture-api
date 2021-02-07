import { ID } from "./id";
import { Name } from "./name";

export class Role {
  public readonly id: ID
  public readonly name: Name

  private constructor(id: ID, name: Name) {
    this.id = id
    this.name = name
    Object.freeze(this)
  }

  static create(name: string): Role {
    const id = ID.create()
    const roleName = Name.create(name)

    return new Role(id, roleName)
  }
}