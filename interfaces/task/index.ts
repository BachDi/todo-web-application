import { IProject } from './../project/index';
export interface ITask {
  id?: string;
  name?: string;
  description?: string;
  status?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  isComplete?: boolean
  projectId?: string
  project?: IProject
  createdAt?: Date;
  updatedAt?: Date;
  startDate?: Date;
  dueDate?: Date;
}
