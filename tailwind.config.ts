import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          DEFAULT: '#C8526A',
          light: '#e87a92',
          pale: '#f5d0d8',
          dark: '#9e3a50',
        },
        creme: '#FDF8F5',
        encre: '#2A1A1E',
        or: {
          DEFAULT: '#C4963A',
          light: '#e8b85a',
        },
        gris: '#8a7a7e',
      },
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
