import { useContext, createContext } from 'react'
import TestStore from 'stores/testStore'
import AuthStore from './authStore'
import TaskStore from './taskStore'
import ProjectStore from './projectStore'

export class RootStore {
  authStore: AuthStore
  testStore: TestStore
  taskStore: TaskStore
  projectStore: ProjectStore

  constructor() {
    this.authStore = new AuthStore(this)
    this.testStore = new TestStore(this)
    this.taskStore = new TaskStore(this)
    this.projectStore = new ProjectStore(this)
  }
}

export const rootStore = new RootStore()

const storeContext = createContext(rootStore)

export const useStores = () => {
  return useContext(storeContext)
}
