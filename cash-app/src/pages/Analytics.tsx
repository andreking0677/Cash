import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useExpenseStore } from '../store/expenseStore';
import DashboardChart from '../components/DashboardChart';
import StatCard from '../components/StatCard';
import { BarChart3, TrendingUp, Award, AlertTriangle } from 'lucide-react';

export default function Analytics() {
  const { getExpensesByPeriod, getTotalByPeriod, categories } = useExpenseStore();
  const expenses = getExpensesByPeriod();
  const total = getTotalByPeriod();

  const analytics = useMemo(() => {
    if (expenses.length === 0) {
      return {
        avgExpense: 0,
        maxExpense: 0,
        minExpense: 0,
        totalExpenses: 0,
        expenseCount: 0,
        topCategory: 'N/A',
        topCategoryAmount: 0,
        trend: 'neutral' as const,
        trendPercent: 0,
      };
    }

    const amounts = expenses.map((e) => e.amount);
    const avgExpense = total / expenses.length;
    const maxExpense = Math.max(...amounts);
    const minExpense = Math.min(...amounts);

    // Top category
    const categoryMap: Record<string, number> = {};
    expenses.forEach((exp) => {
      categoryMap[exp.category] = (categoryMap[exp.category] || 0) + exp.amount;
    });
    const topCategoryId = Object.entries(categoryMap).sort(([, a], [, b]) => b - a)[0][0];
    const topCategoryName = categories.find((c) => c.id === topCategoryId)?.name || 'N/A';
    const topCategoryAmount = categoryMap[topCategoryId];

    return {
      avgExpense,
      maxExpense,
      minExpense,
      totalExpenses: total,
      expenseCount: expenses.length,
      topCategory: topCategoryName,
      topCategoryAmount,
      trend: avgExpense > 50 ? ('up' as const) : ('down' as const),
      trendPercent: Math.abs(avgExpense - 50) / 50 * 100,
    };
  }, [expenses, categories, total]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-8"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-black text-text">Análisis</h1>
        <p className="text-text-secondary">Profundiza en tus gastos</p>
      </motion.div>

      {expenses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-8 text-center mt-12"
        >
          <div className="text-5xl mb-4">📊</div>
          <p className="text-text font-semibold mb-2">Sin datos para analizar</p>
          <p className="text-text-muted text-sm">
            Registra gastos para ver análisis detallados
          </p>
        </motion.div>
      ) : (
        <>
          {/* Key Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 gap-3"
          >
            <StatCard
              icon={<TrendingUp className="w-5 h-5" />}
              label="Gasto Promedio"
              value={`$${analytics.avgExpense.toFixed(2)}`}
              color="#00D4AA"
              trend={analytics.trend}
              trendPercent={analytics.trendPercent}
            />
            <StatCard
              icon={<AlertTriangle className="w-5 h-5" />}
              label="Gasto Máximo"
              value={`$${analytics.maxExpense.toFixed(2)}`}
              color="#FF6B6B"
            />
            <StatCard
              icon={<BarChart3 className="w-5 h-5" />}
              label="Total de Gastos"
              value={`${analytics.expenseCount}`}
              color="#7C5CFF"
            />
            <StatCard
              icon={<Award className="w-5 h-5" />}
              label="Top Categoría"
              value={analytics.topCategory}
              color="#FFB84D"
            />
          </motion.div>

          {/* Charts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <DashboardChart />
          </motion.div>

          {/* Top Category Details */}
          {analytics.topCategoryAmount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-text mb-4">Resumen por Categoría</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl bg-surface/50">
                  <div>
                    <p className="text-text font-semibold">{analytics.topCategory}</p>
                    <p className="text-sm text-text-secondary">Mayor gasto</p>
                  </div>
                  <p className="text-xl font-bold text-[#FFB84D]">
                    ${analytics.topCategoryAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
}
