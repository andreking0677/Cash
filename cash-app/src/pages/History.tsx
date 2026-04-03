import { motion } from 'framer-motion';
import { useExpenseStore } from '../store/expenseStore';
import ExpenseCard from '../components/ExpenseCard';
import { useMemo, useState } from 'react';
import { Calendar } from 'lucide-react';

export default function History() {
  const { expenses, categories } = useExpenseStore();
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredExpenses = useMemo(() => {
    if (filterCategory === 'all') return expenses;
    return expenses.filter((e) => e.category === filterCategory);
  }, [expenses, filterCategory]);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-xl bg-[#7C5CFF]/20 flex items-center justify-center">
          <Calendar className="w-5 h-5 text-[#7C5CFF]" />
        </div>
        <h2 className="text-2xl font-black text-text">Historial</h2>
      </motion.div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setFilterCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
            filterCategory === 'all'
              ? 'bg-gradient-to-r from-[#00D4AA] to-[#00B894] text-background'
              : 'glass text-text-secondary'
          }`}
        >
          Todos ({expenses.length})
        </motion.button>
        {categories.map((cat, index) => {
          const count = expenses.filter((e) => e.category === cat.id).length;
          return (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                filterCategory === cat.id
                  ? 'text-background'
                  : 'glass text-text-secondary'
              }`}
              style={{
                background: filterCategory === cat.id
                  ? `linear-gradient(90deg, ${cat.color}, ${cat.color}dd)`
                  : undefined,
              }}
            >
              {cat.name} ({count})
            </motion.button>
          );
        })}
      </div>

      {/* Expenses List */}
      {filteredExpenses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-8 text-center"
        >
          <div className="text-6xl mb-4">📋</div>
          <p className="text-text-secondary font-medium">
            No hay gastos registrados
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
          }}
          className="space-y-3"
        >
          {filteredExpenses.map((expense, index) => (
            <ExpenseCard key={expense.id} expense={expense} index={index} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
