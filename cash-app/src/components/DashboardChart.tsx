import { useMemo } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useExpenseStore } from '../store/expenseStore';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function DashboardChart() {
  const { getExpensesByPeriod, categories } = useExpenseStore();
  const expenses = getExpensesByPeriod();

  // Datos por categoría
  const categoryData = useMemo(() => {
    const grouped: Record<string, number> = {};
    expenses.forEach((exp) => {
      const cat = categories.find((c) => c.id === exp.category);
      const name = cat?.name || 'Otros';
      grouped[name] = (grouped[name] || 0) + exp.amount;
    });
    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2)),
      fill: categories.find((c) => c.name === name)?.color || '#6B7280',
    }));
  }, [expenses, categories]);

  // Datos por día (últimos 7 días)
  const dailyData = useMemo(() => {
    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    const dailyMap: Record<string, number> = {};
    last7Days.forEach((day) => (dailyMap[day] = 0));

    expenses.forEach((exp) => {
      const expDate = new Date(exp.date).toISOString().split('T')[0];
      if (dailyMap[expDate] !== undefined) {
        dailyMap[expDate] += exp.amount;
      }
    });

    return last7Days.map((date) => ({
      date: format(new Date(date), 'EEE', { locale: es }),
      amount: parseFloat(dailyMap[date].toFixed(2)),
    }));
  }, [expenses]);

  const COLORS = {
    primary: '#00D4AA',
    secondary: '#FF6B6B',
    accent: '#7C5CFF',
    warning: '#FFB84D',
  };

  return (
    <div className="space-y-6">
      {/* Distribución por categoría */}
      {categoryData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-text mb-4">Gastos por Categoría</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: $${value}`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      {/* Gastos últimos 7 días */}
      {dailyData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-text mb-4">Últimos 7 Días</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(10, 10, 15, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                  }}
                />
                <Bar dataKey="amount" fill={COLORS.primary} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      {/* Gastos sin datos */}
      {categoryData.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-8 text-center text-text-secondary"
        >
          <p>Sin datos para mostrar gráficos</p>
        </motion.div>
      )}
    </div>
  );
}
