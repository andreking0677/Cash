import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
  className?: string;
  prefix?: string;
}

export default function AnimatedNumber({ value, className = '', prefix = '$' }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const springValue = useSpring(0, { stiffness: 100, damping: 30 });
  const rounded = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [rounded]);

  const formatted = displayValue.toLocaleString('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <motion.span className={className} layout>
      {prefix}{formatted}
    </motion.span>
  );
}
