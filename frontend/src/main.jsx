import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { applyTheme } from './utils/preferences.js'

// Apply saved theme on load
try {
  const saved = localStorage.getItem('theme') || 'light'
  applyTheme(saved)
} catch {}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster position="top-right" />
    <App />
  </React.StrictMode>,
)
