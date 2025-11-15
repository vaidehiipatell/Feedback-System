const THEME_KEY = 'theme'
const DENSITY_KEY = 'tableDensity'

export function applyTheme(theme) {
  const root = document.documentElement
  let t = theme
  if (t === 'system') {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    t = prefersDark ? 'dark' : 'light'
  }
  if (t === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
}

export function getTheme() {
  return localStorage.getItem(THEME_KEY) || 'light'
}

export function setTheme(theme) {
  localStorage.setItem(THEME_KEY, theme)
  applyTheme(theme)
}

export function getTableDensity() {
  return localStorage.getItem(DENSITY_KEY) || 'normal'
}

export function setTableDensity(val) {
  localStorage.setItem(DENSITY_KEY, val)
}
