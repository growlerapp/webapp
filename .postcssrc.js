module.exports = {
  plugins: {
    'postcss-cssnext': {
      features: {
        autoprefixer: false,
        customProperties: {
          variables: {
            'color-black': '#30322f',
            'color-white': '#ffffff',
            'color-blue': '#67bcf2',
            'color-yellow': '#eaa74c',
            'font-family-primary': "'Amatic SC', Helvetica, Arial, sans-serif",
            'font-family-normal': "'Open Sans', sans-serif",
          },
        },
        customMedia: {
          extensions: {
            '--sm-viewport': '(min-width: 24em)',
            '--sm-2-viewport': '(min-width: 29.75em)',
            '--sm-3-viewport': '(min-width: 39.8em)',
            '--md-viewport': '(min-width: 46.8em)',
            '--md-2-viewport': '(min-width: 48em)',
            '--lg-viewport': '(min-width: 50em)',
            '--lg-2-viewport': '(min-width: 54.5em)',
            '--xl-viewport': '(min-width: 60em)',
            '--xl-2-viewport': '(min-width: 67em)',
          },
        },
      },
    },
  },
}
