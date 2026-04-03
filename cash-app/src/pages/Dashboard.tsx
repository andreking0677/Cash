import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useExpenseStore } from '../store/expenseStore';
import TotalCard from '../components/TotalCard';
import PeriodSelector from '../components/PeriodSelector';
import ExpenseCard from '../components/ExpenseCard';
import AddExpenseSheet from '../components/AddExpenseSheet';
import DashboardChart from '../components/DashboardChart';
import StatCard from '../components/StatCard';
import { Sparkles, Plus, TrendingDown, AlertCircle, Target } from 'lucide-react';

export default function Dashboard() {
  const { selectedPeriod, setPeriod, getExpensesByPeriod, getTotalByPeriod, categories } = useExpenseStore();
  const periodExpenses = getExpensesByPeriod();
  const total = getTotalByPeriod();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Calculate stats
  const stats = useMemo(() => {
    if (periodExpenses.length === 0) return null;

    const avgExpense = total / periodExpenses.length;
    const maxExpense = Math.max(...periodExpenses.map((e) => e.amount));
    const topCategory = periodExpenses.reduce(
      (acc, exp) => {
        const idx = acc.findIndex((c) => c.id === exp.category);
        if (idx === -1) {
          acc.push({ id: exp.category, amount: exp.amount });
        } else {
          acc[idx].amount += exp.amount;
        }
        return acc;
      },
      [] as { id: string; amount: number }[]
    ).sort((a, b) => b.amount - a.amount)[0];

    const topCategoryName = categories.find((c) => c.id === topCategory?.id)?.name || 'N/A';

    return {
      avgExpense,
      maxExpense,
      topCategoryName,
      expenseCount: periodExpenses.length,
    };
  }, [periodExpenses, categories]);

  return (
    <div className="space-y-6 pb-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-black text-gradient">CASH</h1>
        <p className="text-text-secondary">Tu gestor de gastos inteligente</p>
      </motion.div>

      {/* Main Total Card */}
      <TotalCard
        total={total}
        period={selectedPeriod}
        count={periodExpenses.length}
      />

      {/* Stats Cards (only if there are expenses) */}
      {stats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3"
        >
          <StatCard
            icon={<AlertCircle className="w-5 h-5" />}
            label="Promedio"
            value={`$${stats.avgExpense.toFixed(2)}`}
            color="#FFB84D"
          />
          <StatCard
            icon={<TrendingDown className="w-5 h-5" />}
            label="Máximo"
            value={`$${stats.maxExpense.toFixed(2)}`}
            color="#FF6B6B"
          />
        </motion.div>
      )}

      {/* Period Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <PeriodSelector selected={selectedPeriod} onChange={setPeriod} />
      </motion.div>

      {/* Charts Section */}
      {periodExpenses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <DashboardChart />
        </motion.div>
      )}

      {/* Recent Expenses Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-5 h-5 text-[#00D4AA]" />
            </motion.div>
            <h2 className="text-lg font-bold text-text">Gastos Recientes</h2>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsSheetOpen(true)}
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #00D4AA, #00B894)',
              boxShadow: '0 0 20px rgba(0, 212, 170, 0.4)',
            }}
          >
            <Plus className="w-6 h-6 text-background" />
          </motion.button>
        </div>

        {periodExpenses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-8 text-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              💸
            </motion.div>
            <p className="text-text font-semibold">Sin gastos este período</p>
            <p className="text-text-muted text-sm mt-1">
              Toca el + para registrar tu primer gasto
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
            }}
            className="space-y-3"
          >
            {periodExpenses.slice(0, 10).map((expense, index) => (
              <ExpenseCard key={expense.id} expense={expense} index={index} />
            ))}
          </motion.div>
        )}
      </div>

      <AddExpenseSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)} />
    </div>
  );
}
