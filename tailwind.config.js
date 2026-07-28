/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Orbitron', 'Rajdhani', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        // Dark cyber theme base
        cyber: {
          dark: '#0a0a0f',
          darker: '#050508',
          card: '#0d0d14',
          border: '#1a1a2e',
          surface: '#12121a',
        },
        // Neon accents
        neon: {
          green: '#00ff88',
          cyan: '#00fff2',
          blue: '#00b4d8',
          purple: '#b14eff',
          red: '#ff3366',
          yellow: '#ffd700',
        },
        // Matrix green spectrum
        matrix: {
          50: '#e8fff0',
          100: '#b3ffcc',
          200: '#80ffa3',
          300: '#4dff7a',
          400: '#26ff5c',
          500: '#00ff41',
          600: '#00cc34',
          700: '#009927',
          800: '#00661a',
          900: '#00330d',
        },
        // Terminal colors
        terminal: {
          bg: '#0c0c14',
          text: '#00ff88',
          dim: '#00cc6a',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-left': 'slideLeft 0.6s ease forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'border-glow': 'borderGlow 2s ease-in-out infinite alternate',
        'blink': 'blink 1s step-end infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'cyber-shimmer': 'cyberShimmer 3s ease-in-out infinite',
        'scan': 'scan 4s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 136, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 255, 136, 0.4)' },
        },
        borderGlow: {
          '0%': { borderColor: 'rgba(0, 255, 136, 0.2)' },
          '100%': { borderColor: 'rgba(0, 255, 136, 0.5)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        cyberShimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 255, 136, 0.3), 0 0 40px rgba(0, 255, 136, 0.1)',
        'neon-lg': '0 0 30px rgba(0, 255, 136, 0.4), 0 0 60px rgba(0, 255, 136, 0.2)',
        'neon-cyan': '0 0 20px rgba(0, 255, 242, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};
