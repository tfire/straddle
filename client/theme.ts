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
        fontFamily: "Source Code Pro",
      },
      fonts: {
        body:
          "Source Code Pro, monospace",
      },
    },
  },
});
