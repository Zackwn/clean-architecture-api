import { PermissionData } from "../../../../entities/permission/permission-data";
import { Either, left, right } from "../../../../shared/either";
import { PermissionRepository } from "../../../../usecases/ports/permission-repository";
import { PermissionDoNotExistsError } from "../../../errors/permission/permission-do-not-exists";
import { MongoHelper } from "../helpers/mongo-helper";

export class MongoDBPermissionRepository implements PermissionRepository {
  public constructor() { }

  public async add(permissionData: PermissionData) {
    const permissionCollection = MongoHelper.getCollection('permission')

    await permissionCollection.insertOne(permissionData)

    return permissionData
  }

  public async findById(permissionID: string): Promise<Either<PermissionDoNotExistsError, PermissionData>> {
    const permissionCollection = MongoHelper.getCollection('permission')

    const permission = await permissionCollection.findOne({ id: permissionID })

    if (!permission) {
      return left(new PermissionDoNotExistsError(permissionID))
    }

    return right(permission as PermissionData)
  }

  public async getAllPermissions(): Promise<PermissionData[]> {
    const permissionCollection = MongoHelper.getCollection('permission')

    const mongoCursor = permissionCollection.find()

    const permissions: PermissionData[] = []

    await mongoCursor.forEach(permission => {
      permissions.push(permission)
    })

    return permissions
  }

  public async getRolePermissions(roleID: string): Promise<PermissionData[]> {
    const roleCollection = MongoHelper.getCollection('role')
    const permissionCollection = MongoHelper.getCollection('permission')

    const role = await roleCollection.findOne({ id: roleID })

    const permissions: Promise<PermissionData>[] = []

    role.permissionsIDs.forEach((permissionID: string) => {
      permissions.push(permissionCollection.findOne({ id: permissionID }))
    })

    return await Promise.all(permissions)
  }
}