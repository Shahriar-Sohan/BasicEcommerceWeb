import { createTheme } from "@mui/material/styles";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          background: {
            default: "#fafafa",
            paper: "#ffffff",
          },
          text: {
            primary: "#000000",
            secondary: "#555555",
          },
        }
      : {
          background: {
            default: "#121212",
            paper: "#1e1e1e",
          },
          text: {
            primary: "#ffffff",
            secondary: "#bdbdbd",
          },
        }),
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    button: {
      textTransform: "none", // make buttons not uppercase
      fontWeight: "600",
    },
  },
  shape: {
    borderRadius: 8, // smoother rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: "bold",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none", // remove weird shadow backgrounds
        },
      },
    },
  },
});