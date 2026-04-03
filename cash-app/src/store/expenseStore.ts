import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { Expense, Category, Period } from '../types';

interface ExpenseState {
  expenses: Expense[];
  categories: Category[];
  selectedPeriod: Period;
  isLoading: boolean;

  addExpense: (expense: Omit<Expense, 'id' | 'createdAt' | 'syncStatus'>) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  setPeriod: (period: Period) => void;
  getExpensesByPeriod: () => Expense[];
  getTotalByPeriod: () => number;
}

const defaultCategories: Category[] = [
  { id: '1', name: 'Comida', icon: 'utensils', color: '#F59E0B' },
  { id: '2', name: 'Transporte', icon: 'car', color: '#3B82F6' },
  { id: '3', name: 'Entretenimiento', icon: 'film', color: '#8B5CF6' },
  { id: '4', name: 'Salud', icon: 'heart', color: '#EF4444' },
  { id: '5', name: 'Compras', icon: 'shopping-bag', color: '#EC4899' },
  { id: '6', name: 'Facturas', icon: 'file-text', color: '#6366F1' },
  { id: '7', name: 'Otros', icon: 'more-horizontal', color: '#6B7280' },
];

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set, get) => ({
      expenses: [],
      categories: defaultCategories,
      selectedPeriod: 'day',
      isLoading: false,

      addExpense: (expense) => {
        const newExpense: Expense = {
          ...expense,
          id: uuidv4(),
          createdAt: Date.now(),
          syncStatus: 'local',
        };
        set((state) => ({ expenses: [newExpense, ...state.expenses] }));
      },

      deleteExpense: (id) => {
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        }));
      },

      updateExpense: (id, expense) => {
        set((state) => ({
          expenses: state.expenses.map((e) =>
            e.id === id ? { ...e, ...expense, syncStatus: 'pending' } : e
          ),
        }));
      },

      setPeriod: (period) => set({ selectedPeriod: period }),

      getExpensesByPeriod: () => {
        const { expenses, selectedPeriod } = get();
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);

        return expenses.filter((expense) => {
          // Crear fecha en hora local, no UTC
          const [year, month, day] = expense.date.split('-').map(Number);
          const expenseDate = new Date(year, month - 1, day, 0, 0, 0);
          const endOfDay = new Date(year, month - 1, day, 23, 59, 59);

          switch (selectedPeriod) {
            case 'day':
              return expenseDate >= startOfDay && expenseDate <= endOfDay;
            case 'week':
              const weekAgo = new Date(startOfDay);
              weekAgo.setDate(weekAgo.getDate() - 7);
              return expenseDate >= weekAgo;
            case 'month':
              const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
              return expenseDate >= monthStart;
            default:
              return true;
          }
        });
      },

      getTotalByPeriod: () => {
        return get().getExpensesByPeriod().reduce((sum, e) => sum + e.amount, 0);
      },
    }),
    {
      name: 'cash-expenses',
    }
  )
);
