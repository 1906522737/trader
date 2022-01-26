<template>
  <el-container class="app-container">
    <el-header class="app-container__header">
      <AppHeader />
    </el-header>

    <el-container class="app-container__body">
      <el-aside
        class="app-container-body__aside"
        width="60px"
      >
        <AppSidebar ref="sideBar" />
      </el-aside>
      <el-main class="app-container-body__main">
        <AppMain ref="appMain" />
      </el-main>
    </el-container>
    <el-footer
      :height="`30px`"
      class="app-container__footer"
    >
      <AppFooter />
    </el-footer>
  </el-container>
</template>

<script>
import AppHeader from './Header'
import AppSidebar from './Sidebar'
import AppMain from './AppMain'
import AppFooter from './Footer'
export default {
  components: {
    AppHeader,
    AppMain,
    AppSidebar,
    AppFooter
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
.app-container {
  background: $--color-background-dark;
  width: 100%;
  height: 100%;
  color: $--color-text-regular;
  overflow: hidden;

  .app-container-body__aside {
    background: $--color-background-darker;
    transition: width 0.4s;
    position: relative;
    margin-right: 2px;
    height: 100%;
  }

  .app-container__header {
    background: $--color-background-base;
    padding: 2px;
  }
  .app-container__body {
    height: calc(100% - 90px);
    display: flex;
    overflow: hidden;
  }
  .app-container-body__main {
    padding: 0;
    height: 100%;
    width: 100%;
    background: $--color-background-dark;
  }

  .app-container__footer {
    background: $--color-background-light;
    padding: 0;
  }
}
</style>
