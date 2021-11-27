import { toast } from 'react-toastify'
import { createUser, getUserDetail, getUsers, updateUser } from 'API/user'
import { IUser } from 'interfaces/user'
import { makeAutoObservable } from 'mobx'
import { RootStore } from 'stores'

class UserStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  users: IUser[] = []
  userDetail: IUser = {}

  async getList(filter: any = {}) {
    this.users = await getUsers(filter)
  }

  async getDetail(id: string, filter: any = {}) {
    this.userDetail = await getUserDetail(id, filter)
  }

  async addUser(user: IUser) {
    try {
      const result = await createUser(user)
      this.users = [...this.users, result]
      toast.success('Create User Successfully')
    } catch (error) {
      console.log(error)
      toast.success('Create User Error')
    }
  }

  async editUser(userId, user: IUser) {
    try {
      await updateUser(userId, user)
      this.getList()
      toast.success('Edit User Successfully')
    } catch (error) {
      console.log(error)
      toast.success('Edit User Error')
    }
  }
}

export default UserStore
