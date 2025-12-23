export interface ToolItem {
  id: string
  name: string
  icon: string
  url: string
  category: string
  description: string
  tags: string[]
  hotScore: number
}

export interface NewsItem {
  title: string
  summary: string
  bullets: string[]
  sources: { name: string; url: string }[]
  publishedAt: string
  tags: string[]
}

export interface NewsResponse {
  date: string
  items: NewsItem[]
  generatedAt: string
  providerUsed: string
}

export interface ProviderCapability {
  streaming: boolean
  reasoning: boolean
  search: boolean
  multimodal: boolean
}

export interface ProviderInfo {
  id: string
  displayName: string
  description: string
  models: string[]
  capabilities: ProviderCapability
}

export interface ChatMessage {
  id: string
  role: 'system' | 'user' | 'assistant'
  content: string
  meta?: {
    providerId: string
    model: string
    tokens?: number
    latency?: number
    modeReasoning?: boolean
    modeSearch?: boolean
  }
}
