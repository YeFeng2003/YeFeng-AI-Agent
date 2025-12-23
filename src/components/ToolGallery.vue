<template>
  <div>
    <div class="tool-filters">
      <el-input v-model="keyword" placeholder="搜索工具" clearable />
      <el-select v-model="category" placeholder="分类筛选" clearable>
        <el-option v-for="item in categories" :key="item" :label="item" :value="item" />
      </el-select>
      <el-checkbox v-model="onlyFavorites">仅看收藏</el-checkbox>
    </div>
    <div class="card-grid">
      <ToolCard
        v-for="tool in filteredTools"
        :key="tool.id"
        :tool="tool"
        @favorite-change="refreshFavorites"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ToolCard from './ToolCard.vue'
import tools from '../constants/tools.json'
import type { ToolItem } from '../types'
import { readStorage } from '../utils/storage'

const keyword = ref('')
const category = ref('')
const onlyFavorites = ref(false)
const favorites = ref<string[]>(readStorage('favorite-tools', []))

const categories = Array.from(new Set((tools as ToolItem[]).map((item) => item.category)))

const refreshFavorites = () => {
  favorites.value = readStorage('favorite-tools', [])
}

const filteredTools = computed(() => {
  return (tools as ToolItem[]).filter((tool) => {
    const matchesKeyword = tool.name.toLowerCase().includes(keyword.value.toLowerCase())
    const matchesCategory = category.value ? tool.category === category.value : true
    const matchesFavorite = onlyFavorites.value ? favorites.value.includes(tool.id) : true
    return matchesKeyword && matchesCategory && matchesFavorite
  })
})
</script>

<style scoped>
.tool-filters {
  display: grid;
  grid-template-columns: 1.5fr 1fr auto;
  gap: 12px;
  margin-bottom: 20px;
  align-items: center;
}

@media (max-width: 900px) {
  .tool-filters {
    grid-template-columns: 1fr;
  }
}
</style>
