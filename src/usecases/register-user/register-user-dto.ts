import { UserData } from '../../entities/user/user-data'

export interface RegisterUserDTO extends Omit<UserData, 'id'> { }