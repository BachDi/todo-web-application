import { IUser } from 'interfaces/user';
import { IProject } from './../project/index'
export interface ITask {
  id?: string
  name?: string
  description?: string
  status?: string
  isActive?: boolean
  isDeleted?: boolean
  isComplete?: boolean
  assigneeTo?: string
  createdBy?: string
  projectId?: string
  project?: IProject
  assignee?: IUser
  parent?: ITask
  createdAt?: Date
  updatedAt?: Date
  startDate?: Date
  dueDate?: Date
}
