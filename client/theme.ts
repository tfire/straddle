import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

export const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        padding: 0,
        margin: 0,
        backgroundColor: 'black',
      },
      fonts: {
        body:
          "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
      },
    },
  },
});
