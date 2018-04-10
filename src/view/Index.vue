<style lang="less">
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;

  &-logo {
    width: 100%;
    height: 80px;
    background: #000;
    border-radius: 3px;
  }

  &-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  }
}
</style>

<template>
  <Layout class="layout">

    <!-- 侧边栏 -->
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">

      <div class="layout-logo"></div>

      <Menu theme="dark" width="auto">
        <Submenu v-for="(item,index) in mainLeftMenu" :key="index" :name="item.name">
          <template slot="title">
            <Icon :type="item.type"></Icon>
            {{ item.title }}
          </template>
          <router-link v-for="(child,index) in item.children" :key="index" :to="{path: child.path }">
            <MenuItem :name="child.name">{{ child.title }}</MenuItem>
          </router-link>
        </Submenu>
      </Menu>
    </Sider>
    <!-- 侧边栏 end-->

    <Layout :style="{marginLeft: '205px'}">
      <!-- 头部 -->
      <Header class="layout-header-bar">
        <Row type="flex" justify="end">
          <Col span="4">
          <Dropdown>
            <a href="javascript:void(0)">
              {{ userInfo.userName }}
              <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem>个人中心</DropdownItem>
              <DropdownItem>退出</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          </Col>
        </Row>
      </Header>
      <!-- 头部 end-->

      <!-- content -->
      <Content>
        <Card>
          <div :style="{height: '90vh'}">
            <router-view></router-view>
          </div>
        </Card>
      </Content>
      <!-- content end-->
    </Layout>

  </Layout>
</template>

<script>
import { mapGetters,mapActions } from "vuex";

export default {
  name: "Index",
  data() {
    return {
     
    };
  },
  computed: {
    ...mapGetters(['token','userInfo','mainLeftMenu'])
  },
  
  beforeMount(){
    this.$Spin.show()
    this.getMainLeftMenu(this.token)
  },
  updated(){
    this.$Spin.hide()
  },
  methods:{
    ...mapActions(['getMainLeftMenu']),
  }
};
</script>
