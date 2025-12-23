<template>
  <section class="page-section">
    <div class="container agent-layout">
      <aside class="agent-sidebar">
        <el-input v-model="providerKeyword" placeholder="搜索模型" clearable />
        <div class="provider-list">
          <el-card
            v-for="provider in filteredProviders"
            :key="provider.id"
            :class="['provider-card', { active: provider.id === selectedProviderId }]"
            @click="selectProvider(provider.id)"
          >
            <strong>{{ provider.displayName }}</strong>
            <p class="muted">{{ provider.description }}</p>
          </el-card>
        </div>
        <div class="session-header">
          <strong>最近会话</strong>
          <el-button size="small" @click="createSession">新建</el-button>
        </div>
        <div class="session-list">
          <el-card
            v-for="session in sessions"
            :key="session.id"
            :class="['session-card', { active: session.id === activeSessionId }]"
            @click="store.setActiveSession(session.id)"
          >
            {{ session.title }}
          </el-card>
        </div>
      </aside>

      <section class="agent-chat">
        <div class="chat-window">
          <div class="chat-messages" ref="messageRef">
            <div
              v-for="message in activeMessages"
              :key="message.id"
              :class="['chat-bubble', message.role]"
            >
              <MarkdownRenderer v-if="message.role === 'assistant'" :content="message.content" />
              <div v-else>{{ message.content }}</div>
              <div v-if="message.meta" class="message-meta">
                {{ message.meta.providerId }} · {{ message.meta.model }}
              </div>
            </div>
          </div>
          <div class="chat-input">
            <el-input
              v-model="input"
              type="textarea"
              :rows="3"
              placeholder="输入你的问题，回车发送"
              @keydown.enter.prevent="sendMessage"
            />
            <div class="chat-actions">
              <el-button @click="exportSession">导出 Markdown</el-button>
              <el-button type="primary" :loading="sending" @click="sendMessage">发送</el-button>
            </div>
          </div>
        </div>
      </section>

      <aside class="agent-params">
        <el-card>
          <template #header>模型参数</template>
          <el-select v-model="selectedModel" placeholder="选择模型" class="full-width">
            <el-option
              v-for="model in selectedProvider?.models || []"
              :key="model"
              :label="model"
              :value="model"
            />
          </el-select>
          <el-form label-position="top" class="param-form">
            <el-form-item label="温度">
              <el-slider v-model="temperature" :min="0" :max="1" :step="0.1" />
            </el-form-item>
            <el-form-item label="最大 tokens">
              <el-input-number v-model="maxTokens" :min="128" :max="4096" />
            </el-form-item>
            <el-form-item label="模式开关">
              <el-switch
                v-model="reasoning"
                :disabled="!capabilities.reasoning"
                active-text="Reasoning"
                inactive-text="Reasoning"
              />
              <el-tooltip v-if="!capabilities.reasoning" content="该模型暂不支持深度思考">
                <el-icon class="info-icon"><InfoFilled /></el-icon>
              </el-tooltip>
              <el-switch
                v-model="search"
                :disabled="!capabilities.search"
                active-text="Search"
                inactive-text="Search"
              />
              <el-tooltip v-if="!capabilities.search" content="该模型暂不支持搜索">
                <el-icon class="info-icon"><InfoFilled /></el-icon>
              </el-tooltip>
            </el-form-item>
          </el-form>
          <el-divider />
          <el-button type="primary" plain class="full-width" @click="drawerOpen = true">
            API Key 管理
          </el-button>
        </el-card>
      </aside>
    </div>
  </section>

  <el-drawer v-model="drawerOpen" size="35%">
    <template #header>API Key 管理</template>
    <el-form label-position="top">
      <el-form-item v-for="provider in providers" :key="provider.id" :label="provider.displayName">
        <el-input v-model="apiKeys[provider.id]" type="password" show-password />
      </el-form-item>
      <el-checkbox v-model="confirmLocal">仅保存在本地浏览器</el-checkbox>
      <div class="key-actions">
        <el-button @click="saveKeys">保存</el-button>
        <el-button type="danger" plain @click="clearKeys">清空全部 Keys</el-button>
      </div>
      <el-divider />
      <el-button
        v-for="provider in providers"
        :key="provider.id"
        class="full-width"
        @click="testKey(provider.id)"
      >
        测试 {{ provider.displayName }} 连通性
      </el-button>
    </el-form>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { InfoFilled } from '@element-plus/icons-vue'
import { v4 as uuidv4 } from 'uuid'
import { providers } from '../constants/providers'
import type { ChatMessage, ProviderInfo } from '../types'
import { useAgentStore } from '../stores/agentStore'
import { readStorage, writeStorage } from '../utils/storage'
import MarkdownRenderer from '../components/MarkdownRenderer.vue'

const store = useAgentStore()
const providerKeyword = ref('')
const selectedProviderId = ref(providers[0].id)
const selectedModel = ref(providers[0].models[0])
const temperature = ref(0.6)
const maxTokens = ref(1024)
const reasoning = ref(false)
const search = ref(false)
const input = ref('')
const sending = ref(false)
const drawerOpen = ref(false)
const confirmLocal = ref(true)
const apiKeys = reactive<Record<string, string>>(readStorage('agent-keys', {}))
const messageRef = ref<HTMLElement | null>(null)

const filteredProviders = computed(() => {
  return providers.filter((item) =>
    item.displayName.toLowerCase().includes(providerKeyword.value.toLowerCase())
  )
})

const selectedProvider = computed<ProviderInfo | undefined>(() =>
  providers.find((item) => item.id === selectedProviderId.value)
)

const capabilities = computed(() =>
  selectedProvider.value?.capabilities || {
    streaming: false,
    reasoning: false,
    search: false,
    multimodal: false
  }
)

const sessions = computed(() => store.sessions)
const activeSessionId = computed(() => store.activeSessionId)
const activeMessages = computed<ChatMessage[]>(() => store.activeSession?.messages || [])

const selectProvider = (id: string) => {
  selectedProviderId.value = id
  const provider = providers.find((item) => item.id === id)
  if (provider) {
    selectedModel.value = provider.models[0]
  }
}

const createSession = () => {
  const sessionId = uuidv4()
  store.upsertSession({
    id: sessionId,
    title: '新的对话',
    messages: []
  })
}

const ensureSession = () => {
  if (!store.activeSessionId) {
    createSession()
  }
}

const scrollToBottom = async () => {
  await nextTick()
  if (messageRef.value) {
    messageRef.value.scrollTop = messageRef.value.scrollHeight
  }
}

const sendMessage = async () => {
  if (!input.value.trim()) {
    return
  }
  if (!apiKeys[selectedProviderId.value]) {
    ElMessage.warning('请先配置当前平台的 API Key')
    drawerOpen.value = true
    return
  }
  ensureSession()
  sending.value = true
  const message: ChatMessage = {
    id: uuidv4(),
    role: 'user',
    content: input.value,
    meta: {
      providerId: selectedProviderId.value,
      model: selectedModel.value,
      modeReasoning: reasoning.value,
      modeSearch: search.value
    }
  }
  input.value = ''
  const current = store.activeSession
  if (current) {
    const updated = {
      ...current,
      title: current.title === '新的对话' ? message.content.slice(0, 12) : current.title,
      messages: [...current.messages, message]
    }
    store.upsertSession(updated)
  }
  await scrollToBottom()

  const assistantId = uuidv4()
  const assistantMessage: ChatMessage = {
    id: assistantId,
    role: 'assistant',
    content: '',
    meta: {
      providerId: selectedProviderId.value,
      model: selectedModel.value,
      modeReasoning: reasoning.value,
      modeSearch: search.value
    }
  }
  if (store.activeSession) {
    const updated = {
      ...store.activeSession,
      messages: [...store.activeSession.messages, assistantMessage]
    }
    store.upsertSession(updated)
  }

  const responseText = `已为你模拟回复：\n\n- 当前模型：${selectedModel.value}\n- Reasoning：${reasoning.value}\n- Search：${search.value}\n\n你可以将这里替换为后端 SSE 流式输出。`
  let index = 0
  const interval = setInterval(() => {
    const currentSession = store.activeSession
    if (!currentSession) {
      clearInterval(interval)
      return
    }
    const updatedMessages = currentSession.messages.map((item) => {
      if (item.id === assistantId) {
        return { ...item, content: responseText.slice(0, index) }
      }
      return item
    })
    store.upsertSession({ ...currentSession, messages: updatedMessages })
    index += 3
    if (index >= responseText.length) {
      clearInterval(interval)
      sending.value = false
    }
  }, 40)
  await scrollToBottom()
}

const exportSession = () => {
  if (!store.activeSession) {
    return
  }
  const lines = store.activeSession.messages.map((message) => {
    return `**${message.role}**\n\n${message.content}`
  })
  const blob = new Blob([lines.join('\n\n---\n\n')], { type: 'text/markdown' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `session-${store.activeSession.id}.md`
  link.click()
  URL.revokeObjectURL(link.href)
}

const saveKeys = () => {
  if (!confirmLocal.value) {
    ElMessage.warning('请确认仅保存在本地浏览器')
    return
  }
  writeStorage('agent-keys', apiKeys)
  ElMessage.success('已保存')
}

const clearKeys = () => {
  Object.keys(apiKeys).forEach((key) => {
    apiKeys[key] = ''
  })
  writeStorage('agent-keys', apiKeys)
  ElMessage.success('已清空')
}

const testKey = (providerId: string) => {
  if (!apiKeys[providerId]) {
    ElMessage.warning('请先填写 Key')
    return
  }
  ElMessage.success(`已模拟测试 ${providerId} 连通性`) // placeholder for backend
}

watch(
  () => selectedProviderId.value,
  () => {
    const provider = providers.find((item) => item.id === selectedProviderId.value)
    if (provider) {
      selectedModel.value = provider.models[0]
      reasoning.value = false
      search.value = false
    }
  },
  { immediate: true }
)

watch(
  () => store.sessions,
  () => scrollToBottom()
)

ensureSession()

const draft = readStorage<string>('agent-draft', '')
if (draft) {
  input.value = draft
  writeStorage('agent-draft', '')
}
</script>

<style scoped>
.agent-layout {
  display: grid;
  gap: 20px;
  grid-template-columns: 260px 1fr 280px;
  align-items: start;
}

.agent-sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.provider-list,
.session-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.provider-card,
.session-card {
  cursor: pointer;
}

.provider-card.active,
.session-card.active {
  border-color: #1e6fff;
  box-shadow: 0 0 0 1px #1e6fff inset;
}

.agent-chat {
  min-height: 600px;
}

.agent-params {
  position: sticky;
  top: 88px;
}

.param-form {
  margin-top: 16px;
}

.full-width {
  width: 100%;
}

.chat-actions {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.message-meta {
  font-size: 12px;
  margin-top: 6px;
  color: #64748b;
}

.session-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-icon {
  margin-left: 6px;
}

.key-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

@media (max-width: 1200px) {
  .agent-layout {
    grid-template-columns: 1fr;
  }

  .agent-params {
    position: static;
  }
}
</style>
