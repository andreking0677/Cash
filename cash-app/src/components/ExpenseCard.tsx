import { motion } from 'framer-motion';
import type { Expense } from '../types';
import { useExpenseStore } from '../store/expenseStore';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Trash2, Utensils, Car, Film, Heart, ShoppingBag, FileText, MoreHorizontal } from 'lucide-react';

interface ExpenseCardProps {
  expense: Expense;
  index?: number;
}

const iconMap: Record<string, any> = {
  utensils: Utensils,
  car: Car,
  film: Film,
  heart: Heart,
  'shopping-bag': ShoppingBag,
  'file-text': FileText,
  'more-horizontal': MoreHorizontal,
};

export default function ExpenseCard({ expense, index = 0 }: ExpenseCardProps) {
  const { categories, deleteExpense } = useExpenseStore();
  const category = categories.find((c) => c.id === expense.category);
  const Icon = iconMap[category?.icon || 'more-horizontal'] || MoreHorizontal;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      className="glass rounded-2xl p-4 flex items-center gap-4 cursor-pointer group relative overflow-hidden"
    >
      {/* Color Accent Bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
        style={{ backgroundColor: category?.color || '#6B7280' }}
      />

      {/* Icon */}
      <motion.div
        whileHover={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.3 }}
        className="w-12 h-12 rounded-xl flex items-center justify-center ml-2"
        style={{ backgroundColor: `${category?.color}20` }}
      >
        <Icon className="w-6 h-6" style={{ color: category?.color }} />
      </motion.div>

      {/* Content */}
      <div className="flex-1 min-w-0 ml-2">
        <p className="font-semibold text-text truncate">
          {expense.description || category?.name || 'Gasto'}
        </p>
        <p className="text-sm text-text-secondary">
          {format(new Date(expense.date), "d MMM · h:mm a", { locale: es })}
        </p>
      </div>

      {/* Amount */}
      <div className="text-right mr-2">
        <p
          className="font-bold text-lg"
          style={{ color: category?.color || '#FF6B6B' }}
        >
          -${expense.amount.toFixed(2)}
        </p>
      </div>

      {/* Delete Button */}
      <motion.button
        initial={{ opacity: 0 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => deleteExpense(expense.id)}
        className="p-2 text-text-muted hover:text-[#FF6B6B] transition-colors opacity-0 group-hover:opacity-100"
      >
        <Trash2 className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
}
