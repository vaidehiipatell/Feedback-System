import { useEffect, useState } from 'react'
import { getFeedbacks } from '../services/api.js'
import dayjs from 'dayjs'

export default function FeedbackTable({ refreshKey }) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [ratingFilter, setRatingFilter] = useState('all')

  useEffect(() => {
    let mounted = true
    setLoading(true)
    getFeedbacks()
      .then((list) => { if (mounted) setRows(list) })
      .catch((e) => setError(e?.response?.data?.message || e.message))
      .finally(() => setLoading(false))
    return () => { mounted = false }
  }, [refreshKey])

  const filtered = rows.filter(r => ratingFilter === 'all' ? true : r.rating === Number(ratingFilter))

  const exportCSV = () => {
    const headers = ['Name','Email','Rating','Message','CreatedAt']
    const csvRows = [headers.join(',')]
    filtered.forEach(f => {
      const row = [
        escapeCsv(f.name),
        escapeCsv(f.email || ''),
        f.rating,
        escapeCsv(f.message),
        dayjs(f.createdAt).toISOString(),
      ]
      csvRows.push(row.join(','))
    })
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `feedback_export_${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">All Feedback</div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Filter by Rating</label>
          <select value={ratingFilter} onChange={(e)=>setRatingFilter(e.target.value)} className="rounded border px-2 py-1 bg-white dark:bg-gray-800">
            <option value="all">All</option>
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <button onClick={exportCSV} className="rounded border px-3 py-1 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">Export CSV</button>
        </div>
      </div>

      <div className="overflow-x-auto rounded border bg-white dark:bg-gray-800">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Rating</th>
              <th className="text-left p-3">Message</th>
              <th className="text-left p-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td className="p-3" colSpan={5}>Loading…</td></tr>
            )}
            {error && (
              <tr><td className="p-3 text-red-600" colSpan={5}>{error}</td></tr>
            )}
            {!loading && !error && filtered.length === 0 && (
              <tr><td className="p-3" colSpan={5}>No feedback found.</td></tr>
            )}
            {!loading && !error && filtered.map(f => (
              <tr key={f._id} className="border-t">
                <td className="p-3">{f.name}</td>
                <td className="p-3">{f.email || '-'}</td>
                <td className="p-3">{f.rating}</td>
                <td className="p-3 max-w-xl">{f.message}</td>
                <td className="p-3 whitespace-nowrap">{dayjs(f.createdAt).format('YYYY-MM-DD HH:mm')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function escapeCsv(val) {
  if (val == null) return ''
  const s = String(val)
  if (/[",\n]/.test(s)) {
    return '"' + s.replace(/"/g, '""') + '"'
  }
  return s
}
