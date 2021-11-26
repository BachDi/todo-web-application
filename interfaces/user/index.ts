import { IProjectUser } from 'interfaces/projectUser';

export interface IUser {
  id?: string
  name?: string
  role?: string
  isActive?: string
  username?: string
  password?: string
  projectUsers?: IProjectUser[]
  createdAt?: string
  updatedAt?: string
}
