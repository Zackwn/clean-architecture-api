import { v4 as uuid } from 'uuid'

export class ID {
  private readonly id: string

  public get value(): string {
    return this.id
  }

  private constructor(id: string) {
    this.id = id
  }

  static validate(id: string): boolean {
    if (!id) {
      return false
    }

    return true
  }

  static create(): ID {
    const id = uuid()
    return new ID(id)
  }
}