export default function Card({ title, subtitle, children, accent = 'indigo' }) {
  const accentClasses = {
    indigo: 'from-indigo-50 to-transparent dark:from-indigo-950/30',
    emerald: 'from-emerald-50 to-transparent dark:from-emerald-950/30',
    amber: 'from-amber-50 to-transparent dark:from-amber-950/30',
    violet: 'from-violet-50 to-transparent dark:from-violet-950/30',
    sky: 'from-sky-50 to-transparent dark:from-sky-950/30',
  }[accent] || 'from-gray-50 to-transparent dark:from-gray-800'

  return (
    <div className={`rounded-xl border bg-white dark:bg-gray-900/60 shadow-sm overflow-hidden`}>
      {(title || subtitle) && (
        <div className={`p-4 bg-gradient-to-r ${accentClasses} border-b` }>
          {title && <div className="text-sm text-gray-500 mb-0.5">{subtitle}</div>}
          <div className="text-lg font-semibold">{title}</div>
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  )
}
