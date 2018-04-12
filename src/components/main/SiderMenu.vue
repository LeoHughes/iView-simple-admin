<style lang="less">

</style>

<template>
  <!-- 侧边栏 -->
  <Sider ref="sider" collapsible hide-trigger :collapsed-width="80" breakpoint="md" :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">

    <!-- logo -->
    <div class="layout-logo"></div>
    <!-- logo end-->

    <Menu ref="leftMenu" accordion :open-names="[activeName]" :active-name="$route.name" theme="dark" width="auto" :class="isCollapsed ? 'miniMenu':''">

      <Submenu v-for="(item,i) in mainLeftMenu" :key="i" :name="item.name">
        <template slot="title">
          <Icon :type="item.icon"></Icon>
          <span>{{ item.title }}</span>
        </template>
        <router-link v-show="!isCollapsed" v-for="(child,i) in item.children" :key="i" :to="{path: child.path }">
          <MenuItem :name="child.name">{{ child.title }}</MenuItem>
        </router-link>
      </Submenu>

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
      this.$emit("changeSiderStatus");

      this.toggleSider();
    }
  }
};
</script>