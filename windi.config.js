import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['**/*.{jsx,tsx,css}'],
    exclude: ['node_modules', '.git', '.next'],
  },
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#6D4BEA',
          grey: '#A6A6A6',
          dark: '#E5E6EB',
          light: '#FAFAFE',
          secondary: '#F0EDFD',
        }
      },
      fontFamily: {
        body: ['Work Sans', 'sans-serif']
      }
    }
  }
})