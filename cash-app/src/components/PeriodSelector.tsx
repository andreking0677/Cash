import { motion } from 'framer-motion';
import { Calendar, Clock, CalendarDays } from 'lucide-react';
import type { Period } from '../types';

interface PeriodSelectorProps {
  selected: Period;
  onChange: (period: Period) => void;
}

export default function PeriodSelector({ selected, onChange }: PeriodSelectorProps) {
  const periods: { key: Period; label: string; icon: typeof Calendar }[] = [
    { key: 'day', label: 'Hoy', icon: Calendar },
    { key: 'week', label: 'Semana', icon: Clock },
    { key: 'month', label: 'Mes', icon: CalendarDays },
  ];

  return (
    <div className="flex gap-2 p-1 bg-surface rounded-2xl">
      {periods.map(({ key, label, icon: Icon }) => (
        <motion.button
          key={key}
          onClick={() => onChange(key)}
          whileTap={{ scale: 0.95 }}
          className={`relative flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-colors ${
            selected === key ? 'text-background' : 'text-text-secondary hover:text-text'
          }`}
        >
          {selected === key && (
            <motion.div
              layoutId="period-bg"
              className="absolute inset-0 bg-gradient-to-r from-[#00D4AA] to-[#00B894] rounded-xl"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            <Icon className="w-4 h-4" />
            {label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
