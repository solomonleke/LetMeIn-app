import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: "'Roboto', sans-serif",
    body: "'Roboto', sans-serif",
  },
  colors: {
    blue: {
      blue500: '#211f5c',
      blue400: '#2C346D',
      blue300: '#3A4A7E',
      blue200: '#6689BB',
      blue100: '#78AADB',
    },
    red: {
      red500: '#EE4223',
      red400: '#F05C36',
      red300: '#F06944',
      red200: '#F3937A',
      red100: '#F5BDB7',
    },
    orange: {
      orange500: '#F5862E',
      orange400: '#F79749',
      orange300: '#FBBA7F',
      orange200: '#FCC38D',
      orange100: '#FEE8C9',
    },
    gray: {
      gray500: '#524F4E',
      gray400: '#606060',
      gray300: '#858383',
      gray200: '#C0C0C1',
      gray100: '#E7E8E9',
    },
    background: '#EEF3FF',
    green: '#38890B',
    white: '#FFFFFF',
    black: '#292F33',
  },
  initialColorMode: 'light',
  useSystemColorMode: false,
  components: {
    Modal: {
      baseStyle: (props) => ({
        dialog: {
         
          bg: "rgba(255,255,255,.95)",
          boxShadow: "1px 2px 7px 5px #6D6D6D",
          rounded: "5px",
          margin: "13px"
        }
      })
    }
  }
});

export default theme;