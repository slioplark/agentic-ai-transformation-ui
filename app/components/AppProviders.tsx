"use client";

import theme from "@app/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { ReactNode } from "react";
import { SWRConfig } from "swr";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SWRConfig value={{ revalidateOnFocus: true, shouldRetryOnError: false }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </SWRConfig>
  );
}
