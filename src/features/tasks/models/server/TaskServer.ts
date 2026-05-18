export interface TaskServer {
  title: string;
  description: string;
  completedDate: string | null;
  date: string;
  time: string | null;
  userId: string;
  createdAt: number;
  type: 'daily' | 'once';
}
