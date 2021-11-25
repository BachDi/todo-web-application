import { api, auth } from 'API'
import { ILoginRequest } from 'interfaces/authenticate'
import { IUser } from 'interfaces/user'

export async function login(data: ILoginRequest) {
  try {
    const response = await api.post(`/auth/login`, data)
    return response.data
  } catch (error: any) {
    throw new Error(error?.message)
  }
}

export async function getUserDetail() {
  try {
    const response = await api.get(`/auth/me`, {
      headers: auth()
    })
    return response.data
  } catch (error: any) {
    throw new Error(error?.message)
  }
}

export async function signUp(userData: Omit<IUser, 'id'>): Promise<IUser> {
  try {
    const response = await api.post(`/auth/signup`, userData)
    return response.data
  } catch (error: any) {
    throw new Error(error?.message)
  }
}
