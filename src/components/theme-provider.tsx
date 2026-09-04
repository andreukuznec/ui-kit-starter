import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react"

export type Theme = "dark" | "light" | "system"

type ResolvedTheme = "dark" | "light"

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const STORAGE_KEY = "theme"
const LIGHT_QUERY = "(prefers-color-scheme: light)"
const ThemeContext = createContext<ThemeContextValue | null>(null)

function isTheme(value: string | null): value is Theme {
  return value === "dark" || value === "light" || value === "system"
}

function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark"
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return isTheme(stored) ? stored : "dark"
  } catch {
    return "dark"
  }
}

function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme !== "system") return theme
  return window.matchMedia(LIGHT_QUERY).matches ? "light" : "dark"
}

function applyTheme(theme: Theme) {
  const resolved = resolveTheme(theme)
  const root = document.documentElement
  root.classList.remove("light", "dark")
  root.classList.add(resolved)
  root.style.colorScheme = resolved
  const colorMeta = document.querySelector('meta[name="theme-color"]')
  if (colorMeta) {
    colorMeta.setAttribute("content", resolved === "light" ? "#f4f6fa" : "#12131a")
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readStoredTheme)

  const setTheme = useCallback((next: Theme) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Ignore quota / private-mode failures; the in-memory theme still updates.
    }
    setThemeState(next)
  }, [])

  useLayoutEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    const media = window.matchMedia(LIGHT_QUERY)
    const onPreferenceChange = () => {
      if (theme === "system") applyTheme("system")
    }
    media.addEventListener("change", onPreferenceChange)
    return () => media.removeEventListener("change", onPreferenceChange)
  }, [theme])

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return
      setThemeState(isTheme(event.newValue) ? event.newValue : "dark")
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
