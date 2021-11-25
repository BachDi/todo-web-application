export interface ITask {
  id?: string;
  name?: string;
  description?: string;
  status?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  isComplete?: boolean
  createdAt?: Date;
  updatedAt?: Date;
  startDate?: Date;
  dueDate?: Date;
}
