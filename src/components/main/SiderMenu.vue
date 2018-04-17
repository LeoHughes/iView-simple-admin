<style lang="less" scoped>
.logo {
  width: 100%;
  height: 80px;
  padding: 10px 0;
  background: transparent;
  border-radius: 3px;

  img {
    max-width: 100%;
    max-height: 100%;
  }

  &.mini {
    height: 40px;
    padding: 5px 0;
  }
}
</style>

<template>
  <!-- 侧边栏 -->
  <Sider ref="sider" collapsible hide-trigger :collapsed-width="80" breakpoint="md" :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
    <Spin fix v-if="loading"></Spin>

    <!-- logo -->
    <div class="logo" :class="{mini:isCollapsed}">
      <img src="@/assets/images/logo.png" alt="">
    </div>
    <!-- logo end-->

    <Menu ref="leftMenu" v-show="!isCollapsed && !loading" :open-names="[activeMenuName]" :active-name="activeMenuItemName" theme="dark" width="auto" @on-select="resetSider">

      <Submenu v-for="(item,i) in mainLeftMenu" :key="i" :name="item.name">
        <template slot="title">
          <Icon :type="item.icon"></Icon>
          <span class="title">{{ item.title }}</span>
        </template>
          <MenuItem v-show="!isCollapsed" v-for="(child,i) in item.children" :key="i" :name="child.name" @click.native="updateTabs(child,0)">{{ child.title }}</MenuItem>
      </Submenu>

    </Menu>

    <Menu ref="leftMenuMini" v-show="isCollapsed && !loading" accordion :active-name="activeMenuName" theme="dark" width="auto" :class="isCollapsed ? 'miniMenu':''" @on-select="resetSider">

      <MenuItem v-for="(item,i) in mainLeftMenu" :key="i" :name="item.name">
      <Icon :type="item.icon"></Icon>
      </MenuItem>

    </Menu>

  </Sider>
</template>

<script>
import _ from "lodash";
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
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters(["mainLeftMenu", "openTabs", "activeTab"]),
    isCollapsed() {
      return this.isSiderCollapsed;
    },
    activeMenuName() {
      return this.activeTab !== null ? this.activeTab.parentName : "";
    },
    activeMenuItemName() {
      return this.activeTab !== null ? this.activeTab.name : this.$route.name;
    }
  },
  watch: {
    activeTab() {
      //左侧菜单展开
      this.$nextTick(() => {
        this.updateOpenedAndActiveName();
      });
    }
  },
  async beforeMount() {
    //获取菜单数据
    await this.getMainLeftMenu();

    if (!this.mainLeftMenu || this.mainLeftMenu.length === 0) {
      this.$Notice.error({
        title: "错误信息",
        desc: "获取左侧菜单失败,请稍后再试",
        duration: 2,
        onClose: () => {
          this.$router.push({ path: "/login" });
          this.clearUserInfo();
        }
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.loading = !this.loading;
      }, 1500);
    });
  },
  methods: {
    ...mapMutations(["clearUserInfo", "updateOpenTabs", "updateActiveTab"]),
    ...mapActions(["getMainLeftMenu"]),
    //收起边栏
    toggleSider() {
      this.$refs.sider.toggleCollapse();
    },
    //更新边栏菜单选中和打开状态
    updateOpenedAndActiveName() {
      if (this.isCollapsed) {
        this.$refs.leftMenuMini.updateOpened();
        this.$refs.leftMenuMini.updateActiveName();
      }

      this.$refs.leftMenu.updateOpened();
      this.$refs.leftMenu.updateActiveName();
    },
    //边栏收起状态下点击菜单图标则展开
    resetSider() {
      if (this.isCollapsed) {
        this.$emit("changeSiderStatus");
        this.toggleSider();
      }
    },
    //增加激活菜单tab
    updateTabs(tabObj, type) {
      this.$router.push({path:tabObj.path});

      this.updateOpenTabs({ type, tabObj });
      this.updateActiveTab(tabObj);
    }
  }
};
</script>