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
        'body-light': '#0A0908',
        'accent': '#3066BE',
        'papaya': '#FFEECF',
        'body-dark': '#FFF8EBB3',
        'body-dark-emphasized': '#FFF8EB',
        'gray': '#1E293B',
        'borders': '#E5E7EB',
        'background': '#0B1121',
        'background-light': '#F5F5F7',
        "background-light-emphasized": "FFFFFF"
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
