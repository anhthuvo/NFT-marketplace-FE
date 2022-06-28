module.exports = {
  important: true,
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      tiny: '.9375rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '1xl': '1.375rem',
      '2xl': '1.5rem',
      '2.25xl': '1.625rem',
      '2.5xl': '1.75rem',
      '3xl': '1.875rem',
      '3.5xl': '2rem',
      '3.75xl': '2.125rem',
      '4xl': '2.25rem',
      '4.25xl': '2.125rem',
      '4.5xl': '2.5rem',
      '4.7xl': '2.8125rem',
      '4.75xl': '2.875rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem'
    },
    extend: {
      colors: {
        primary: '#03041a',
        'primary-50': "rgba(3, 4, 26, 0.5)",
        'gradient': 'linear-gradient(90deg, rgba(213,36,224,1) 0%, rgba(31,0,252,1) 100%)',
        secondary: '#d524e0',
        third: '#1f00fc',
        light: '#fcd8a4',
        white: '#ffffff'
      },
      spacing: {
        'full-180': '180%',
        'full-200': '200%'
      },
      minWidth: {
        0: '0',
        52: '13rem',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        full: '100%'
      }
    },
    fontFamily: {
      'open-sans': ['Open Sans', 'sans-serif']
    },
    minWidth: {
      '1/2': '50%'
    }
  },
  variants: {
    extend: {
      padding: ['last'],
      margin: ['last'],
      borderWidth: ['last'],
      borderColor: ['last']
    }
  },
  plugins: [
    ({ addComponents, theme }) => {
      addComponents({
        '.container': {
          '@apply mx-auto': {},
          '@apply px-4': {}
        }
      });
    }
  ]
};
