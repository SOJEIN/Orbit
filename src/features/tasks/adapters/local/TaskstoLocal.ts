import { TaskLocal } from '../../models/local/TaskLocal';
import { TaskServer } from '../../models/server/TaskServer';

export const TaskstoLocal = (id: string, data: TaskServer): TaskLocal => ({
  id,
  title: data.title,
  description: data.description,
  completedDate: data.completedDate ?? null,
  date: data.date,
  userId: data.userId,
  type: data.type,
});
