<template>
  <div>
    <header class="main-header">
      <div class="container header-content">
        <div class="logo">Agent 超级AI</div>
        <nav class="nav-links">
          <RouterLink v-for="item in navItems" :key="item.path" :to="item.path">
            {{ item.label }}
          </RouterLink>
        </nav>
        <el-button class="mobile-menu" link @click="drawerOpen = true">
          <el-icon><Menu /></el-icon>
        </el-button>
      </div>
    </header>

    <el-drawer v-model="drawerOpen" direction="rtl" size="70%">
      <template #header>
        <strong>导航</strong>
      </template>
      <div class="drawer-links">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          @click="drawerOpen = false"
        >
          {{ item.label }}
        </RouterLink>
      </div>
    </el-drawer>

    <main>
      <RouterView />
    </main>

    <footer class="footer">
      <div class="container">
        <div class="flex-between">
          <div>
            <strong>免责声明：</strong>资讯来源于公开渠道，内容仅供参考，不构成投资建议。
          </div>
          <div>版本 v0.1 · 联系方式：hello@agent-ai.io · GitHub</div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu } from '@element-plus/icons-vue'

const drawerOpen = ref(false)
const navItems = [
  { path: '/', label: '首页' },
  { path: '/news', label: '每日AI资讯' },
  { path: '/agent', label: 'Agent超级AI' },
  { path: '/tools', label: '工具导航' },
  { path: '/prompts', label: 'Prompt工坊' },
  { path: '/compare', label: '模型对比' },
  { path: '/cost', label: '成本计算' },
  { path: '/about', label: '关于我们' }
]
</script>

<style scoped>
.main-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #ffffffcc;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #e2e8f0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
}

.logo {
  font-weight: 700;
  color: #1e6fff;
  font-size: 18px;
}

.nav-links {
  display: flex;
  gap: 16px;
}

.nav-links a {
  color: #3d4d66;
  font-weight: 500;
}

.nav-links a.router-link-active {
  color: #1e6fff;
}

.mobile-menu {
  display: none;
}

.drawer-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.drawer-links a {
  font-size: 16px;
  color: #1b1f2a;
}

@media (max-width: 900px) {
  .nav-links {
    display: none;
  }

  .mobile-menu {
    display: inline-flex;
  }
}
</style>
