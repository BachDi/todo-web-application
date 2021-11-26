import { IProject } from 'interfaces/project'
import { api, auth } from 'API'

export async function getProjects(filter: any = {}): Promise<any> {
  try {
    const response = await api.get(`/projects?filter=${JSON.stringify(filter)}`, {
      headers: auth()
    })
    return response.data
  } catch (error: any) {
    return error?.message
  }
}

export async function getProjectDetail(projectId: string): Promise<any> {
  try {
    const response = await api.get(`/projects/${projectId}`, {
      headers: auth()
    })
    return response.data
  } catch (error: any) {
    return error?.message
  }
}

export async function createProject(project: IProject): Promise<IProject> {
  try {
    const response = await api.post(`/projects`, project, {
      headers: auth()
    })
    return response.data
  } catch (error: any) {
    return error?.message
  }
}
