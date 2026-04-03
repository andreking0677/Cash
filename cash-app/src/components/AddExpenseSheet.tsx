import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExpenseStore } from '../store/expenseStore';
import { useNavigate } from 'react-router-dom';
import {
  Utensils, Car, Film, Heart, ShoppingBag, FileText, MoreHorizontal,
  X
} from 'lucide-react';

const iconMap: Record<string, any> = {
  utensils: Utensils,
  car: Car,
  film: Film,
  heart: Heart,
  'shopping-bag': ShoppingBag,
  'file-text': FileText,
  'more-horizontal': MoreHorizontal,
};

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddExpenseSheet({ isOpen, onClose }: BottomSheetProps) {
  const navigate = useNavigate();
  const { categories, addExpense } = useExpenseStore();

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleClose = () => {
    setAmount('');
    setDescription('');
    onClose();
  };

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

    handleClose();
    navigate('/');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-surface rounded-t-[32px] pb-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-center pt-4 pb-2">
              <div className="w-12 h-1 bg-text-muted rounded-full" />
            </div>

            <div className="flex items-center justify-between px-6 mb-6">
              <h2 className="text-xl font-bold text-text">Nuevo Gasto</h2>
              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-full bg-surface-glass flex items-center justify-center"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 space-y-6">
              <div className="text-center py-4">
                <p className="text-text-secondary text-sm mb-2">¿Cuánto gastaste?</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-5xl font-black text-text-muted">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="text-6xl font-black text-text bg-transparent outline-none placeholder:text-text-muted w-full text-center"
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <p className="text-text-secondary text-sm mb-3">Categoría</p>
                <div className="grid grid-cols-4 gap-3">
                  {categories.map((cat) => {
                    const Icon = iconMap[cat.icon] || MoreHorizontal;
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <motion.button
                        key={cat.id}
                        type="button"
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all ${
                          isSelected ? 'bg-surface-glass border-2' : 'bg-background opacity-60 hover:opacity-100'
                        }`}
                        style={{
                          borderColor: isSelected ? cat.color : 'transparent',
                          boxShadow: isSelected ? `0 0 20px ${cat.color}40` : 'none',
                        }}
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${cat.color}25` }}
                        >
                          <Icon className="w-6 h-6" style={{ color: cat.color }} />
                        </div>
                        <span className="text-xs font-medium text-text">{cat.name}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-text-secondary text-sm mb-2">Descripción (opcional)</p>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="¿En qué gastaste?"
                  className="w-full bg-background rounded-xl px-4 py-4 text-text placeholder:text-text-muted"
                />
              </div>

              <div>
                <p className="text-text-secondary text-sm mb-2">Fecha</p>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-background rounded-xl px-4 py-4 text-text"
                />
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl font-bold text-background text-lg"
                style={{
                  background: 'linear-gradient(90deg, #00D4AA, #00B894)',
                  boxShadow: '0 0 30px rgba(0, 212, 170, 0.4)',
                }}
              >
                Guardar Gasto
              </motion.button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
