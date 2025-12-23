<template>
  <el-card shadow="hover">
    <div class="news-card__header">
      <h3>{{ item.title }}</h3>
      <el-tag type="info" effect="plain">{{ item.publishedAt }}</el-tag>
    </div>
    <p class="news-summary">{{ item.summary }}</p>
    <ul class="news-bullets">
      <li v-for="bullet in item.bullets" :key="bullet">{{ bullet }}</li>
    </ul>
    <div class="news-tags">
      <el-tag v-for="tag in item.tags" :key="tag" size="small" effect="plain">
        {{ tag }}
      </el-tag>
    </div>
    <el-collapse>
      <el-collapse-item title="更多细节 / 引用来源">
        <div class="news-sources">
          <a v-for="source in item.sources" :key="source.url" :href="source.url" target="_blank">
            {{ source.name }}
          </a>
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script setup lang="ts">
import type { NewsItem } from '../types'

defineProps<{ item: NewsItem }>()
</script>

<style scoped>
.news-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.news-summary {
  color: #4b5563;
}

.news-bullets {
  padding-left: 16px;
  color: #334155;
}

.news-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.news-sources {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
</style>
