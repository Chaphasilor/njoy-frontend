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
      'full': '9999px',
    },
    extend: {
      colors: {
        'dark': '#3D3D3D',
        'accent': '#27E19E',
        'cta-green': '#40D428',
        'cta-green-stop': '#5CE346',
        'cta-yellow': '#D4C328',
        'cta-yellow-stop': '#E3DD46',
        'cta-red': '#D64C21',
        'cta-red-stop': '#D64CC2',
      },
      backgroundColor: {
        // 'progress-gradient': 'linear-gradient(90deg, #E9E016 0%, #B1DC1C 92.97%, #40D428 124.83%);'
        'njoy-bg-gray': '#DFDFDF',
      },
      fontFamily: {
        'quicksand': ['Quicksand', 'serif', 'system-ui'],
        'quicksand-bold': ['QuicksandBold', 'serif', 'system-ui'],
      },
      boxShadow: {
        'top': '0 -2px 4px 0 rgba(0, 0, 0, 0.15)',
        'top-bottom': ''
      },
      borderRadius: {
        'xl': '25px',
        't-xl': '25px 25px 0 0',
        'parent': 'inherit',
      },
      strokeWidth: {
        'inherit': 'inherit',
        '1.5': '1.5',
        '2.5': '2.5',
      },
      spacing: {
        'xs': '.125rem',
        '7': '1.75rem',
        'navbar': '3.5rem',
      },
      width: {
        '14': '3.5rem',
        '1/10': '10%',
        '9/10': '90%',
        '1/8': '12.5%',
        '7/8': '87.5%',
      },
      height: {
        '7': '1.75rem',
        'navbar': '5rem',
      },
    }, 
  },
  variants: {
    strokeWidth: ({ after }) => after(['active', 'focus']),
    backgroundColor: ({ after }) => after(['active', 'checked']),
    backgroundImage: ({ after }) => after(['checked']),
    gradientColorStops: ({ after }) => after(['checked']),
  },
  plugins: [],
}
