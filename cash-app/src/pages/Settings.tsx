import { motion } from 'framer-motion';
import { Sun, Moon, Monitor, Database, Cloud, Info } from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');

  const themeOptions = [
    { value: 'light', icon: Sun, label: 'Claro' },
    { value: 'dark', icon: Moon, label: 'Oscuro' },
    { value: 'system', icon: Monitor, label: 'Sistema' },
  ] as const;

  return (
    <div className="space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-black text-text"
      >
        Ajustes
      </motion.h2>

      {/* Theme Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-5"
      >
        <h3 className="font-semibold text-text mb-4">Tema</h3>
        <div className="flex gap-3">
          {themeOptions.map(({ value, icon: Icon, label }) => (
            <motion.button
              key={value}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(value)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-medium transition-all ${
                theme === value
                  ? 'bg-gradient-to-r from-[#00D4AA] to-[#00B894] text-background'
                  : 'bg-surface text-text-secondary'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Sync Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-5 space-y-4"
      >
        <h3 className="font-semibold text-text">Sincronización</h3>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Database className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="font-medium text-text">Datos Locales</p>
              <p className="text-sm text-text-secondary">Guardados en este dispositivo</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-[#00D4AA]/20 text-[#00D4AA] text-xs font-semibold rounded-full">
            Activo
          </span>
        </div>

        <div className="h-px bg-border" />

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#7C5CFF]/20 rounded-xl flex items-center justify-center">
              <Cloud className="w-6 h-6 text-[#7C5CFF]" />
            </div>
            <div>
              <p className="font-medium text-text">Firebase Cloud</p>
              <p className="text-sm text-text-secondary">Sincronización en la nube</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-text-muted/30 text-text-muted text-xs font-semibold rounded-full">
            Pronto
          </span>
        </div>
      </motion.div>

      {/* App Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-5"
      >
        <h3 className="font-semibold text-text mb-3 flex items-center gap-2">
          <Info className="w-5 h-5 text-[#7C5CFF]" />
          Acerca de
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-text-secondary">Versión</span>
            <span className="text-text font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Hecho con</span>
            <span className="text-text font-medium">React + Framer Motion</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-text-muted text-sm text-center">
            CASH — Tu gestor de gastos diario
          </p>
        </div>
      </motion.div>
    </div>
  );
}
