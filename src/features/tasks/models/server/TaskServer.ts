export interface TaskServer {
  title: string;
  description: string;
  completedDate: string | null;
  date: string;
  userId: string;
  createdAt: number;
  type: 'daily' | 'once';
}
