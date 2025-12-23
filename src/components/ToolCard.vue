<template>
  <el-card class="tool-card" shadow="hover">
    <div class="tool-card__header">
      <div class="tool-icon">{{ tool.icon }}</div>
      <div>
        <div class="tool-name">{{ tool.name }}</div>
        <div class="tool-desc">{{ tool.description }}</div>
      </div>
    </div>
    <div class="tool-tags">
      <el-tag size="small" type="info">{{ tool.category }}</el-tag>
      <el-tag v-for="tag in tool.tags" :key="tag" size="small" effect="plain">
        {{ tag }}
      </el-tag>
    </div>
    <div class="tool-actions">
      <el-button type="primary" size="small" @click="openLink">打开</el-button>
      <el-button size="small" @click="toggleFavorite">
        {{ isFavorite ? '已收藏' : '收藏' }}
      </el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ToolItem } from '../types'
import { readStorage, writeStorage } from '../utils/storage'

const props = defineProps<{ tool: ToolItem }>()
const emit = defineEmits<{ (event: 'favorite-change'): void }>()

const favorites = ref<string[]>(readStorage('favorite-tools', []))
const isFavorite = computed(() => favorites.value.includes(props.tool.id))

const openLink = () => {
  window.open(props.tool.url, '_blank')
}

const toggleFavorite = () => {
  const next = new Set(favorites.value)
  if (next.has(props.tool.id)) {
    next.delete(props.tool.id)
  } else {
    next.add(props.tool.id)
  }
  const nextList = Array.from(next)
  favorites.value = nextList
  writeStorage('favorite-tools', nextList)
  emit('favorite-change')
}
</script>

<style scoped>
.tool-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tool-card__header {
  display: flex;
  gap: 12px;
}

.tool-icon {
  font-size: 28px;
}

.tool-name {
  font-weight: 600;
}

.tool-desc {
  font-size: 13px;
  color: #6b7280;
}

.tool-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tool-actions {
  display: flex;
  justify-content: space-between;
}
</style>
