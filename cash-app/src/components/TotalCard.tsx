import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Zap } from 'lucide-react';
import AnimatedNumber from './AnimatedNumber';
import type { Period } from '../types';

interface TotalCardProps {
  total: number;
  period: Period;
  count: number;
  previousTotal?: number;
}

export default function TotalCard({ total, period, count, previousTotal }: TotalCardProps) {
  const trend = previousTotal !== undefined ? total - previousTotal : 0;
  const trendPercent = previousTotal ? ((trend / previousTotal) * 100).toFixed(1) : '0';

  const periodLabels = {
    day: 'Hoy',
    week: 'Esta semana',
    month: 'Este mes',
  };

  const isPositive = trend <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="glass rounded-3xl p-8 glow-primary relative overflow-hidden group"
    >
      {/* Animated Background Gradients */}
      <motion.div
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-20 -right-20 w-56 h-56 bg-gradient-to-br from-[#00D4AA]/10 via-[#7C5CFF]/10 to-transparent rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ rotate: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-tr from-[#00B894]/10 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header with Icon */}
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <p className="text-text-secondary text-xs uppercase tracking-widest font-semibold">
              Total Gastado
            </p>
            <p className="text-text-secondary text-xs">
              {periodLabels[period]} · {count} gasto{count !== 1 ? 's' : ''}
            </p>
          </div>
          
          {/* Period indicator badge */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 212, 170, 0.2), rgba(124, 92, 255, 0.2))',
              border: '1px solid rgba(0, 212, 170, 0.3)',
            }}
          >
            <Zap className="w-5 h-5 text-[#00D4AA]" />
          </motion.div>
        </div>

        {/* Total Amount - HERO */}
        <div className="mb-6">
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <AnimatedNumber
              value={total}
              className="number-hero text-text block text-5xl md:text-6xl font-black"
            />
          </motion.div>
        </div>

        {/* Trend Indicator */}
        {trend !== 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm ${
              isPositive
                ? 'bg-[#00D4AA]/15 text-[#00D4AA] border border-[#00D4AA]/30'
                : 'bg-[#FF6B6B]/15 text-[#FF6B6B] border border-[#FF6B6B]/30'
            }`}
          >
            {isPositive ? (
              <motion.div animate={{ rotate: [0, -20, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                <TrendingDown className="w-4 h-4" />
              </motion.div>
            ) : (
              <motion.div animate={{ rotate: [0, 20, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                <TrendingUp className="w-4 h-4" />
              </motion.div>
            )}
            <span>
              {isPositive ? '↓' : '↑'} {Math.abs(Number(trendPercent))}% vs período anterior
            </span>
          </motion.div>
        )}
      </div>

      {/* Shine Effect */}
      <motion.div
        animate={{ x: [-100, 300] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
        style={{ skewX: -20 }}
      />
    </motion.div>
  );
}
