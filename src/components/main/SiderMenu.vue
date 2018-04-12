<style lang="less" scoped>
.logo {
  width: 100%;
  height: 80px;
  background: #000;
  border-radius: 3px;
}

.miniMenu {
  .title {
    display: none;
    transition: display 0.2s ease;
  }
}
</style>

<template>
  <!-- 侧边栏 -->
  <Sider ref="sider" collapsible hide-trigger :collapsed-width="80" breakpoint="md" :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">

    <!-- logo -->
    <div class="logo"></div>
    <!-- logo end-->

    <Menu ref="leftMenu" accordion :open-names="[activeName]" :active-name="$route.name" theme="dark" width="auto" :class="isCollapsed ? 'miniMenu':''" @on-select="resetSider">

      <template v-if="!isCollapsed">
        <Submenu v-for="(item,i) in mainLeftMenu" :key="i" :name="item.name">
          <template slot="title">
            <Icon :type="item.icon"></Icon>
            <span class="title">{{ item.title }}</span>
          </template>
          <router-link v-for="(child,i) in item.children" :key="i" :to="{path: child.path }">
            <MenuItem v-show="!isCollapsed" :name="child.name" @click.native="addOpenTab(child)">{{ child.title }}</MenuItem>
          </router-link>
        </Submenu>
      </template>

      <template v-else>
        <MenuItem v-for="(item,i) in mainLeftMenu" :key="i" :name="item.name">
        <Icon :type="item.icon"></Icon>
        </MenuItem>
      </template>

    </Menu>

  </Sider>
</template>

<script>
import { Menu } from "iview";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "SiderMenu",
  props: {
    isSiderCollapsed: {
      type: Boolean, //是否收起边栏
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["mainLeftMenu", "openTabs", "activeTab"]),
    isCollapsed() {
      return this.isSiderCollapsed;
    },
    mainCss() {
      return ["main", this.isCollapsed ? "main-collapse" : ""];
    },
    activeName() {
      return this.activeTab !== null ? this.activeTab.parentName : "";
    }
  },
  watch: {
    activeName() {
      //左侧菜单展开
      this.$nextTick(() => {
        this.$refs.leftMenu.updateOpened();
        this.$refs.leftMenu.updateActiveName();
      });
    }
  },
  beforeMount() {
    //获取菜单数据
    this.getMainLeftMenu();
  },
  methods: {
    ...mapMutations(["updateOpenTabs", "updateActiveTab"]),
    ...mapActions(["getMainLeftMenu"]),
    //收起边栏
    toggleSider() {
      this.$refs.sider.toggleCollapse();
    },
    //边栏收起状态下点击菜单图标则展开
    resetSider() {
      if (this.isCollapsed) {
        this.$emit("changeSiderStatus");
        this.toggleSider();
      }
    },
    addOpenTab(tabObj){
      this.updateOpenTabs({type:0,tabObj})
    }
  }
};
</script>