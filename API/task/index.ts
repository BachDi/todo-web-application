import { api, auth } from 'API'
import { ITask } from 'interfaces/task'

export async function getTasks(): Promise<any> {
  try {
    const response = await api.get(`/tasks/`, {
      headers: auth()
    })
    return response.data
  } catch (error: any) {
    return error?.message
  }
}

export async function getTaskDetail(taskId: string): Promise<any> {
  try {
    const response = await api.get(`/tasks/${taskId}`, {
      headers: auth()
    })
    return response.data
  } catch (error: any) {
    return error?.message
  }
}

export async function createTask(task: ITask): Promise<ITask> {
  try {
    const response = await api.post(`/tasks/`, task, {
      headers: auth()
    })
    return response.data
  } catch (error: any) {
    return error?.message
  }
}
