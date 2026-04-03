import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          {/* Logo */}
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00D4AA] to-[#00B894] rounded-xl flex items-center justify-center glow-primary">
              <span className="text-xl font-black text-background">C</span>
            </div>
          </div>
          <h1 className="text-2xl font-black tracking-tight">
            <span className="text-gradient">CASH</span>
          </h1>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/ajustes')}
          className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center"
        >
          <Settings className="w-5 h-5 text-text-secondary" />
        </motion.button>
      </div>
    </header>
  );
}
