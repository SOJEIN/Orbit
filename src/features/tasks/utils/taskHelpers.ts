export const today = () => new Date().toISOString().split('T')[0];

export const isCompletedToday = (
  completedDate: string | null,
  type: 'daily' | 'once',
): boolean => {
  if (completedDate === null) return false;
  if (type === 'once') return true;
  return completedDate === today();
  
};
