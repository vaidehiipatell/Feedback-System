import { useState, useMemo } from 'react'
import Dashboard from './pages/Dashboard.jsx'
import FeedbackPage from './pages/FeedbackPage.jsx'
import AnalyticsPage from './pages/AnalyticsPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import Sidebar from './components/Sidebar.jsx'

export default function App() {
  const [active, setActive] = useState('dashboard')

  const Content = useMemo(() => {
    switch (active) {
      case 'dashboard':
        return <Dashboard />
      case 'feedback':
        return <FeedbackPage />
      case 'analytics':
        return <AnalyticsPage />
      case 'settings':
        return <SettingsPage />
      default:
        return <Dashboard />
    }
  }, [active])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="flex">
        <Sidebar activeKey={active} onSelect={setActive} />
        <div className="flex-1 min-h-screen">
          <header className="sticky top-0 z-10 border-b bg-white/70 dark:bg-gray-900/60 backdrop-blur">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
              <h1 className="text-2xl font-bold">Feedback Dashboard</h1>
              <ThemeToggle />
            </div>
          </header>
          <main className="max-w-6xl mx-auto px-4 py-6">
            {Content}
          </main>
          <footer className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500">© {new Date().getFullYear()} Feedback Dashboard</footer>
        </div>
      </div>
    </div>
  )
}
