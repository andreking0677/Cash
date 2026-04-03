import { motion } from 'framer-motion';

interface NumericKeypadProps {
  value: string;
  onChange: (value: string) => void;
}

export default function NumericKeypad({ value, onChange }: NumericKeypadProps) {
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
    <div className="grid grid-cols-3 gap-3">
      {buttons.map((btn) => (
        <motion.button
          key={btn}
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
  );
}
