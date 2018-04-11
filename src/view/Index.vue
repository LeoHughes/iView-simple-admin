<style lang="less">

</style>

<template>
  <Layout class="layout">

    <!-- 侧边栏 -->
    <Sider ref="sider" collapsible hide-trigger :collapsed-width="80" breakpoint="md" :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">

      <!-- logo -->
      <div class="layout-logo"></div>
      <!-- logo end-->

      <Menu ref="leftMenu" accordion :open-names="[activeName]" :active-name="$route.name" theme="dark" width="auto" :class="isCollapsed ? 'miniMenu':''" @on-open-change="resetSider">
        <Submenu v-for="(item,i) in mainLeftMenu" :key="i" :name="item.name">
          <template slot="title">
            <Icon :type="item.icon"></Icon>
            <span>{{ item.title }}</span>
          </template>
          <router-link v-show="!isCollapsed" v-for="(child,i) in item.children" :key="i" :to="{path: child.path }">
            <MenuItem :name="child.name" @click.native="addTabs(child)">{{ child.title }}</MenuItem>
          </router-link>
        </Submenu>
      </Menu>
    </Sider>
    <!-- 侧边栏 end-->

    <Layout :class="mainCss">
      <!-- 头部 -->
      <Header class="layout-header-bar">
        <div class="collapsible-icon">
          <Icon :type="isCollapsed ? 'chevron-left' : 'chevron-right'" size="16" @click.native="toggleSider"></Icon>
        </div>

        <Dropdown class="header-control">
          <a href="javascript:void(0)">
            {{ userInfo.roleName }}
            <Icon type="arrow-down-b"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem>个人中心</DropdownItem>
            <DropdownItem>
              <p @click="userLoginOut">退出</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Header>
      <!-- 头部 end-->

      <!-- content -->
      <Content :style="{padding:'10px'}">
        <Row>
          <Col span="24">
          <router-link v-for="(item,i) in openTabs" :key="i" :to="{path:item.path}">
            <Tag type="dot" closable color="blue" @click.native="updateTab(item)">{{ item.title }}</Tag>
          </router-link>
          </Col>
        </Row>

        <Card>
          <div>
            <router-view></router-view>
          </div>
        </Card>
      </Content>
      <!-- content end-->
    </Layout>

  </Layout>
</template>

<script>
import "@/style/Index.less";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Index",
  data() {
    return {
      isCollapsed: false //是否收起边栏
    };
  },
  computed: {
    ...mapGetters([
      "token",
      "userInfo",
      "mainLeftMenu",
      "openTabs",
      "activeTab"
    ]),
    mainCss() {
      return ["main", this.isCollapsed ? "main-collapse" : ""];
    },
    activeName() {
      return this.activeTab !== null ? this.activeTab.parentName : "";
    }
  },
  beforeMount() {
    this.$Spin.show();
    //获取左侧菜单
    this.getMainLeftMenu(this.token);
  },
  updated() {
    //默认展开左侧第一个菜单项第一个子页面
    if (this.mainLeftMenu && this.mainLeftMenu.length !== 0) {
      this.addTabs(this.mainLeftMenu[0].children[0]);
    }
  },
  mounted() {
    setTimeout(() => {
      this.$Spin.hide();
    }, 1000);
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
  methods: {
    ...mapActions(["getMainLeftMenu", "loginOut"]),
    ...mapMutations(["updateOpenTabs", "updateActiveTab"]),
    //登出
    userLoginOut() {
      this.loginOut();
      this.$router.push({ path: "/login" });
    },
    //收起边栏
    toggleSider() {
      this.$refs.sider.toggleCollapse();
      this.isCollapsed = !this.isCollapsed;
    },
    //边栏收起状态下点击菜单图标则展开
    resetSider() {
      if (this.isCollapsed) {
        this.toggleSider();
      }
    },
    //增加激活左侧子菜单tab数据
    addTabs(tabObj) {
      this.updateOpenTabs({ type: 0, tabObj });
      this.updateTab(tabObj);
    },
    //更新当前激活tab数据
    updateTab(activeObj) {
      this.updateActiveTab(activeObj);
    }
  }
};
</script>
