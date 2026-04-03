export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: number;
  syncStatus: 'local' | 'synced' | 'pending';
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface UserSettings {
  currency: string;
  theme: 'light' | 'dark' | 'system';
  syncEnabled: boolean;
}

export type Period = 'day' | 'week' | 'month';
