# 开发环境完整指南

本指南覆盖从零开始准备开发环境、安装依赖、启动前后端（前端已实现，后端为接口契约）直到成功运行。

## 1. 必备工具下载

### 1.1 开发工具
- **Git**：版本管理工具
  - Windows: https://git-scm.com/download/win
  - macOS: `brew install git`
  - Ubuntu: `sudo apt-get install git`
- **Node.js 20+**：前端构建与运行
  - https://nodejs.org/en/download
- **包管理器**（推荐 pnpm）
  - `npm install -g pnpm`
- **IDE（推荐 VS Code）**
  - https://code.visualstudio.com/
  - 推荐插件：Vue - Official、ESLint、Prettier

### 1.2 可选工具（企业规范）
- **Docker**：未来后端与部署容器化
- **Postman**：接口调试
- **Chrome/Edge**：前端调试

## 2. 一键安装依赖（聚合文件）

我们提供了一个一键脚本，帮助拉取前端依赖并进行基础校验：

```bash
bash scripts/install-deps.sh
```

> 说明：该脚本会调用 `pnpm install`（或 `npm install`）。请先确保已安装 Node.js。

## 3. 安装步骤（手动）

```bash
git clone <你的仓库地址>
cd agent-super-ai
pnpm install
```

## 4. 环境变量

复制 `.env.example` 为 `.env.development`，并根据后端地址修改：

```bash
cp .env.example .env.development
```

## 5. 启动前端

```bash
pnpm dev
```

访问：http://localhost:5173

## 6. 后端服务说明（接口契约）

前端已实现接口调用的结构，但当前使用 Mock 数据模拟结果。后端建议实现如下接口：

- `POST /api/news/generate?date=YYYY-MM-DD` → 返回 `{ taskId }`
- `GET /api/news/task/:taskId` → 返回 `{ status, progress, logs, result }`
- `GET /api/news/today` → 返回缓存的今日资讯
- `POST /api/llm/chat` → 多模型统一对话接口（支持 SSE）
- `POST /api/llm/test` → API Key 连通性测试

详细契约见：`docs/API_CONTRACT.md`

## 7. 常见问题

- **npm install 失败**：确认 Node 版本 >= 20，或切换到 pnpm。
- **页面空白**：检查 `.env.development` 配置，确保 API 地址可访问。
- **跨域问题**：后端需配置 CORS 白名单。
