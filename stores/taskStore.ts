import { createTask, getTaskDetail, getTasks } from 'API/task'
import { ITask } from 'interfaces/task'
import { makeAutoObservable } from 'mobx'
import { RootStore } from 'stores'

class TaskStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  tasks: ITask[] = []
  taskDetail: ITask = {}

  async getList() {
    this.tasks = await getTasks()
  }

  async getDetail(id: string) {
    this.taskDetail = await getTaskDetail(id)
  }

  async addTask(task: ITask) {
    try {
      const result = await createTask(task)
      this.tasks = [...this.tasks, result]
    } catch (error) {
      console.log(error)
    }
  }
}

export default TaskStore
