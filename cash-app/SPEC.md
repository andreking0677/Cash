# CASH - Spec de Diseño Premium

## Visión
Una app de gastos que se siente como una tarjeta negra Amex: sofisticada,。黑 (dark) por defecto, con acentos vibrantes que brillan como neón. No es una app de finanzas, es un **statement**.

## Filosofía de Diseño

### No es solo "bonita" - es **SENSORY**
- Cada interacción tiene feedback visual
- Los números son HEROES - gigantes, bold, que ocupan pantalla
- Los gastos se muestran como "escape de dinero" - animations que se van volando
- El tiempo se representa visualmente - línea de tiempo horizontal en vez de lista

## Paleta de Colores

### Dark Mode (DEFAULT) - El protagonista
```
Background:     #0A0A0F (negro profundo con toque azul)
Surface:        #12121A (tarjetas, elevated surfaces)
Surface Glass:   rgba(255,255,255,0.05) con blur
Border:         rgba(255,255,255,0.08)

Primary:         #00D4AA (verde neón / menta)
Secondary:       #FF6B6B (coral rojo / alerta)
Accent:          #7C5CFF (púrpura eléctrico)
Warning:         #FFB84D (ámbar)

Text Primary:    #FFFFFF
Text Secondary:   #8A8A9A
Text Muted:      #4A4A5A
```

### Light Mode - Alternativa elegante
```
Background:     #F8F9FC (blanco cálido)
Surface:        #FFFFFF
Surface Glass:  rgba(0,0,0,0.02) con blur
Border:         rgba(0,0,0,0.06)

Primary:         #00B894 (verde esmeralda profundo)
Secondary:       #E74C3C (rojo elegante)
Text Primary:   #1A1A2E
Text Secondary: #6B6B80
```

## Tipografía

### Headlines
- **Font:** Inter (já lo tenemos)
- **Peso:** 700-800 (Black/Heavy)
- **Size:** Números grandes - 64px-80px para totales
- **Letter-spacing:** -2px a -3px (tight, impactful)

### Body
- **Peso:** 400-500
- **Size:** 14px-16px
- Letter-spacing normal

## Efectos Visuales

### Glassmorphism (Glass瑜)
```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 24px;
```

### Sombras Glow
```css
box-shadow: 0 0 40px rgba(0, 212, 170, 0.3); /* para elementos primary */
box-shadow: 0 0 60px rgba(124, 92, 255, 0.2); /* para elementos accent */
```

### Gradientes
```css
/* Gradiente para cards principales */
background: linear-gradient(135deg, #00D4AA 0%, #00B894 100%);

/* Gradiente para texto highlight */
background: linear-gradient(90deg, #00D4AA, #7C5CFF);
-webkit-background-clip: text;
```

## Animaciones (使用 Framer Motion)

### Page Transitions
- Slide + fade, 300ms, ease-out
- Elementos entran en staggered (100ms delay entre items)

### Números
- Count-up animation cuando cambia el total
- Odometer style para los grande números

### Cards
- Scale up ligeramente (1.02) on hover
- Glow aumenta on focus

### Agregar Gasto
- Modal se desliza desde abajo (bottom sheet style)
- Overlay se blur

## Layout - Mobile First Premium

### Dashboard
```
┌─────────────────────────┐
│  CASH              [⚙️]  │  ← Header minimalista
├─────────────────────────┤
│                         │
│   ┌─────────────────┐   │
│   │  TOTAL GASTADO  │   │  ← Label pequeño
│   │                 │   │
│   │    $2,450.00    │   │  ← NÚMERO GIGANTE
│   │                 │   │
│   │  esta semana ▲  │   │  ← Indicador con animación
│   └─────────────────┘   │  ← Card con glass + glow
│                         │
│   [ Hoy  ] [Semana] [Mes]│  ← Selector pill
│                         │
│   ── Últimos gastos ──  │
│                         │
│   🟢 Café Latte         │  ← Cards con icon color
│      8:30 AM    -$45    │     y detalles pequeños
│                         │
│   🔵 Uber               │
│      2:15 PM     -$120  │
│                         │
└─────────────────────────┘
│ 🏠  │  ➕  │  📋  │  ⚙️ │  ← Nav minimalista
└─────────────────────────┘
```

### Agregar Gasto (Bottom Sheet)
```
┌─────────────────────────┐
│         ─────           │  ← Drag handle
│                         │
│   ¿Cuánto gastaste?     │
│   $ [___450.00___]      │  ← Input gigante
│                         │
│   Categoría             │
│   ┌───┐ ┌───┐ ┌───┐    │
│   │ 🍔│ │ 🚗│ │ 🎬│ ... │  ← Grid de categorías
│   └───┘ └───┘ └───┘    │     con icons coloridos
│                         │
│   Descripción           │
│   [________________]     │
│                         │
│   [  Guardar  ]         │  ← Button con glow
└─────────────────────────┘
```

## Componentes Premium

### 1. TotalCard (Dashboard)
- Glass card con blur
- Glow verde sutil
- Número enorme con count-up
- Flechita animada (↑ o ↓) según tendencia

### 2. ExpenseItem
- Icon circular con color de categoría
- Descripción + hora
- Monto alineado a derecha
- Hover: slide suave + glow

### 3. CategoryPill
- Pill selector con gradiente cuando activo
- Icon + texto
- Active: filled con primary color

### 4. BottomSheet (Agregar)
- Se desliza desde abajo
- Drag handle visual
- Auto-close on save
- Teclado no tapa el input ( KeyboardAvoidingView)

### 5. AnimatedNumber
- Componente que animuje el número cuando cambia
- Odometer-style
- Currency format con separadores

## Micro-interacciones

1. **Tab switch**: línea inferior se desliza
2. **Add expense**: haptic feedback + confetti mini
3. **Delete**: swipe left + fade out
4. **Pull to refresh**: loader con gradiente girando
5. **Number change**: el dígito hace "flip"

## Tech Adicional
- **Framer Motion**: Animaciones premium
- **Motion**: Más animaciones
- **react-native-reanimated**: Si fuéramos RN (pero es web, así que framer-motion)

## Scope Implementación
1. Nuevo sistema de diseño (CSS variables + Tailwind)
2. Actualizar componentes existentes
3. Animaciones con Framer Motion
4. TotalCard con números animados
5. Bottom sheet para agregar
6. Dark/Light toggle con transición suave

## No Scope (futuro)
- OCR de receipts
- Voice input
- Gráficos avanzados
- Esto es para después del redesign
