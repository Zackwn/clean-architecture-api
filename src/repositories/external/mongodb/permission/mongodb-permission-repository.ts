import { PermissionData } from "../../../../entities/permission/permission-data";
import { PermissionRepository } from "../../../../usecases/ports/permission-repository";
import { MongoHelper } from "../helpers/mongo-helper";

export class MongoDBPermissionRepository implements PermissionRepository {
  public constructor() { }

  public async add(permissionData: PermissionData) {
    const permissionRepository = MongoHelper.getCollection('permission')

    await permissionRepository.insertOne(permissionData)

    return permissionData
  }

  public async getAllPermissions(): Promise<PermissionData[]> {
    const permissionRepository = MongoHelper.getCollection('permission')

    const mongoCursor = permissionRepository.find()

    const permissions: PermissionData[] = []

    await mongoCursor.forEach(permission => {
      permissions.push(permission)
    })

    return permissions
  }
}