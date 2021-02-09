import { UserData } from "../../../../entities/user/user-data";
import { Either, left, right } from "../../../../shared/either";
import { UpdateUserData, UserRepository } from "../../../../usecases/ports/user-repository";
import { UserAlredyExistsError } from "../../../errors/user/user-alredy-exists";
import { UserDoNotExistsError } from "../../../errors/user/user-do-not-exists";
import { MongoHelper } from "../helpers/mongo-helper";

export class MongoDBUserRepository implements UserRepository {
  public constructor() { }

  public async findByEmail(email: string): Promise<Either<UserDoNotExistsError, UserData>> {
    const userCollection = MongoHelper.getCollection('user')
    const result = await userCollection.findOne({ email })
    if (!result) {
      return left(new UserDoNotExistsError(email))
    }
    return right(result as UserData)
  }

  public async findById(id: string): Promise<Either<UserDoNotExistsError, UserData>> {
    const userCollection = MongoHelper.getCollection('user')
    const result = await userCollection.findOne({ id })
    if (!result) {
      return left(new UserDoNotExistsError(id))
    }
    return right(result as UserData)
  }

  public async exists(email: string): Promise<boolean> {
    return (await this.findByEmail(email)).isRight()
  }

  public async updateUser(id: string, updatedUserData: UpdateUserData): Promise<Either<UserDoNotExistsError, UserData>> {
    const userOrError = await this.findById(id)
    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }
    const userCollection = MongoHelper.getCollection('user')
    const result = await userCollection.findOneAndUpdate({ id }, {
      $set: updatedUserData
    }, { returnOriginal: false })
    return right(result.value as UserData)
  }

  public async save(userData: UserData): Promise<Either<UserAlredyExistsError, UserData>> {
    if (await this.exists(userData.email)) {
      return left(new UserAlredyExistsError(userData.email))
    }
    const userCollection = MongoHelper.getCollection('user')

    await userCollection.insertOne(userData)

    return right(userData)
  }
}