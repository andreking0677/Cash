import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  color: string;
  trend?: 'up' | 'down' | 'neutral';
  trendPercent?: number;
}

export default function StatCard({ icon, label, value, color, trend, trendPercent }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass rounded-2xl p-6 relative overflow-hidden group"
    >
      {/* Background accent */}
      <div
        className="absolute -right-12 -top-12 w-24 h-24 rounded-full opacity-20 group-hover:opacity-30 transition-opacity"
        style={{ backgroundColor: color }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
          style={{ backgroundColor: `${color}20` }}
        >
          <div style={{ color }}>{icon}</div>
        </motion.div>

        {/* Label */}
        <p className="text-sm text-text-secondary uppercase tracking-wider mb-2">{label}</p>

        {/* Value */}
        <motion.p
          className="text-2xl font-bold text-text mb-2"
          key={value}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {value}
        </motion.p>

        {/* Trend */}
        {trend && trendPercent !== undefined && (
          <motion.div
            className="text-xs font-semibold"
            style={{
              color: trend === 'down' ? '#00D4AA' : trend === 'up' ? '#FF6B6B' : '#8A8A9A',
            }}
          >
            {trend === 'down' ? '↓' : '↑'} {Math.abs(trendPercent).toFixed(1)}%{' '}
            {trend === 'down' ? 'menos' : 'más'} que el período anterior
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
