import { useEffect, useState } from 'react'

const THEME_KEY = 'theme'

function applyTheme(theme) {
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored)
      applyTheme(stored)
    } else {
      setTheme('light')
      applyTheme('light')
    }
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem(THEME_KEY, next)
    applyTheme(next)
  }

  return (
    <button onClick={toggle} className="inline-flex items-center rounded border px-3 py-1.5 text-sm bg-white dark:bg-gray-800">
      {theme === 'dark' ? 'Dark' : 'Light'}
    </button>
  )
}
