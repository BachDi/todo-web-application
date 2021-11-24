import { makeAutoObservable } from 'mobx'
import { RootStore } from 'stores'

class TestStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  status: boolean = true

  toggleStatus() {
    this.status = !this.status
  }
}

export default TestStore
