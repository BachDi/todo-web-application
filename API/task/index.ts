import { AxiosRequestHeaders } from 'axios'
import { api, auth } from 'API'

export async function getTasks(): Promise<any> {
  try {
    const response = await api.get(`/tasks/`, {
      headers: auth() as AxiosRequestHeaders
    })
    return response.data
  } catch (error: any) {
    return error?.message
  }
}
