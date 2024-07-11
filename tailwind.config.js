/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      primary: '#0f172a',
      secondary: '#64748b',
      tertiary: '#f1f5f9',
      surface: '#f8fafc',
      onSurface: '#000000',
    },
    fontSize: {
      'body-medium': ['16px', {
        lineHeight: '100%',
        fontWeight: '500',
        letterSpacing: '1',
      }],
      'label-medium': ['16px', {
        lineHeight: '100%',
        fontWeight: '500',
        letterSpacing: '1',
      }],
      'headline-small': ['24px', {
        lineHeight: '100%',
        fontWeight: '500',
        letterSpacing: '1',
      }],
      'headline-medium': ['32px', {
        lineHeight: '100%',
        fontWeight: '500',
        letterSpacing: '1',
      }],
      'headline-large': ['40px', {
        lineHeight: '100%',
        fontWeight: '500',
        letterSpacing: '1',
      }],
    },
    screens: {
      'xs': '0px',
      's': '600px',
      'desktop': '800px',
      'm': '905px',
      'l': '1240px',
      'xl': '1440px',
    },
    extend: {},
  },
  plugins: [],
}

