import { useContext, createContext } from 'react'
import TestStore from 'stores/testStore'
import AuthStore from './authStore'
import TaskStore from './taskStore'

export class RootStore {
  authStore: AuthStore
  testStore: TestStore
  taskStore: TaskStore

  constructor() {
    this.authStore = new AuthStore(this)
    this.testStore = new TestStore(this)
    this.taskStore = new TaskStore(this)
  }
}

export const rootStore = new RootStore()

const storeContext = createContext(rootStore)

export const useStores = () => {
  return useContext(storeContext)
}
