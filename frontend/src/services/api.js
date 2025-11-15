import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:5000'

export const api = axios.create({ baseURL: `${baseURL}/api` })

export const getFeedbacks = async () => {
  const { data } = await api.get('/feedback')
  return data.feedbacks
}

export const getStats = async () => {
  const { data } = await api.get('/stats')
  return data
}

export const submitFeedback = async (payload) => {
  const { data } = await api.post('/feedback', payload)
  return data
}
