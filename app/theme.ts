"use client"

import { createTheme } from "@mui/material/styles"
import type {} from "@mui/x-tree-view/themeAugmentation"

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#132c47" },
    secondary: { main: "#087f80" },
    info: { main: "#2464a0" },
    text: { primary: "#183449", secondary: "#617485" },
    background: { default: "#f3f6f8", paper: "#ffffff" },
  },
  components: {
    MuiButton: {
      defaultProps: { color: "secondary" },
    },
    MuiChip: {
      styleOverrides: {
        label: ({ ownerState }) => ({
          ...(ownerState.size === "small" && { lineHeight: "24px" }),
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.palette.background.default,
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { verticalAlign: "middle" },
        head: {
          backgroundColor: "#eaf1f6",
          whiteSpace: "nowrap",
          fontWeight: 700,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        slotProps: { inputLabel: { shrink: true } },
      },
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiInputBase-root": {
            backgroundColor: theme.palette.background.paper,
          },
          "& .MuiInputBase-root.Mui-disabled .MuiInputBase-input": {
            WebkitTextFillColor: `${theme.palette.text.primary} !important`,
            cursor: "not-allowed",
          },
        }),
      },
    },
    MuiTreeItem: {
      styleOverrides: {
        content: {
          "&:hover, &[data-selected], &[data-selected]:hover, &[data-selected][data-focused]": {
            backgroundColor: "transparent",
          },
        },
        label: {
          fontSize: "14px",
        },
      },
    },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: "var(--app-font-sans)",
    h1: { fontSize: "2.25rem", fontWeight: 700 },
    h2: { fontSize: "1.875rem", fontWeight: 700 },
    h3: { fontSize: "1.5rem", fontWeight: 700 },
    h4: { fontSize: "1.25rem", fontWeight: 700 },
    h5: { fontSize: "1.125rem", fontWeight: 600 },
    h6: { fontSize: "1rem", fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
})

export default theme
