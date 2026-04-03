import { useState } from 'react';
import { motion } from 'framer-motion';
import { useExpenseStore } from '../store/expenseStore';
import { useNavigate } from 'react-router-dom';
import NumericKeypad from '../components/NumericKeypad';
import CategorySelector from '../components/CategorySelector';
import { ChevronDown } from 'lucide-react';

export default function AddExpense() {
  const navigate = useNavigate();
  const { categories, addExpense } = useExpenseStore();

  const [amount, setAmount] = useState('0');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      return;
    }

    addExpense({
      amount: parseFloat(amount),
      description: description.trim(),
      category: selectedCategory,
      date,
    });

    navigate('/');
  };

  const displayAmount = amount === '0' ? '0.00' : amount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 pb-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h2 className="text-3xl font-black text-text">Registrar Gasto</h2>
        <p className="text-text-secondary">Ingresa el monto y los detalles</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Amount Display - HERO SECTION */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass rounded-3xl p-8 text-center relative overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00D4AA]/10 via-transparent to-[#7C5CFF]/10 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10">
            <p className="text-text-secondary text-sm mb-6 uppercase tracking-widest font-semibold">
              Monto a gastar
            </p>

            <div className="flex items-baseline justify-center gap-3 mb-2">
              <motion.span
                className="text-6xl font-black text-text-muted"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                $
              </motion.span>
              <motion.span
                key={displayAmount}
                className="text-8xl font-black text-gradient"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                {displayAmount}
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* Numeric Keypad */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-3"
        >
          <p className="text-text-secondary text-sm uppercase tracking-wider font-semibold">
            Ingresa el monto
          </p>
          <NumericKeypad value={amount} onChange={setAmount} />
        </motion.div>

        {/* Category Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <CategorySelector selectedId={selectedCategory} onSelect={setSelectedCategory} />
        </motion.div>

        {/* Advanced Options Toggle */}
        <motion.button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between p-4 glass rounded-xl hover:bg-surface-glass transition-colors"
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-text-secondary font-semibold">Más opciones</span>
          <motion.div
            animate={{ rotate: showAdvanced ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 text-text-secondary" />
          </motion.div>
        </motion.button>

        {/* Advanced Options */}
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            {/* Description Input */}
            <div>
              <p className="text-text-secondary text-sm mb-3 uppercase tracking-wider font-semibold">
                Descripción (opcional)
              </p>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="¿En qué gastaste?"
                className="w-full glass rounded-2xl px-5 py-4 text-text placeholder:text-text-muted text-lg focus:outline-none focus:ring-2 focus:ring-[#00D4AA]/50"
              />
            </div>

            {/* Date Input */}
            <div>
              <p className="text-text-secondary text-sm mb-3 uppercase tracking-wider font-semibold">
                Fecha
              </p>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full glass rounded-2xl px-5 py-4 text-text text-lg focus:outline-none focus:ring-2 focus:ring-[#00D4AA]/50"
              />
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={parseFloat(amount) <= 0 || amount === '0'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-5 rounded-2xl font-bold text-background text-lg relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: parseFloat(amount) > 0 && amount !== '0'
              ? 'linear-gradient(90deg, #00D4AA, #00B894)'
              : 'linear-gradient(90deg, #4A4A5A, #3A3A4A)',
            boxShadow: parseFloat(amount) > 0 && amount !== '0'
              ? '0 0 40px rgba(0, 212, 170, 0.4)'
              : 'none',
          }}
        >
          {parseFloat(amount) > 0 && amount !== '0' ? 'Guardar Gasto' : 'Ingresa un monto'}
        </motion.button>
      </form>
    </motion.div>
  );
}
