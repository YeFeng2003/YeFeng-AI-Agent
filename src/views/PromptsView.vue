<template>
  <section class="page-section">
    <div class="container">
      <div class="section-title">Prompt 工坊</div>
      <el-card>
        <template #header>新增提示词模板</template>
        <el-form label-position="top" :model="form">
          <el-form-item label="标题">
            <el-input v-model="form.title" placeholder="例如：产品需求总结" />
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model="form.content" type="textarea" :rows="4" />
          </el-form-item>
          <el-form-item label="标签（逗号分隔）">
            <el-input v-model="form.tags" placeholder="写作,总结,营销" />
          </el-form-item>
        </el-form>
        <div class="form-actions">
          <el-button type="primary" @click="addPrompt">保存模板</el-button>
          <el-button @click="resetForm">清空</el-button>
        </div>
      </el-card>

      <el-card class="prompt-list">
        <template #header>我的提示词库</template>
        <el-table :data="prompts" style="width: 100%">
          <el-table-column prop="title" label="标题" width="200" />
          <el-table-column label="标签">
            <template #default="scope">
              <el-tag v-for="tag in scope.row.tags" :key="tag" size="small" effect="plain">
                {{ tag }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220">
            <template #default="scope">
              <el-button size="small" @click="sendToAgent(scope.row)">发送到 Agent</el-button>
              <el-button size="small" @click="toggleFavorite(scope.row)">
                {{ scope.row.favorite ? '取消收藏' : '收藏' }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="export-actions">
          <el-button @click="exportJson">导出 JSON</el-button>
          <el-button @click="exportMarkdown">导出 Markdown</el-button>
        </div>
      </el-card>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { readStorage, writeStorage } from '../utils/storage'

interface PromptItem {
  id: string
  title: string
  content: string
  tags: string[]
  favorite: boolean
}

const form = reactive({
  title: '',
  content: '',
  tags: ''
})

const prompts = ref<PromptItem[]>(readStorage('prompt-library', []))

const savePrompts = () => {
  writeStorage('prompt-library', prompts.value)
}

const addPrompt = () => {
  if (!form.title || !form.content) {
    ElMessage.warning('请完善标题和内容')
    return
  }
  prompts.value.unshift({
    id: crypto.randomUUID(),
    title: form.title,
    content: form.content,
    tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
    favorite: false
  })
  savePrompts()
  resetForm()
  ElMessage.success('已保存')
}

const resetForm = () => {
  form.title = ''
  form.content = ''
  form.tags = ''
}

const toggleFavorite = (item: PromptItem) => {
  item.favorite = !item.favorite
  savePrompts()
}

const sendToAgent = (item: PromptItem) => {
  writeStorage('agent-draft', item.content)
  ElMessage.success('已发送到 Agent 输入框（请前往 Agent 页面查看）')
}

const exportJson = () => {
  const blob = new Blob([JSON.stringify(prompts.value, null, 2)], { type: 'application/json' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'prompts.json'
  link.click()
  URL.revokeObjectURL(link.href)
}

const exportMarkdown = () => {
  const lines = prompts.value.map((item) => `## ${item.title}\n\n${item.content}\n\n标签：${item.tags.join(', ')}`)
  const blob = new Blob([lines.join('\n\n---\n\n')], { type: 'text/markdown' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'prompts.md'
  link.click()
  URL.revokeObjectURL(link.href)
}
</script>

<style scoped>
.form-actions {
  display: flex;
  gap: 8px;
}

.prompt-list {
  margin-top: 24px;
}

.export-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 12px;
}
</style>
