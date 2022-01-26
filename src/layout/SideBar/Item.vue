<template>
  <div
    :class="{'is-active': active, 'is-open': visible}"
    class="menu-item-container"
    @click.stop="$emit('item-click')"
    @mouseenter.stop="$emit('item-mouse-enter')"
  >
    <i
      v-if="icon.includes('el-icon')"
      :class="[icon, 'menu-item-icon']"
    />
    <svg-icon
      v-else
      :icon-class="icon"
      class="menu-item-icon"
    />
    <div class="menu-item-title">{{ title }}</div>
    <i
      v-if="submenu && isNest"
      class="menu-item-arrow el-icon-arrow-right"
    />
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    submenu: {
      type: Boolean,
      default: false
    },
    isNest: {
      type: Boolean,
      default: false
    }
  }
  // render(h, context) {
  //   const { icon, title } = context.props
  //   const vnodes = []

  //   if (icon) {
  //     if (icon.includes('el-icon')) {
  //       vnodes.push(<i class={[icon, 'sub-el-icon']} />)
  //     } else {
  //       vnodes.push(<svg-icon icon-class={icon}/>)
  //     }
  //   }

  //   if (title) {
  //     vnodes.push(<span slot='title'>{(title)}</span>)
  //   }
  //   return vnodes
  // }
}
</script>

<style lang="scss" scoped>
@import '../../styles/index.scss';
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
.menu-item-container {
  width: 100%;
  height: 50px;
  line-height: 50px;
  display: flex;
  // flex-direction: column;
  align-items: center;
  cursor: pointer;
  .menu-item-icon {
    // margin-top: 16px;
    margin: 0 12px;
    // width: 20px;
    // height: 20px;
  }
  .menu-item-title {
    font-size: 14px;
  }
  &:hover {
    color: $--color-text-primary;
  }

  &.is-active,
  &.is-open.is-active {
    // color: $--color-text-primary;
    // background-color: $primary;
    color: $primary;
  }

  &.is-open {
    background-color: $--color-background-light;
    color: $--color-text-primary;
  }
}
</style>
