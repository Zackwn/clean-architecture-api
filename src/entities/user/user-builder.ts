import { UserData } from "./user-data";

export class UserBuilder {
  private user: UserData = {
    email: 'any@mail.com',
    name: 'anyname'
  }

  private constructor() { }

  public static aUser() {
    return new UserBuilder()
  }

  public withInvalidEmail(): UserBuilder {
    this.user.email = 'invalid_email'
    return this
  }

  public withInvalidName(): UserBuilder {
    this.user.name = 'invalid@name'
    return this
  }

  public build(): UserData {
    return this.user
  }
}