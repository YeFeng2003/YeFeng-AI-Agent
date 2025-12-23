<template>
  <div>
    <section class="page-section">
      <div class="container">
        <div class="hero">
          <div>
            <div class="status-pill">一站式 AI 集成门户</div>
            <h1>让每个人都能一站式掌握并用好 AI</h1>
            <p>
              汇聚最新 AI 资讯、主流模型与高频工具。支持统一对话、Prompt 管理与成本估算，让
              体验更高效。
            </p>
          </div>
          <div class="hero-actions">
            <el-button type="primary" size="large" @click="goTo('/agent')">
              立即试用 Agent
            </el-button>
            <el-button size="large" @click="goTo('/news')">查看今日资讯</el-button>
          </div>
        </div>
      </div>
    </section>

    <section class="page-section">
      <div class="container">
        <div class="section-title">AI 工具入口</div>
        <ToolGallery />
      </div>
    </section>

    <section class="page-section">
      <div class="container">
        <div class="section-title">AI 发展状况展示区</div>
        <div class="status-grid">
          <el-card>
            <template #header>大模型里程碑时间线</template>
            <el-timeline>
              <el-timeline-item v-for="item in timeline" :key="item.title" :timestamp="item.time">
                <strong>{{ item.title }}</strong>
                <div class="muted">{{ item.description }}</div>
              </el-timeline-item>
            </el-timeline>
          </el-card>
          <el-card>
            <template #header>AI 术语速查</template>
            <div class="tag-cloud">
              <el-tooltip
                v-for="term in glossary"
                :key="term.title"
                effect="dark"
                placement="top"
                :content="term.summary"
              >
                <el-tag class="tag-item" @click="openGlossary(term)">
                  {{ term.title }}
                </el-tag>
              </el-tooltip>
            </div>
            <el-drawer v-model="drawerOpen" size="40%">
              <template #header>
                <strong>{{ selectedTerm?.title }}</strong>
              </template>
              <p>{{ selectedTerm?.summary }}</p>
              <p class="muted">{{ selectedTerm?.detail }}</p>
            </el-drawer>
          </el-card>
          <el-card>
            <template #header>本周热门方向</template>
            <div class="tag-cloud">
              <el-tag v-for="item in hotspots" :key="item" type="success" effect="plain">
                {{ item }}
              </el-tag>
            </div>
            <p class="muted">
              建议关注「Agent 编排」「企业私有化部署」「实时搜索」「多模态生产力」等方向。
            </p>
          </el-card>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ToolGallery from '../components/ToolGallery.vue'

const router = useRouter()
const goTo = (path: string) => router.push(path)

const timeline = [
  { time: '2020', title: 'GPT-3 诞生', description: '大模型参数规模突破，带动生成式 AI 热潮。' },
  { time: '2022', title: 'ChatGPT 上线', description: '对话式体验引爆大众市场。' },
  { time: '2023', title: '多模态与 Agent 崛起', description: '图文语音融合与任务型 Agent 快速落地。' },
  { time: '2024', title: 'RAG 与企业应用成熟', description: '知识增强与企业场景深度结合。' }
]

const glossary = [
  {
    title: 'RAG',
    summary: '检索增强生成',
    detail: '通过检索外部知识库提升模型回答准确性。'
  },
  {
    title: 'Agent',
    summary: '具备任务规划与工具调用能力的智能体',
    detail: '可自主拆解目标并执行多步操作。'
  },
  {
    title: '多模态',
    summary: '理解图像、文本、音频等多种形式',
    detail: '支持更丰富的交互与应用场景。'
  },
  {
    title: 'Prompt Engineering',
    summary: '提示词工程',
    detail: '通过结构化提示提升模型表现。'
  }
]

const hotspots = ['Agent 编排', '实时搜索', '企业私有化部署', '多模态生产力', 'AI 安全合规']

const drawerOpen = ref(false)
const selectedTerm = ref<{ title: string; summary: string; detail: string } | null>(null)

const openGlossary = (term: { title: string; summary: string; detail: string }) => {
  selectedTerm.value = term
  drawerOpen.value = true
}
</script>

<style scoped>
.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.status-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.tag-item {
  cursor: pointer;
}

.muted {
  color: #6b7280;
  font-size: 13px;
}
</style>
