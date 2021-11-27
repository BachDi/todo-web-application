import { IProjectUser } from 'interfaces/projectUser'
import { api, auth } from 'API'

export async function createProjectUser(projectUser: IProjectUser): Promise<IProjectUser> {
  try {
    const response = await api.post(`/project-users`, projectUser, {
      headers: auth()
    })
    return response.data
  } catch (error: any) {
    return error?.message
  }
}

export async function updateProjectUser(projectUserId: string, projectUser: IProjectUser): Promise<IProjectUser> {
  try {
    const response = await api.patch(`/project-users/${projectUserId}`, projectUser, {
      headers: auth()
    })
    return response.data
  } catch (error: any) {
    return error?.message
  }
}
