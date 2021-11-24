import { api } from 'API'
import { ILoginRequest } from 'interfaces/authenticate'

export async function login(data: ILoginRequest) {
  try {
    const response = await api.post(`/auth/login`, data)
    return response.data
  } catch (error: any) {
    throw new Error(error?.message)
  }
}
