import AnalyticsCards from '../components/AnalyticsCards.jsx'
import Card from '../components/Card.jsx'

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <AnalyticsCards />
      <Card title="Overview" accent="emerald">
        <p className="text-sm text-gray-600 dark:text-gray-300">Key feedback metrics at a glance.</p>
      </Card>
    </div>
  )
}
