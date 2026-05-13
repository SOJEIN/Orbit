export interface TaskLocal {
  id: string;
  title: string;
  description: string;
  completedDate: string | null;
  date: string;
  userId: string;
  type: 'daily' | 'once';
}
