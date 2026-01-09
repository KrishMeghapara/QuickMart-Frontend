export const colors = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#2563eb',
    600: '#1d4ed8',
    700: '#1e40af',
    800: '#1e3a8a',
    900: '#0c4a6e'
  },
  success: {
    500: '#10b981',
    600: '#059669',
    700: '#047857'
  },
  error: {
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c'
  },
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a'
  }
};

export const spacing = {
  1: '0.5rem',
  2: '1rem',
  3: '1.5rem',
  4: '2rem',
  5: '2.5rem',
  6: '3rem',
  8: '4rem',
  10: '5rem',
  12: '6rem',
  16: '8rem'
};

export const shadows = {
  small: '0 2px 8px rgba(0, 0, 0, 0.05)',
  medium: '0 4px 15px rgba(0, 0, 0, 0.08)',
  large: '0 12px 40px rgba(0, 0, 0, 0.15)',
  xl: '0 20px 50px rgba(0, 0, 0, 0.2)'
};

export const transitions = {
  standard: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  fast: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
  slow: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
};

export const hoverEffects = {
  cardLift: {
    transform: 'translateY(-8px)',
    boxShadow: shadows.large
  },
  buttonLift: {
    transform: 'translateY(-2px)',
    boxShadow: shadows.medium
  },
  imageZoom: {
    transform: 'scale(1.08)'
  },
  iconScale: {
    transform: 'scale(1.1)'
  }
};
