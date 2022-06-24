<template>
  <!-- 顶部通栏 -->
  <AppTopnav/>
  <!-- 吸顶头部 -->
  <AppHeaderSticky/>
  <!-- 头部组件 -->
  <AppHeader/>
  <!-- 内容容器 -->
  <div class="app-body">
    <!-- 二级路由 -->
    <RouterView :key="$route.fullPath" />
  </div>
  <!-- 底部组件 -->
  <AppFooter/>
  <div class="container"></div>
</template>
<script>
import AppTopnav from '@/components/app-topnav'
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
import AppHeaderSticky from '@/components/app-header-sticky.vue'

import { useStore } from 'vuex'
export default {
  name: 'Layout',
  components: { AppTopnav, AppHeader, AppFooter, AppHeaderSticky },
  // 获取下分类数据
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}

</script>
<style scoped lang="less">
.app-body {
  min-height: 600px;
}
</style>
