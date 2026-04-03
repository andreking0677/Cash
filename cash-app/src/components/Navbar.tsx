import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, PlusCircle, History, Settings } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  
  const navItems = [
    { to: '/', icon: Home, label: 'Inicio' },
    { to: '/agregar', icon: PlusCircle, label: 'Agregar', isAction: true },
    { to: '/historial', icon: History, label: 'Historial' },
    { to: '/ajustes', icon: Settings, label: 'Ajustes' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-2xl border-t border-border">
      <div className="max-w-lg mx-auto flex justify-around py-3">
        {navItems.map(({ to, icon: Icon, label, isAction }) => {
          const isActive = location.pathname === to;
          
          return (
            <NavLink
              key={to}
              to={to}
              className="relative flex-1 flex justify-center"
            >
              <motion.div
                whileTap={{ scale: 0.85 }}
                whileHover={!isAction ? { y: -4 } : undefined}
                className="flex flex-col items-center gap-1 px-4 py-2 relative"
              >
                {isAction ? (
                  <>
                    {/* Background pulse for add button */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -inset-4 rounded-full opacity-0"
                      style={{
                        background: 'radial-gradient(circle, rgba(0, 212, 170, 0.4), transparent)',
                      }}
                    />
                    
                    {/* Main button */}
                    <motion.div
                      className="w-14 h-14 -mt-8 rounded-full flex items-center justify-center relative z-10"
                      style={{
                        background: 'linear-gradient(135deg, #00D4AA, #00B894)',
                        boxShadow: '0 0 40px rgba(0, 212, 170, 0.6)',
                      }}
                      whileHover={{ scale: 1.1, boxShadow: '0 0 60px rgba(0, 212, 170, 0.8)' }}
                    >
                      <Icon className="w-7 h-7 text-background" />
                    </motion.div>
                  </>
                ) : (
                  <>
                    {/* Icon */}
                    <div className="relative">
                      {isActive && (
                        <motion.div
                          layoutId="navGlow"
                          className="absolute inset-0 rounded-lg"
                          style={{
                            background: 'radial-gradient(circle, rgba(0, 212, 170, 0.3), transparent)',
                            filter: 'blur(8px)',
                          }}
                        />
                      )}
                      <Icon
                        className={`w-6 h-6 relative z-10 transition-all ${
                          isActive
                            ? 'text-[#00D4AA]'
                            : 'text-text-secondary hover:text-text'
                        }`}
                      />
                    </div>

                    {/* Label */}
                    <motion.span
                      className={`text-xs font-medium transition-colors ${
                        isActive ? 'text-[#00D4AA]' : 'text-text-secondary'
                      }`}
                      animate={{ scale: isActive ? 1.1 : 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {label}
                    </motion.span>

                    {/* Active indicator dot */}
                    {isActive && (
                      <motion.div
                        layoutId="navDot"
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: '#00D4AA' }}
                        transition={{ type: 'spring', bounce: 0.5 }}
                      />
                    )}
                  </>
                )}
              </motion.div>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
