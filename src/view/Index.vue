<style lang="less">

</style>

<template>
  <Layout class="layout">

    <!-- 侧边栏 -->
    <Sider ref="sider" collapsible hide-trigger :collapsed-width="80" breakpoint="md" :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">

      <!-- logo -->
      <div class="layout-logo"></div>
      <!-- logo end-->

      <Menu theme="dark" width="auto" :class="isCollapsed ? 'miniMenu':''"  @on-open-change="resetSider">
        <Submenu v-for="(item,index) in mainLeftMenu" :key="index" :name="item.name">
          <template slot="title">
            <Icon :type="item.icon"></Icon>
            <span>{{ item.title }}</span>
          </template>
          <router-link v-show="!isCollapsed" v-for="(child,index) in item.children" :key="index" :to="{path: child.path }">
            <MenuItem :name="child.name">{{ child.title }}</MenuItem>
          </router-link>
        </Submenu>
      </Menu>
    </Sider>
    <!-- 侧边栏 end-->

    <Layout :style="{marginLeft: isCollapsed ? '80px' : '205px',zIndex:999}">
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
import '@/style/Index.less'
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Index",
  data() {
    return {
      isCollapsed: false, //是否收起边栏
    };
  },
  computed: {
    ...mapGetters(["token", "userInfo", "mainLeftMenu"])
  },
  beforeMount() {
    this.$Spin.show();
    this.getMainLeftMenu(this.token);
  },
  updated() {
    this.$Spin.hide();
  },
  methods: {
    ...mapActions(["getMainLeftMenu", "loginOut"]),
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
    resetSider(){
      if(this.isCollapsed){
        this.toggleSider();
      }
    }
  }
};
</script>
