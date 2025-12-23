import type { ProviderInfo } from '../types'

export const providers: ProviderInfo[] = [
  {
    id: 'chatgpt',
    displayName: 'ChatGPT (OpenAI)',
    description: '综合能力强，适合通用任务与工具生态。',
    models: ['gpt-4o', 'gpt-4o-mini'],
    capabilities: {
      streaming: true,
      reasoning: true,
      search: true,
      multimodal: true
    }
  },
  {
    id: 'gemini',
    displayName: 'Gemini (Google)',
    description: '多模态与长上下文优势明显。',
    models: ['gemini-1.5-pro', 'gemini-1.5-flash'],
    capabilities: {
      streaming: true,
      reasoning: true,
      search: true,
      multimodal: true
    }
  },
  {
    id: 'grok',
    displayName: 'Grok (xAI)',
    description: '强调实时搜索与洞察。',
    models: ['grok-2', 'grok-2-mini'],
    capabilities: {
      streaming: true,
      reasoning: true,
      search: true,
      multimodal: false
    }
  },
  {
    id: 'deepseek',
    displayName: 'DeepSeek',
    description: '开源与推理能力突出。',
    models: ['deepseek-reasoner', 'deepseek-chat'],
    capabilities: {
      streaming: true,
      reasoning: true,
      search: false,
      multimodal: false
    }
  },
  {
    id: 'doubao',
    displayName: '豆包 (Doubao)',
    description: '面向中文场景的稳定助手。',
    models: ['doubao-pro', 'doubao-lite'],
    capabilities: {
      streaming: true,
      reasoning: false,
      search: false,
      multimodal: true
    }
  }
]
