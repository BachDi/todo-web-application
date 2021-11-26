import { IUser } from './../user';
import { IProject } from '../project';
export interface IProjectUser {
  id?: string;
  userId?: string;
  projectId?: string
  project?: IProject
  user?: IUser
}
