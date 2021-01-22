import { v4 as uuid } from 'uuid'

export class ID {
  private readonly id: string

  get value(): string {
    return this.id
  }

  private constructor(id: string) {
    this.id = id
  }

  static create() {
    const id = uuid()
    return new ID(id)
  }

  static validate(id: string): boolean {
    if (id.length <= 0) {
      return false
    }

    return true
  }
}