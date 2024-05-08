import { PaletteMode, hexToRgb } from "@mui/material";
import { amber, blue, deepOrange, grey } from "@mui/material/colors";

declare module "@mui/material/styles" {
    interface Theme {
      palette: {
        my: {
          header: string;
          list: string;
          listHeader: string;
          listItem: string;
        };
      };
    }
    interface ThemeOptions {
      paletteOptions?: {
        my?: {
          header?: string;
          list?: string;
          listHeader?: string;
          listItems?: string;
        };
      };
    }
  }


 export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: blue,
            divider: amber[200],
            background: {
              default: blue[100],
              paper: deepOrange[900],
            },
            text: {
              primary: grey[900],
              secondary: grey[800],
            },
            my: {
              header: hexToRgb("#9BE8EA"),
              list: hexToRgb("#448DA3"),
              listHeader: hexToRgb("#65CAD2"),
              listItem: hexToRgb("#9BE8EA"),
            },
          }
        : {
            // palette values for dark mode
            primary: deepOrange,
            divider: deepOrange[700],
            background: {
              default: deepOrange[900],
              paper: deepOrange[900],
            },
            text: {
              primary: "#fff",
              secondary: grey[300],
            },
            my: {
              header: hexToRgb("#3C1C0C"),
              list: hexToRgb("#E56C26"),
              listHeader: hexToRgb("#883C10"),
              listItem: hexToRgb("#F3A06E"),
            },
          }),
    },
  });