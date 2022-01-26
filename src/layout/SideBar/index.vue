<template>
  <div
    :style="{height: `calc(100vh - 90px)`}"
    class="sidebar-container"
  >
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <SidebarItem
        v-for="route in constantRouterMap.filter(route => !route.hidden)"
        :ref="`submenu${route.path}`"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-scrollbar>
  </div>
</template>

<script>
import { constantRouterMap } from '@/router/index'
import SidebarItem from './SidebarItem'
export default {
  components: {
    SidebarItem
  },
  data() {
    return {
      constantRouterMap
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-container {
  // background: #ddd;
}
</style>
