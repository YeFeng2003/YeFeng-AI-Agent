<template>
  <section class="page-section">
    <div class="container">
      <div class="flex-between">
        <div>
          <div class="section-title">每日 AI 资讯</div>
          <div class="muted">上次更新时间：{{ lastUpdated || '暂无' }}</div>
        </div>
        <el-button type="primary" :loading="loading" @click="generate">
          生成今日资讯
        </el-button>
      </div>

      <el-steps :active="activeStep" finish-status="success" class="news-steps">
        <el-step title="抓取" />
        <el-step title="清洗" />
        <el-step title="总结" />
        <el-step title="生成" />
      </el-steps>

      <div v-if="statusMessage" class="status-pill">{{ statusMessage }}</div>

      <div class="news-grid" v-if="newsItems.length">
        <NewsCard v-for="item in newsItems" :key="item.title" :item="item" />
      </div>
      <el-empty v-else description="暂无资讯，请点击生成" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import NewsCard from '../components/NewsCard.vue'
import type { NewsItem } from '../types'
import { mockNews } from '../mock/news'

const loading = ref(false)
const activeStep = ref(0)
const newsItems = ref<NewsItem[]>([])
const lastUpdated = ref('')
const statusMessage = ref('')

const stepMessages = ['抓取数据源', '去重过滤', '调用模型总结', '生成标准新闻']

const generate = async () => {
  loading.value = true
  newsItems.value = []
  statusMessage.value = ''
  for (let i = 0; i < stepMessages.length; i += 1) {
    activeStep.value = i
    statusMessage.value = stepMessages[i]
    await new Promise((resolve) => setTimeout(resolve, 600))
  }
  newsItems.value = mockNews.items
  lastUpdated.value = dayjs().format('YYYY-MM-DD HH:mm')
  statusMessage.value = '生成成功（模拟）'
  loading.value = false
}
</script>

<style scoped>
.news-steps {
  margin: 24px 0;
}

.news-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  margin-top: 24px;
}

.muted {
  color: #6b7280;
  font-size: 14px;
}
</style>
