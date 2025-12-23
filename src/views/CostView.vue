<template>
  <section class="page-section">
    <div class="container">
      <div class="section-title">Token & 成本计算器</div>
      <el-card>
        <el-form label-position="top">
          <el-form-item label="单次 Token 数">
            <el-input-number v-model="tokens" :min="1" />
          </el-form-item>
          <el-form-item label="调用次数">
            <el-input-number v-model="calls" :min="1" />
          </el-form-item>
          <el-form-item label="单价（每 1K Tokens，USD）">
            <el-input-number v-model="price" :min="0" :step="0.01" />
          </el-form-item>
        </el-form>
        <div class="cost-result">
          <div>预计总 Token：{{ totalTokens }}</div>
          <div>预计总费用：$ {{ totalCost.toFixed(2) }}</div>
        </div>
        <el-alert
          title="降低成本建议"
          type="info"
          show-icon
          :closable="false"
          description="建议启用缓存、压缩提示词、对长内容先做摘要，并尽量复用系统提示词。"
        />
      </el-card>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const tokens = ref(1000)
const calls = ref(20)
const price = ref(0.03)

const totalTokens = computed(() => tokens.value * calls.value)
const totalCost = computed(() => (totalTokens.value / 1000) * price.value)
</script>

<style scoped>
.cost-result {
  margin: 16px 0;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
