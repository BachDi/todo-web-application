import { getTasks } from 'API/task'
import { makeAutoObservable } from 'mobx'
import { RootStore } from 'stores'

class TaskStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  tasks: any[] = []

  async getTaskList() {
    this.tasks = await getTasks()
  }
}

export default TaskStore
