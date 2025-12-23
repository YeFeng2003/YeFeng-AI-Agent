import http from '../http'
import type { NewsResponse } from '../../types'

export const generateNews = (date: string) =>
  http.post<{ taskId: string }>(`/news/generate?date=${date}`)

export const fetchNewsTask = (taskId: string) =>
  http.get<{ status: string; progress: number; logs: string[]; result?: NewsResponse }>(
    `/news/task/${taskId}`
  )

export const fetchTodayNews = () => http.get<NewsResponse>('/news/today')
