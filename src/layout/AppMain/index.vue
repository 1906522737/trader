<template>
  <section class="app-body__container">
    <!-- <keep-alive> -->
    <router-view />
    <!-- </keep-alive> -->
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.app-body__container {
  min-height: calc(100% - 37px);
  // background: #ccc;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 0 5px 5px 5px;
}
</style>
