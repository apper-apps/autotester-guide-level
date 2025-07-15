/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF6B35",
          50: "#FFF4F1",
          100: "#FFE6DD",
          200: "#FFD1BB",
          300: "#FFB899",
          400: "#FF9F77",
          500: "#FF6B35",
          600: "#E55A2B",
          700: "#CC4921",
          800: "#B23817",
          900: "#99270D"
        },
        secondary: {
          DEFAULT: "#4A90E2",
          50: "#F0F7FF",
          100: "#E1EFFE",
          200: "#C3DFFD",
          300: "#A5CFFB",
          400: "#87BFF9",
          500: "#4A90E2",
          600: "#3B7CB8",
          700: "#2C688E",
          800: "#1D5464",
          900: "#0E403A"
        },
        accent: {
          DEFAULT: "#F7931E",
          50: "#FEF7EC",
          100: "#FDEFD9",
          200: "#FBE7B3",
          300: "#F9DF8D",
          400: "#F7D767",
          500: "#F7931E",
          600: "#E6850B",
          700: "#D57700",
          800: "#C46900",
          900: "#B35B00"
        },
        surface: {
          DEFAULT: "#FFFFFF",
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717"
        },
        background: {
          DEFAULT: "#F8FAFC",
          50: "#FAFBFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A"
},
        border: {
          DEFAULT: "#E2E8F0",
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A"
        },
        foreground: {
          DEFAULT: "#0F172A",
          50: "#64748B",
          100: "#475569",
          200: "#334155",
          300: "#1E293B",
          400: "#0F172A",
          500: "#020617",
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000"
        }
      },
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'sans-serif'],
        'body': ['Inter', 'sans-serif']
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }]
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'inner-light': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-soft': 'bounceSoft 0.6s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        bounceSoft: {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translateY(0)' },
          '40%, 43%': { transform: 'translateY(-3px)' },
          '70%': { transform: 'translateY(-1px)' }
        }
      }
    },
  },
  plugins: [],
}