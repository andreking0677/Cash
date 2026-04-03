import { motion } from 'framer-motion';
import { useExpenseStore } from '../store/expenseStore';
import { MoreHorizontal, Utensils, Car, Film, Heart, ShoppingBag, FileText } from 'lucide-react';

interface CategorySelectorProps {
  selectedId: string;
  onSelect: (categoryId: string) => void;
}

const iconMap: Record<string, any> = {
  utensils: Utensils,
  car: Car,
  film: Film,
  heart: Heart,
  'shopping-bag': ShoppingBag,
  'file-text': FileText,
  'more-horizontal': MoreHorizontal,
};

export default function CategorySelector({ selectedId, onSelect }: CategorySelectorProps) {
  const { categories } = useExpenseStore();

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Categoría</p>
      <div className="grid grid-cols-4 gap-3">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] || MoreHorizontal;
          const isSelected = cat.id === selectedId;

          return (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => onSelect(cat.id)}
              className="relative group"
            >
              {/* Background glow when selected */}
              {isSelected && (
                <motion.div
                  layoutId="categoryGlow"
                  className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none"
                  style={{ backgroundColor: cat.color }}
                />
              )}

              {/* Icon Container */}
              <motion.div
                className="w-full aspect-square rounded-2xl flex items-center justify-center glass relative"
                style={{
                  backgroundColor: isSelected ? `${cat.color}30` : `${cat.color}15`,
                  border: isSelected ? `2px solid ${cat.color}` : '2px solid transparent',
                }}
                transition={{ duration: 0.2 }}
              >
                <Icon
                  className="w-8 h-8"
                  style={{
                    color: cat.color,
                    filter: isSelected ? 'brightness(1.2)' : 'brightness(1)',
                  }}
                />
              </motion.div>

              {/* Label */}
              <p className="text-xs font-medium text-text-secondary mt-2 text-center truncate">
                {cat.name}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
