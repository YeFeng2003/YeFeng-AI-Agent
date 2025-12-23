import http from '../http'

export interface ChatPayload {
  providerId: string
  model: string
  messages: { role: string; content: string }[]
  temperature: number
  maxTokens: number
  reasoning: boolean
  search: boolean
}

export const chat = (payload: ChatPayload) => http.post('/llm/chat', payload)

export const testConnectivity = (providerId: string) =>
  http.post(`/llm/test`, { providerId })
