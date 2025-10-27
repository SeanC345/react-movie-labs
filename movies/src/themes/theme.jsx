// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#2563eb",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#1e293b", 
      contrastText: "#ffffff",
    },
    background: {
      default: "#0f172a",
      paper: "#1e1e2f", 
    },
    text: {
      primary: "#ffffff",
      secondary: "#9ca3af", 
    },
  },

  shape: {
    borderRadius: 12, 
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e2f",
          borderRadius: "12px",
          boxShadow: "0 12px 24px rgba(0,0,0,0.6)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e2f",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e293b",
          color: "#fff",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
