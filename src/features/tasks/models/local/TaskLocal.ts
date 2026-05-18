export interface TaskLocal {
  id: string;
  title: string;
  description: string;
  completedDate: string | null;
  date: string;
  time: string | null;
  userId: string;
  type: 'daily' | 'once';
}
