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
        'bg-300': '#bfbfbf'
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
