import React from "react"
import ReactDOM from "react-dom/client"
import { ThemeProvider } from "next-themes"

import App from "./app"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
