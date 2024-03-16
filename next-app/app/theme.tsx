import { extendTheme } from '@chakra-ui/react'
import '@fontsource-variable/fira-code'

const theme = extendTheme({
  fonts: {
    // heading: `'Open Sans', sans-serif`,
    body: `'Fira Code Variable', monospace`,
  },
  styles: {
    global: {
      body: {
      },
    },
  },
})

export default theme
