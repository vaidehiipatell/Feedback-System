import { useState } from 'react'
import Card from '../components/Card.jsx'
import FeedbackForm from '../components/FeedbackForm.jsx'
import FeedbackTable from '../components/FeedbackTable.jsx'

export default function FeedbackPage() {
  const [refreshKey, setRefreshKey] = useState(0)
  const triggerRefresh = () => setRefreshKey((k) => k + 1)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Submit Feedback" accent="violet">
          <FeedbackForm onSubmitted={triggerRefresh} />
        </Card>
        <Card title="All Feedback" accent="indigo">
          <FeedbackTable refreshKey={refreshKey} />
        </Card>
      </div>
    </div>
  )
}
