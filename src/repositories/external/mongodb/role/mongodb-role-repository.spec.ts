import { MongoDBRoleRepository } from './mongodb-role-repository'
import { RoleBuilder } from '../../../../entities/role/role-builder'
import { MongoHelper } from '../helpers/mongo-helper'
import { RoleData } from '../../../../entities/role/role-data'

describe('MongoDB Role Repository', () => {
  beforeEach(async () => {
    await MongoHelper.clearCollection('role')
  })

  it('should add and find role by name', async () => {
    const roleRepository = new MongoDBRoleRepository()

    const role = RoleBuilder.aRole().build()

    await roleRepository.add(role)

    const roleOrError = await roleRepository.findByName(role.name)

    const foundRole: RoleData = roleOrError.value as RoleData

    expect(foundRole.id).toEqual(role.id)
  })

  it('should fail to add already existing role', async () => {
    const roleRepository = new MongoDBRoleRepository()

    const role = RoleBuilder.aRole().build()

    await roleRepository.add(role)

    const result = await roleRepository.add(role)

    expect(result.isLeft()).toBe(true)
  })

  it('should return error when try finding non existing role', async () => {
    const roleRepository = new MongoDBRoleRepository()

    const role = RoleBuilder.aRole().build()

    expect((await roleRepository.findByName(role.name)).isLeft()).toBe(true)
  })
})