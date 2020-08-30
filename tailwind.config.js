module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './public/**/*.html',
      './src/**/*.vue'
    ]
  },
  theme: {
    borderRadius: {
      'lg': '15px',
    },
    extend: {
      colors: {
        'eggshell': '#FFFAFA',
        'dark': '#3D3D3D',
        'accent': '#27E19E',
        'cta-green': '#40D428',
        'cta-yellow': '#D4C328',
        'cta-red': '#D64C21',
      },
      backgroundColor: {
        // 'progress-gradient': 'linear-gradient(90deg, #E9E016 0%, #B1DC1C 92.97%, #40D428 124.83%);'
        'njoy-bg-gray': '#DFDFDF',
        // 'cta-green': 'linear-gradient(156.44deg, #40D428 0%, #5CE346 100%)',
        // 'cta-yellow': 'linear-gradient(168.12deg, #D4C328 0%, #E3DD46 100%)',
        // 'cta-red': 'linear-gradient(118.83deg, #D64C21 0%, rgba(214, 76, 33, 0.76) 197.3%)',
      },
      fontFamily: {
        'quicksand': ['Quicksand', 'serif', 'system-ui'],
        'quicksand-bold': ['QuicksandBold', 'serif', 'system-ui'],
      },
      boxShadow: {
        'top': '0 -2px 4px 0 rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'xl': '25px',
        't-xl': '25px 25px 0 0',
      },
      spacing: {
        'xs': '.125rem',
      },
      width: {
        '1/10': '10%',
        '9/10': '90%',
        '1/8': '12.5%',
        '7/8': '87.5%',
      },
      height: {
        'navbar': '3.5rem',
      },
    }, 
  },
  variants: {},
  plugins: [],
}
