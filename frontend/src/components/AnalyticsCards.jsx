import { useEffect, useState } from 'react'
import { getStats } from '../services/api.js'
import Card from './Card.jsx'

export default function AnalyticsCards() {
  const [stats, setStats] = useState({ total: 0, averageRating: 0, positive: 0, negative: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    setLoading(true)
    getStats()
      .then((s) => { if (mounted) setStats(s) })
      .catch((e) => setError(e?.response?.data?.message || e.message))
      .finally(() => setLoading(false))
    return () => { mounted = false }
  }, [])

  if (loading) return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"><Skeleton /><Skeleton /><Skeleton /><Skeleton /></div>
  if (error) return <div className="p-4 rounded bg-red-50 text-red-700">{error}</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Metric title="Total Feedback" value={stats.total} accent="indigo" />
      <Metric title="Average Rating" value={stats.averageRating} accent="emerald" />
      <Metric title="Positive (≥4)" value={stats.positive} accent="sky" />
      <Metric title="Negative (≤2)" value={stats.negative} accent="amber" />
    </div>
  )
}

function Metric({ title, value, accent }) {
  return (
    <Card title={title} accent={accent}>
      <div className="text-3xl font-semibold">{value}</div>
    </Card>
  )
}

function Skeleton() {
  return <div className="rounded-xl border bg-white dark:bg-gray-900/60 p-6 animate-pulse h-28" />
}
