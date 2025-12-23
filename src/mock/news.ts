import type { NewsResponse } from '../types'

export const mockNews: NewsResponse = {
  date: '2025-01-02',
  generatedAt: '2025-01-02 09:30',
  providerUsed: 'OpenAI GPT-4o (mock)',
  items: [
    {
      title: 'OpenAI 发布新一代多模态模型，提升实时推理与工具调用能力',
      summary:
        '新模型在视觉理解与实时搜索结合方面表现突出，支持更低延迟的流式输出，并开放更细粒度的安全策略。',
      bullets: ['推理能力提升 30%', '新增实时工具调用', '更严格的安全对齐策略'],
      sources: [
        { name: 'OpenAI Blog', url: 'https://openai.com/blog' },
        { name: 'TechCrunch', url: 'https://techcrunch.com' }
      ],
      publishedAt: '2025-01-02',
      tags: ['OpenAI', '产品发布', '多模态']
    },
    {
      title: 'Google Gemini 加入企业级 Agent 编排能力，强化多系统协作',
      summary:
        'Gemini 新增 Agent Orchestration 模块，可与企业内部工具集成，支持任务拆解与权限控制。',
      bullets: ['支持企业内部工具连接', '提供权限与审计能力', '可视化任务编排'],
      sources: [
        { name: 'Google AI', url: 'https://ai.google' },
        { name: 'The Verge', url: 'https://www.theverge.com' }
      ],
      publishedAt: '2025-01-02',
      tags: ['Google', 'Agent', '企业']
    },
    {
      title: '开源社区推出轻量化 RAG 框架，加速中小团队落地',
      summary:
        '新框架提供 5 分钟快速构建知识库能力，支持多向量数据库与可视化监控面板。',
      bullets: ['支持多向量数据库', '提供监控仪表盘', '低成本部署'],
      sources: [
        { name: 'GitHub', url: 'https://github.com' },
        { name: 'Hacker News', url: 'https://news.ycombinator.com' }
      ],
      publishedAt: '2025-01-02',
      tags: ['开源', 'RAG', '工具']
    }
  ]
}
