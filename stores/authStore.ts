import omit from 'lodash/omit'
import { makeAutoObservable } from 'mobx'
import router from 'next/router'
import { toast } from 'react-toastify'
import { RootStore } from 'stores'
import { login as loginAPI, getUserDetail } from 'API/authenticate'
import routes from 'routes'
import { ELocalStorageKeys, EServerErrorMessage } from 'constants/enum'
import { IUser } from 'interfaces/user'
import { ILoginRequest } from 'interfaces/authenticate'

export default class AuthStore {
  rootStore: RootStore
  token: string = ''
  user: IUser = {}
  isLoading: boolean = false

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  async getMyUser(): Promise<void> {
    const currentUser = await getUserDetail()
    this.user = currentUser
  }

  setAccessToken(accessToken: string, isRemember: boolean): void {
    const token = ELocalStorageKeys.ACCESS_TOKEN
    if (isRemember) {
      localStorage.setItem(token, accessToken)
    } else {
      sessionStorage.setItem(token, accessToken)
    }
    this.token = accessToken
  }

  clearAccessToken(): void {
    const token = ELocalStorageKeys.ACCESS_TOKEN
    localStorage.removeItem(token)
    sessionStorage.removeItem(token)
    this.token = ''
    this.user = {}
  }

  async getAccessToken(): Promise<void> {
    const token = ELocalStorageKeys.ACCESS_TOKEN
    const currentToken: string = localStorage.getItem(token) ?? sessionStorage.getItem(token) ?? ''
    this.token = currentToken
    try {
      if (currentToken) {
        const currentUser = await getUserDetail()
        this.user = currentUser
      }
    } catch (error) {
      toast.error('Something may wrong, please try again !')
    }
  }

  async login(data: ILoginRequest): Promise<void> {
    try {
      const res = await loginAPI(omit(data, 'isRemember'))
      const { token } = res
      if (token) {
        if (data?.isRemember) {
          this.setAccessToken(token, true)
        } else {
          this.setAccessToken(token, false)
        }
        this.getMyUser()
      }
      router.push(routes.home.value)
    }
    //*INFO: Catch clause variable type annotation must be 'any' or 'unknown' if specified
    catch (error: any) {
      if (error.message === EServerErrorMessage.PASSWORD_INVALID) {
        toast.error('The username or password is incorrect. Please try again')
      } else {
        toast.error('Something may wrong, please try again !')
      }
    }
  }
}
