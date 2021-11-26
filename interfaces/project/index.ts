import { IProjectUser } from 'interfaces/projectUser'
export interface IProject {
  id?: string
  name?: string
  description?: string
  isActive?: boolean
  isDeleted?: boolean
  createdAt?: Date
  updatedAt?: Date
  projectUsers?: IProjectUser[]
}
