import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': {
          500: '#006FEE'
        },
        'custom-gray': {
          500: '#D4D4D8'
        },
        'custom-green': {
          500: '#269630'
        }
      },
      borderRadius: {
        'custom-br-sm': '0.4375rem'
      }
    }
  },
  darkMode: 'class',
  plugins: [nextui()]
}

export default config
