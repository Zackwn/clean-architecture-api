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

  it('should find permission by id', async () => {
    const permission = PermissionBuilder.aPermission().build()

    const permissionRepository = new MongoDBPermissionRepository()

    await permissionRepository.add(permission)

    expect((await permissionRepository.findById(permission.id)).value).toEqual(permission)
  })

  it('should return error when try finding non existing permission', async () => {
    const permission = PermissionBuilder.aPermission().build()

    const permissionRepository = new MongoDBPermissionRepository()

    expect((await permissionRepository.findById(permission.id)).isLeft()).toBe(true)
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

    const role = RoleBuilder.aRole().build()
    await roleRepository.add(role)

    const permissionBase = PermissionBuilder.aPermission().build()
    for (let permissionID of role.permissionsIDs) {
      await permissionRepository.add({
        ...permissionBase,
        id: permissionID
      })
    }

    const result = await permissionRepository.getRolePermissions(role.id)

    expect(result.length).toBe(2)
    expect(result[0]?.id).toBe(role.permissionsIDs[0])
    expect(result[1]?.id).toBe(role.permissionsIDs[1])
  })
})