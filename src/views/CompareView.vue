<template>
  <section class="page-section">
    <div class="container">
      <div class="section-title">模型对比与能力矩阵</div>
      <div class="filter-bar">
        <el-checkbox v-model="filterSearch">只看支持搜索</el-checkbox>
        <el-checkbox v-model="filterReasoning">只看支持推理</el-checkbox>
        <el-checkbox v-model="filterFree">只看免费/低价（占位）</el-checkbox>
      </div>
      <el-table :data="filteredProviders" style="width: 100%">
        <el-table-column prop="displayName" label="Provider" width="220" />
        <el-table-column label="Streaming">
          <template #default="scope">
            <el-tag :type="scope.row.capabilities.streaming ? 'success' : 'info'">
              {{ scope.row.capabilities.streaming ? '支持' : '不支持' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Reasoning">
          <template #default="scope">
            <el-tag :type="scope.row.capabilities.reasoning ? 'success' : 'info'">
              {{ scope.row.capabilities.reasoning ? '支持' : '不支持' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Search">
          <template #default="scope">
            <el-tag :type="scope.row.capabilities.search ? 'success' : 'info'">
              {{ scope.row.capabilities.search ? '支持' : '不支持' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="多模态">
          <template #default="scope">
            <el-tag :type="scope.row.capabilities.multimodal ? 'success' : 'info'">
              {{ scope.row.capabilities.multimodal ? '支持' : '不支持' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="价格（占位）">
          <template #default>
            <el-tag type="warning" effect="plain">待配置</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { providers } from '../constants/providers'

const filterSearch = ref(false)
const filterReasoning = ref(false)
const filterFree = ref(false)

const filteredProviders = computed(() => {
  return providers.filter((provider) => {
    if (filterSearch.value && !provider.capabilities.search) {
      return false
    }
    if (filterReasoning.value && !provider.capabilities.reasoning) {
      return false
    }
    if (filterFree.value) {
      return provider.id !== 'chatgpt'
    }
    return true
  })
})
</script>

<style scoped>
.filter-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}
</style>
