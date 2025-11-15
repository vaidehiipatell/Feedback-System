import { useState } from 'react'
import { submitFeedback } from '../services/api.js'
import toast from 'react-hot-toast'

export default function FeedbackForm({ onSubmitted }) {
  const [form, setForm] = useState({ name: '', email: '', message: '', rating: 5 })
  const [loading, setLoading] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = { ...form, rating: Number(form.rating) }
      await submitFeedback(payload)
      toast.success('Feedback submitted')
      setForm({ name: '', email: '', message: '', rating: 5 })
      onSubmitted?.()
    } catch (e) {
      toast.error(e?.response?.data?.message || e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input name="name" value={form.name} onChange={onChange} required className="w-full rounded border px-3 py-2 bg-white dark:bg-gray-800" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input name="email" type="email" value={form.email} onChange={onChange} className="w-full rounded border px-3 py-2 bg-white dark:bg-gray-800" />
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Message</label>
        <textarea name="message" value={form.message} onChange={onChange} required rows={3} className="w-full rounded border px-3 py-2 bg-white dark:bg-gray-800" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-end">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Rating</label>
          <select name="rating" value={form.rating} onChange={onChange} className="w-full rounded border px-3 py-2 bg-white dark:bg-gray-800">
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="sm:col-span-3">
          <button disabled={loading} className="inline-flex items-center justify-center rounded bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 disabled:opacity-60">
            {loading ? 'Submitting…' : 'Submit Feedback'}
          </button>
        </div>
      </div>
    </form>
  )
}
