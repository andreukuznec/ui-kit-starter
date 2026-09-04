import React from "react"
import ReactDOM from "react-dom/client"
import "@fontsource-variable/inter"

import { ThemeProvider } from "@/components/theme-provider"

import App from "./app"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
