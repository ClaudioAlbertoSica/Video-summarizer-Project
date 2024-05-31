import { PaletteMode, hexToRgb } from "@mui/material";
import {  blue, deepOrange, grey } from "@mui/material/colors";
//Imports for context
import { Dispatch, SetStateAction, createContext } from "react";

//Theme Object declaration, whith types it will contain
declare module "@mui/material/styles" {
    interface Theme {
      palette: {
        image: {
          home: string,
          formText: string,
          formVideo: string,
          faq: string,
          logo: string,
          myAccount: string,
          loading: string,
          report: string,
          me: string
        },
        my: {
          colorRightContent: string,
          greyModalBg: string,
          sidePanelBg: string,
          header: string;
          list: string;
          listHeader: string,
          listItem: string,
          listColor: string,
          listBackground: string,
        };
      };
    }
    interface ThemeOptions {
      paletteOptions?: {
        image: {
          home?: string,
          formText?: string,
          formVideo?: string,
          faq?: string,
          config?: string,
          myAccount?: string,
          loading?: string,
          report?: string,
          me?: string
        }
        my?: {
          colorRightContent?: string,
          greyModalBg?: string,
          sidePanelBg?: string,
          header?: string;
          list?: string;
          listHeader?: string;
          listItems?: string;
          listColor?: string,
          listBackground?: string,
        };
      };
    }
  }


  //Implementation of two Theme Objects (one for "dark"and one for "light") with personalized colors 
 export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: blue,
            divider: grey[500],
            background: {
              default: blue[500],
              paper: grey[200],
            },
            text: {
              primary: grey[900],
              secondary: grey[800],
            },
            image: {
              home: "/src/assets/home.gif",
              formText: "/src/assets/formText.gif",
              formVideo: "/src/assets/formVideo.gif",
              faq: "/src/assets/FAQS.gif",
              logo: "/src/assets/Logo.gif",
              myAccount: "/src/assets/accountScreen.gif",
              loading: "/src/assets/isLoading.gif",
              report: "/src/assets/Reports.gif",
              me: "/src/assets/me.gif",
            },
            my: {
              colorRightContent: hexToRgb('#96C0B7'),
              greyModalBg: hexToRgb('#d3d3d3'),
              sidePanelBg: hexToRgb('#85cba7'),
              header: hexToRgb("#E5F9E0"),
              list: hexToRgb("#448DA3"),
              listHeader: hexToRgb("#65CAD2"),
              listItem: hexToRgb("#9BE8EA"),
              listColor: hexToRgb("#fff8e4"),
              listBackground: hexToRgb("#f53754"),
            },
          }
        : {
            // palette values for dark mode
            primary: grey,
            divider: deepOrange[700],
            background: {
              default: deepOrange[900],
              paper: hexToRgb('#25232a'),
            },
            text: {
              primary: "#fff",
              secondary: grey[300],
            },
            image: {
              home: "/src/assets/dome.gif",
              formText: "/src/assets/formTextD.gif",
              formVideo: "/src/assets/formVideoD.gif",
              faq: "/src/assets/FAQD.gif",
              logo: "/src/assets/Logo.png",
              myAccount: "/src/assets/accountScreenD.gif",
              loading: "/src/assets/isLoadingD.gif",
              report: "/src/assets/Comments.gif",
              me: "/src/assets/meD.gif",
            },
            my: {
              colorRightContent: hexToRgb('#1e1e1e'),
              greyModalBg: hexToRgb('#3b3940'),
              sidePanelBg: hexToRgb('#1e1e1e'),
              header: hexToRgb("#121212"),
              list: hexToRgb("#E56C26"),
              listHeader: hexToRgb("#883C10"),
              listItem: hexToRgb("#F3A06E"),
              listColor: hexToRgb("#e56c26"),
              listBackground: hexToRgb("#1d1d1d"),
            },
          }),
    },
  });



  //Context para poder cambiar el Theme
  export const ColorContext = createContext<Dispatch<SetStateAction<PaletteMode>>>(() => {});

/*   background-color: #1e1e1e;
    color: #25232a; */
