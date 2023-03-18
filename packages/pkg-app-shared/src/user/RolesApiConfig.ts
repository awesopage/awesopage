import type { ApiConfig } from 'pkg-app-shared/src/common/ApiConfig'
import type { Role, UserDTO } from 'pkg-app-shared/src/user/UserDTO'

export type AssignRolesOptionsDTO = Readonly<{
  email: string
  roles: Role[]
}>

export const assignRolesApiConfig: ApiConfig<UserDTO, AssignRolesOptionsDTO> = {
  name: 'assign roles',
  method: 'post',
  getPath: () => '/api/roles',
  isSignInRequired: true,
}
