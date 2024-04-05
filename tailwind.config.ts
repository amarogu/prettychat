import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary-100': '#808080',
        'primary-200': '#656565',
        'primary-300': '#2b2b2b',
        'accent-100': '#C0C0C0',
        'accent-200': '#626262',
        'text-100': '#333333',
        'text-200': '#5c5c5c',
        'bg-100': '#F2F2F2',
        'bg-200': '#e8e8e8',
        'bg-300': '#bfbfbf',
        'dark-primary-100': '#333333',
        'dark-primary-200': '#5c5c5c',
        'dark-primary-300': '#b9b9b9',
        'dark-accent-100': '#666666',
        'dark-accent-200': '#f7f7f7',
        'dark-text-100': '#FFFFFF',
        'dark-text-200': '#e0e0e0',
        'dark-bg-100': '#1A1A1A',
        'dark-bg-200': '#292929',
        'dark-bg-300': '#404040'
      },
      fontFamily: {
        einaReg: ['var(--font-eina-reg)'],
        einaSemi: ['var(--font-eina-semi)'],
        einaBold: ['var(--font-eina-bold)'],
      },
    },
  },
  plugins: [],
}
export default config
