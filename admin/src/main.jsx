import React, { useMemo, useState, useEffect } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import "./index.css"
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from "@mui/material"
import { getDesignTokens } from "../src/components/theme.js"

function Main() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem("theme")
    if (stored) return stored === "dark"
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light")
  }, [isDarkMode])

  const theme = useMemo(() => createTheme(getDesignTokens(isDarkMode ? "dark" : "light")), [isDarkMode])

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App toggleTheme={() => setIsDarkMode(!isDarkMode)} isDarkMode={isDarkMode} />
    </MuiThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </React.StrictMode>,
)
