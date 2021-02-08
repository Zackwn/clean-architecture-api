import { InMemoryRoleRepository } from './in-memory-role-repository'
import { RoleBuilder } from '../../../entities/role/role-builder'

describe('In Memory Role Repository', () => {
  it('should return role by name', async () => {
    const role = RoleBuilder.aRole().build()
    const roleRepository = new InMemoryRoleRepository([role])
    expect((await roleRepository.findByName(role.name)).value).toBe(role)
  })

  it('should return error when try find non existing role by name', async () => {
    const roleRepository = new InMemoryRoleRepository()
    expect((await roleRepository.findByName('non_exists')).isLeft()).toBe(true)
  })
})