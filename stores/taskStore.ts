import { toast } from 'react-toastify'
import { createTask, getTaskDetail, getTasks, updateTask } from 'API/task'
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

  async getList(filter: any = {}) {
    this.tasks = await getTasks(filter)
  }

  async getDetail(id: string) {
    this.taskDetail = await getTaskDetail(id)
  }

  async addTask(task: ITask) {
    try {
      const result = await createTask(task)
      this.tasks = [...this.tasks, result]
      toast.success('Create Task Successfully')
    } catch (error) {
      console.log(error)
      toast.success('Create Task Error')
    }
  }

  async editTask(taskId, task: ITask) {
    try {
      await updateTask(taskId, task)
      toast.success('Edit Task Successfully')
    } catch (error) {
      console.log(error)
      toast.success('Edit Task Error')
    }
  }
}

export default TaskStore
