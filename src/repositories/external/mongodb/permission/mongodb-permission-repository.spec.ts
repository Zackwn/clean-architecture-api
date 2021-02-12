import { PermissionBuilder } from '../../../../entities/permission/permission-builder'
import { RoleBuilder } from '../../../../entities/role/role-builder'
import { MongoHelper } from '../helpers/mongo-helper'
import { MongoDBRoleRepository } from '../role/mongodb-role-repository'
import { MongoDBPermissionRepository } from './mongodb-permission-repository'

describe('MongoDB Permission Repository', () => {
  beforeEach(async () => {
    await MongoHelper.clearCollection('permission')
    await MongoHelper.clearCollection('role')
  })

  it('should add permission and get all', async () => {
    const permission = PermissionBuilder.aPermission().build()

    const permissionRepository = new MongoDBPermissionRepository()

    await permissionRepository.add(permission)

    expect((await permissionRepository.getAllPermissions()).length).toBe(1)
  })

  it('should get all role permissions', async () => {
    const permissionRepository = new MongoDBPermissionRepository()
    const roleRepository = new MongoDBRoleRepository()

    const permission = PermissionBuilder.aPermission().build()
    await permissionRepository.add(permission)

    const role = RoleBuilder.aRole().build()
    await roleRepository.add(role, [permission.id])

    const result = await permissionRepository.getRolePermissions(role.id)

    expect(result[0]).toEqual(permission)
  })
})