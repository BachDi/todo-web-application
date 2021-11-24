import { useContext, createContext } from 'react'
import TestStore from 'stores/testStore'
import TaskStore from './taskStore'

export class RootStore {
  testStore: TestStore
  taskStore: TaskStore

  constructor() {
    this.testStore = new TestStore(this)
    this.taskStore = new TaskStore(this)
  }
}

export const rootStore = new RootStore()

const storeContext = createContext(rootStore)

export const useStores = () => {
  return useContext(storeContext)
}
