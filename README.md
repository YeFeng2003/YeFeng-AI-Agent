# Agent 超级AI（AI 集成门户）

面向企业与个人的 AI 集成门户，提供每日 AI 资讯、多模型统一对话、工具导航与成本分析。

## 功能一览

- 首页：理念展示、工具入口、AI 发展状况
- 每日 AI 资讯：任务式生成流程 + 标准化新闻卡片
- Agent 超级AI：多 Provider 切换、Reasoning/Search 模式、API Key 管理
- 工具导航：分类筛选、搜索、收藏
- Prompt 工坊：提示词模板管理、导出、发送至 Agent
- 模型对比：能力矩阵与筛选
- 成本计算器：Token 费用估算与优化建议

## 快速开始

```bash
pnpm install
pnpm dev
```

浏览器访问：http://localhost:5173

## 文档

- 开发环境完整指南：`docs/DEV_SETUP.md`
- Mock 后端接口契约：`docs/API_CONTRACT.md`

## 目录结构

```text
src/
  assets/
  components/
  layouts/
  views/
  router/
  stores/
  services/
  types/
  utils/
  styles/
  constants/
  mock/
```

## 环境变量

- `.env.example`：示例配置
- `.env.development` / `.env.production`

## 说明

当前版本前端已实现核心 UI 与交互流程，后端接口需按 `docs/API_CONTRACT.md` 实现。
