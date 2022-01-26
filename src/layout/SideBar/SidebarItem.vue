<template>
  <div v-if="!item.hidden">
    <template v-if="isShowChild">
      <app-link
        v-if="onlyOneChild.meta"
        :to="resolvePath(onlyOneChild.path)"
      >

        <item
          :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
          :title="onlyOneChild.meta.title"
          :active="isActive"
          :submenu="false"
          :is-nest="isNest"
          @item-click="handleLinkClick"
          @item-mouse-enter="handleLinkMouseEnter"
        />

      </app-link>
    </template>

    <div v-else>
      <el-popover
        ref="subMenu"
        v-model="visible"
        :index="resolvePath(item.path)"
        :visible-arrow="false"
        popper-class="sidebar-submenu-popper"
        placement="right-start"
        trigger="manual"
        width="140"
        transition="fade-quick"
      >
        <div class="submenu-container">
          <sidebar-item
            v-for="child in item.children"
            :key="child.path"
            :ref="`submenu${child.path}`"
            :is-nest="true"
            :item="child"
            :base-path="resolvePath(child.path)"
            class="nest-menu"
            @close-other-menu="handleCloseOtherMenu"
          />
        </div>
        <template slot="reference">
          <item
            v-if="item.meta"
            :icon="item.meta && item.meta.icon"
            :title="item.meta.title"
            :active="isActive"
            :visible="visible"
            :submenu="true"
            :is-nest="isNest"
            @item-click="handleMenuClick"
            @item-mouse-enter="handleMenuMouseEnter"
          />
        </template>
      </el-popover>

    </div>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {
      visible: false,
      closeTimer: null
    }
  },
  computed: {
    isActive() {
      // 单独处理根目录
      if (this.item.path === '/' && this.item.children.length > 0) {
        return this.resolvePath(this.item.children[0].path) === this.$route.path
      }

      return this.$route.path.startsWith(this.basePath)
    },

    isShowChild() {
      return (
        this.hasOneShowingChild(this.item.children, this.item) &&
        (!this.onlyOneChild.children || this.onlyOneChild.noShowingChildren) &&
        !this.item.alwaysShow
      )
    }
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }

      return path.join(this.basePath, routePath)
    },

    /* menu oper */
    menuOpen() {
      if (this.isNest) {
        if (this.$parent.showPopper) {
          this.visible = true
          this.closeOtherMenus()
        }
      } else {
        this.visible = true
        this.closeOtherMenus()
      }
    },

    menuClose() {
      if (this.item.children) {
        this.item.children.forEach(child => {
          if (child.children) {
            if (
              this.$refs[`submenu${child.path}`] &&
              this.$refs[`submenu${child.path}`].length > 0 &&
              this.$refs[`submenu${child.path}`][0].menuClose
            ) {
              this.$refs[`submenu${child.path}`][0].menuClose()
            }
          }
        })
      }

      this.visible = false
    },

    closeOtherMenus() {
      this.$emit('close-other-menu', this.item)
    },

    handleCloseOtherMenu(menu) {
      if (menu) {
        this.item.children
          .filter(route => !route.hidden && route.path !== menu.path)
          .forEach(child => {
            if (
              this.$refs[`submenu${child.path}`] &&
              this.$refs[`submenu${child.path}`].length > 0 &&
              this.$refs[`submenu${child.path}`][0].menuClose
            ) {
              this.$refs[`submenu${child.path}`][0].menuClose()
            }
          })
      }
    },

    /* evetn proxy */
    handleMenuClick() {
      if (this.isNest) {
        this.handleSubMenuClick()
      } else {
        this.handleMainMenuClick()
      }
    },

    handleMenuMouseEnter() {
      if (this.isNest) {
        this.handleSubMenuMouseEnter()
      } else {
        this.handleMainMenuMouseEnter()
      }
    },

    handleLinkClick() {
      if (this.isNest) {
        this.handleSubLinkClick()
      } else {
        this.handleMainLinkClick()
      }
    },

    handleLinkMouseEnter() {
      if (this.isNest) {
        this.handleSubLinkMouseEnter()
      } else {
        this.handleMainLinkMouseEnter()
      }
    },

    /* main oper */
    handleMainMenuClick() {
      if (this.visible) {
        this.menuClose()
      } else {
        this.menuOpen()
      }
    },
    handleMainMenuMouseEnter() {
      /* do nothing */
    },
    handleMainLinkClick() {
      this.closeOtherMenus()
    },
    handleMainLinkMouseEnter() {
      /* do nothing */
    },

    /* sub oper */
    handleSubMenuClick() {
      /* do nothing */
    },
    handleSubMenuMouseEnter() {
      this.menuOpen()
    },
    handleSubLinkClick() {
      /* do nothing */
    },
    handleSubLinkMouseEnter() {
      this.closeOtherMenus()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/index.scss';
a {
  position: relative;
}
::v-deep {
  .el-badge {
    position: absolute;
    top: 0.7em;
    left: 10.2em;
  }
  .trad-count {
    position: absolute;
    top: 0.8em;
    left: 9.2em;
  }
  .grid-count {
    position: absolute;
    top: 13em;
    left: 2.1em;
  }
  .el-badge__content {
    border: none;
    color: $--color-text-primary;
  }
}
</style>
