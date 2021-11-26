import { api, auth } from 'API'
import { IUser } from 'interfaces/user'

export async function getUsers(filter?: any): Promise<any> {
  try {
    const response = await api.get(`/users?filter=${JSON.stringify(filter)}`, {
      headers: auth()
    })
    return response.data
  } catch (error: any) {
    return error?.message
  }
}

export async function getUserDetail(userId: string): Promise<any> {
  try {
    const response = await api.get(`/users/${userId}`, {
      headers: auth()
    })
    return response.data
  } catch (error: any) {
    return error?.message
  }
}

export async function createUser(user: IUser): Promise<IUser> {
  try {
    const response = await api.post(`/users/`, user, {
      headers: auth()
    })
    return response.data
  } catch (error: any) {
    return error?.message
  }
}

export async function updateUser(userId: string, user: IUser): Promise<IUser> {
  try {
    const response = await api.patch(`/users/${userId}`, user, {
      headers: auth()
    })
    return response.data
  } catch (error: any) {
    return error?.message
  }
}
