module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './public/**/*.html',
      './src/**/*.vue'
    ]
  },
  theme: {
    extend: {
      colors: {
        'eggshell': '#FFFAFA',
      },
      backgroundColor: {
        // 'progress-gradient': 'linear-gradient(90deg, #E9E016 0%, #B1DC1C 92.97%, #40D428 124.83%);'
        'njoy-bg-gray': '#DFDFDF',
      },
      fontFamily: {
        'quicksand': ['Quicksand', 'serif', 'system-ui'],
      },
      boxShadow: {
        'top': '0 -2px 4px 0 rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'xl': '25px',
        't-xl': '25px 25px 0 0',
      },
    }, 
  },
  variants: {},
  plugins: [],
}
