<style lang="less" scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;

  .main{
    margin-left: 205px;

    &-collapse{
      margin-left: 80px;
      transition: margin 0.4s ease;
    }
  }
}
</style>

<template>
  <Layout class="layout">

    <!-- 侧边栏 -->
    <SiderMenu ref="siderMenu" :isSiderCollapsed="isSiderCollapsed" @changeSiderStatus="changeSiderCollapsed">
    </SiderMenu>
    <!-- 侧边栏 end-->

    <Layout :class="mainCss">
      <!-- 头部 -->
      <MainHeader :isSiderCollapsed="isSiderCollapsed" @toggleSiderMenu="toggleSiderMenu"></MainHeader>
      <!-- 头部 end-->

      <!-- content -->
      <MainContent></MainContent>
      <!-- content end-->
    </Layout>

  </Layout>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

import SiderMenu from "@/components/main/SiderMenu";
import MainHeader from "@/components/main/Header";
import MainContent from '@/components/main/Content';

export default {
  name: "Index",
  components: {
    SiderMenu,
    MainHeader,
    MainContent
  },
  data() {
    return {
      isSiderCollapsed: false, //是否收起边栏
    };
  },
  computed: {
    ...mapGetters(["token", "userInfo"]),
    mainCss() {
      return ["main", this.isSiderCollapsed ? "main-collapse" : ""];
    }
  },
  methods: {
    ...mapActions(["loginOut"]),
    changeSiderCollapsed() {
      this.isSiderCollapsed = !this.isSiderCollapsed;
    },
    //收起边栏
    toggleSiderMenu() {
      this.changeSiderCollapsed();
      this.$refs.siderMenu.toggleSider();
    }
  }
};
</script>
