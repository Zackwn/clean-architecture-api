import { Role } from './role'
import { RoleBuilder } from './role-builder'
import { RoleData } from './role-data'

describe("Role Domain Entity", () => {
  it('should create role successfuly', () => {
    const roleData = RoleBuilder.aRole().build()

    const role = Role.create(roleData).value as Role


    expect(role.permissionsIDs.value).toEqual(roleData.permissionsIDs)
  })
})