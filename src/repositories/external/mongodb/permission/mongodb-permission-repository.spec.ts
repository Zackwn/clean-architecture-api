import { PermissionBuilder } from '../../../../entities/permission/permission-builder'
import { MongoHelper } from '../helpers/mongo-helper'
import { MongoDBPermissionRepository } from './mongodb-permission-repository'

describe('MongoDB Permission Repository', () => {
  beforeEach(async () => {
    await MongoHelper.clearCollection('permission')
  })

  it('should save permission and get all', async () => {
    const permission = PermissionBuilder.aPermission().build()

    const permissionRepository = new MongoDBPermissionRepository()

    await permissionRepository.add(permission)

    expect((await permissionRepository.getAllPermissions()).length).toBe(1)
  })
})