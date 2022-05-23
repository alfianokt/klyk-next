import { defineConfig } from 'windicss/helpers'
import forms from 'windicss/plugin/forms'

export default defineConfig({
  extract: {
    include: ['**/*.{jsx,tsx,css}'],
    exclude: ['node_modules', '.git', '.next'],
  },
  plugins: [
    forms
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#6D4BEA',
          grey: '#A6A6A6',
          black: '#0A0A0A',
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