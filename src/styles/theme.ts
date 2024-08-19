import { extendTheme } from '@chakra-ui/react'

const customTheme = extendTheme({
  fonts: {
    heading: "'Lato', sans-serif",
    body: "'Lato', sans-serif"
  },
  styles: {
    global: {
      'html, body': {
        height: '100%',
        width: '100%',
        margin: 0,
        padding: 0,
        fontFamily: "'Lato', sans-serif",
        color: 'gray.800',
        lineHeight: 'tall'
      },
      '#root': {
        maxWidth: '100%',
        height: '100%',
        width: '100%'
      }
    }
  },
  colors: {
    primary: {
      50: '#adca08',
      100: '#c8eb07',
      200: '#e3f506',
      300: '#f1f72a'
    },
    secondary: {
      50: '#05344a',
      100: '#1f6f8b',
      200: '#3b9ac2',
      300: '#6fc7e2'
    }
  }
})

export default customTheme