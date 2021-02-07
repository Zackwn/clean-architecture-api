export class Name {
  private readonly name: string

  public get value(): string {
    return this.name
  }

  private constructor(name: string) {
    this.name = name
  }

  static validate(): boolean {
    return true
  }

  static create(name: string): Name {
    return new Name(name)
  }
}