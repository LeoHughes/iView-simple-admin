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

      <Menu theme="dark" active-name="1-1" width="auto" :open-names="['1']">
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            Item 1
          </template>
          <router-link :to="{path:'/test'}">
            <MenuItem name="Test">Test</MenuItem>
          </router-link>
          <MenuItem name="1-2">Option 2</MenuItem>
          <MenuItem name="1-3">Option 3</MenuItem>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-keypad"></Icon>
            Item 2
          </template>
          <MenuItem name="2-1">Option 1</MenuItem>
          <MenuItem name="2-2">Option 2</MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-analytics"></Icon>
            Item 3
          </template>
          <MenuItem name="3-1">Option 1</MenuItem>
          <MenuItem name="3-2">Option 2</MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <!-- 侧边栏 end-->

    <Layout :style="{marginLeft: '205px'}">
      <!-- 头部 -->
      <Menu mode="horizontal" active-name="1" :style="{width:'100%'}">
        <div class="layout-nav">
          <MenuItem name="1">
          <Icon type="ios-navigate"></Icon>
          Item 1
          </MenuItem>
          <MenuItem name="2">
          <Icon type="ios-keypad"></Icon>
          Item 2
          </MenuItem>
          <MenuItem name="3">
          <Icon type="ios-analytics"></Icon>
          Item 3
          </MenuItem>
          <MenuItem name="4">
          <Icon type="ios-paper"></Icon>
          Item 4
          </MenuItem>
        </div>
      </Menu>
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
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
  data(){
    return {

    }
  },
  computed:{
    ...mapGetters(['roles'])
  }
}
</script>
