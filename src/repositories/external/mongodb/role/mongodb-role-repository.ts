import { RoleData } from "../../../../entities/role/role-data";
import { Either, left, right } from "../../../../shared/either";
import { RoleRepository } from "../../../../usecases/ports/role-repository";
import { RoleAlreadyExists } from "../../../errors/role/role-already-exists";
import { RoleDoNotExistsError } from "../../../errors/role/role-do-not-exists";
import { MongoHelper } from "../helpers/mongo-helper";

export class MongoDBRoleRepository implements RoleRepository {
  public constructor() { }

  public async findByName(roleName: string): Promise<Either<RoleDoNotExistsError, RoleData>> {
    const roleCollection = MongoHelper.getCollection('role')

    const role = await roleCollection.findOne({ name: roleName })

    if (!role) {
      return left(new RoleDoNotExistsError(roleName))
    }

    return right(role)
  }

  public async add(roleData: RoleData, permissionsIDs: string[]): Promise<Either<RoleAlreadyExists, RoleData>> {
    const roleRepository = MongoHelper.getCollection('role')

    const roleExists = (await this.findByName(roleData.name)).isRight()

    if (roleExists) {
      return left(new RoleAlreadyExists(roleData.name))
    }

    await roleRepository.insertOne({
      ...roleData,
      permissionsIDs: permissionsIDs
    })

    return right(roleData)
  }
}