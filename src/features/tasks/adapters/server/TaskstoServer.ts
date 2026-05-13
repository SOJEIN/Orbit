import { TaskLocal } from '../../models/local/TaskLocal';
import { TaskServer } from '../../models/server/TaskServer';

export const TaskstoServer = (task: Omit<TaskLocal, 'id'>): TaskServer => ({
  title: task.title,
  description: task.description,
  completedDate: task.completedDate,
  date: task.date,
  userId: task.userId,
  type: task.type,
  createdAt: Date.now(),
});
