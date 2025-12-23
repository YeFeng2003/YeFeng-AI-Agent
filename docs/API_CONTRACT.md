# Mock 后端接口文档（契约）

## 1. 每日 AI 资讯

### 1.1 触发生成

`POST /api/news/generate?date=YYYY-MM-DD`

响应：
```json
{ "taskId": "uuid" }
```

### 1.2 任务轮询

`GET /api/news/task/:taskId`

响应：
```json
{
  "status": "pending|running|success|failed",
  "progress": 75,
  "logs": ["抓取 RSS", "去重过滤"],
  "result": {
    "date": "2025-01-02",
    "items": [
      {
        "title": "标题",
        "summary": "摘要",
        "bullets": ["要点 1", "要点 2", "要点 3"],
        "sources": [{ "name": "来源", "url": "https://" }],
        "publishedAt": "2025-01-02",
        "tags": ["OpenAI", "产品发布"]
      }
    ],
    "generatedAt": "2025-01-02 09:30",
    "providerUsed": "OpenAI GPT-4o"
  }
}
```

### 1.3 今日缓存

`GET /api/news/today`

响应与 `result` 一致。

## 2. Agent 超级AI

### 2.1 统一对话接口

`POST /api/llm/chat`

请求：
```json
{
  "providerId": "chatgpt",
  "model": "gpt-4o",
  "messages": [{ "role": "user", "content": "你好" }],
  "temperature": 0.6,
  "maxTokens": 1024,
  "reasoning": true,
  "search": false
}
```

响应：
- SSE 流式输出（推荐）或 JSON 完整输出。

### 2.2 Key 测试接口

`POST /api/llm/test`

请求：
```json
{ "providerId": "chatgpt" }
```

响应：
```json
{ "ok": true, "latency": 200 }
```
