<template>
  <section class="page-section">
    <div class="container">
      <div class="section-title">全球 AI 工具导航</div>
      <p class="muted">支持分类筛选、搜索与收藏，收藏内容仅保存在本地浏览器。</p>
      <ToolGallery />
    </div>
  </section>
</template>

<script setup lang="ts">
import ToolGallery from '../components/ToolGallery.vue'
</script>

<style scoped>
.muted {
  color: #6b7280;
  margin-bottom: 16px;
}
</style>
