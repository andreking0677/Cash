import { motion } from 'framer-motion';

interface NumericKeypadProps {
  value: string;
  onChange: (value: string) => void;
  onConfirm?: () => void;
  canConfirm?: boolean;
}

export default function NumericKeypad({ value, onChange, onConfirm, canConfirm = true }: NumericKeypadProps) {
  const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'DEL'];

  const handleClick = (btn: string) => {
    if (btn === 'DEL') {
      onChange(value.slice(0, -1));
    } else if (btn === '.') {
      if (!value.includes('.')) {
        onChange(value + btn);
      }
    } else {
      if (value === '0' && btn !== '.') {
        onChange(btn);
      } else {
        onChange(value + btn);
      }
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
      {buttons.map((btn) => (
        <motion.button
          key={btn}
          type="button"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => handleClick(btn)}
          className={`py-4 rounded-2xl font-bold text-lg transition-colors ${
            btn === 'DEL'
              ? 'glass hover:bg-red-500/20 text-[#FF6B6B]'
              : 'glass hover:bg-green-500/20 text-text'
          }`}
          style={
            btn !== 'DEL'
              ? {
                  background: 'linear-gradient(135deg, rgba(0, 212, 170, 0.1), rgba(124, 92, 255, 0.1))',
                }
              : {}
          }
        >
          {btn === 'DEL' ? '⌫' : btn}
        </motion.button>
      ))}
      </div>

      {onConfirm && (
        <motion.button
          type="button"
          onClick={onConfirm}
          disabled={!canConfirm}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-2xl font-bold text-background text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: canConfirm
              ? 'linear-gradient(90deg, #00D4AA, #00B894)'
              : 'linear-gradient(90deg, #4A4A5A, #3A3A4A)',
            boxShadow: canConfirm ? '0 0 30px rgba(0, 212, 170, 0.35)' : 'none',
          }}
        >
          Confirmar cantidad
        </motion.button>
      )}
    </div>
  );
}
