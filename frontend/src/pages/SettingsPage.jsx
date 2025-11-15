import { useEffect, useState } from 'react'
import Card from '../components/Card.jsx'
import { getTheme, setTheme, applyTheme, getTableDensity, setTableDensity } from '../utils/preferences.js'

export default function SettingsPage() {
  const [theme, updateTheme] = useState('light')
  const [density, updateDensity] = useState('normal')

  useEffect(() => {
    try {
      updateTheme(getTheme())
      updateDensity(getTableDensity())
    } catch {}
  }, [])

  const onThemeChange = (e) => {
    const t = e.target.value
    updateTheme(t)
    setTheme(t)
    applyTheme(t)
  }

  const onDensityChange = (e) => {
    const d = e.target.value
    updateDensity(d)
    setTableDensity(d)
  }

  return (
    <div className="space-y-6">
      <Card title="Appearance" accent="indigo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Theme</label>
            <select value={theme} onChange={onThemeChange} className="w-full rounded border px-3 py-2 bg-white dark:bg-gray-800">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Choose between Light/Dark or follow your system preference.</p>
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Table Density</label>
            <select value={density} onChange={onDensityChange} className="w-full rounded border px-3 py-2 bg-white dark:bg-gray-800">
              <option value="compact">Compact</option>
              <option value="normal">Normal</option>
              <option value="comfortable">Comfortable</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Affects row padding in tables.</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
