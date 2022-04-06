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
        backgroundColor: "black",
        fontFamily: "Source Code Pro",
      },
      fonts: {
        body: "Source Code Pro, monospace",
      },
    },
  },
  components: {
    Text: {
      variants: {
        medium: {
          fontFamily: "Source Code Pro, monospace",
          fontSize: "12.5px",
          lineHeight: "1.5",
        },
      },
    },
    Button: {
      variants: {
        primary: {
          backgroundColor: "black",
          color: "white",
          fontSize: "12.5px",
          fontFamily: "Source Code Pro, monospace",
          borderRadius: "0px",
          padding: "1px 6px"
        },
        secondary: {
          borderRadius: "0px",
          fontFamily: "Source Code Pro, monospace",
          fontSize: '12.5px',
          height: '30px',
          padding: "1px 6px"
        }
      }
    },
  },
});
