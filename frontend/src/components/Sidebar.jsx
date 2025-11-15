import { useState } from 'react'
import ThemeToggle from './ThemeToggle.jsx'

const nav = [
  { label: 'Dashboard', key: 'dashboard' },
  { label: 'Feedback', key: 'feedback' },
  { label: 'Analytics', key: 'analytics' },
  { label: 'Settings', key: 'settings' },
]

export default function Sidebar({ activeKey = 'dashboard', onSelect }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <aside
      className={`hidden md:flex ${expanded ? 'md:w-64' : 'md:w-16'} shrink-0 h-screen sticky top-0 border-r bg-white/70 dark:bg-gray-900/60 backdrop-blur transition-[width] duration-200`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="flex flex-col w-full h-full">
        <div className={`px-4 py-4 border-b flex items-center ${expanded ? 'justify-between' : 'justify-center'}`}>
          <div className={`inline-flex items-center gap-2 font-semibold ${expanded ? '' : 'justify-center'}`}>
            <div className="w-6 h-6 rounded bg-indigo-600" />
            {expanded && <span>Feedback</span>}
          </div>
          {expanded && (
            <div className="md:hidden">
              <ThemeToggle />
            </div>
          )}
        </div>
        <nav className={`flex-1 p-2 space-y-1 ${expanded ? '' : 'px-2'}`}>
          {nav.map(item => {
            const active = item.key === activeKey
            return (
              <button
                key={item.key}
                title={!expanded ? item.label : undefined}
                onClick={() => onSelect && onSelect(item.key)}
                className={`w-full text-left ${expanded ? 'px-3' : 'px-0'} py-2 rounded-lg transition-colors flex items-center gap-3 justify-${expanded ? 'start' : 'center'} ${
                  active
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-200'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <span className="inline-block w-6 h-6 rounded bg-gray-300 dark:bg-gray-700" />
                {expanded && <span>{item.label}</span>}
              </button>
            )
          })}
        </nav>
        <div className={`border-t text-xs text-gray-500 ${expanded ? 'p-3' : 'p-2 text-center'}`}>
          {expanded ? `© ${new Date().getFullYear()} Feedback` : '©'}
        </div>
      </div>
    </aside>
  )
}
