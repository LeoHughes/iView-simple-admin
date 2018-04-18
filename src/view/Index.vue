<style lang="less" scoped>
.layout {
  position: absolute;
  width: 100%;
  height:100%;
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  border-radius: 4px;
  overflow: hidden;

  .main {
    margin-left: 200px;

    &-collapse {
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
      <MainHeader :isSiderCollapsed="isSiderCollapsed" @toggleSiderMenu="toggleSiderMenu" @addTab="addTab"></MainHeader>
      <!-- 头部 end-->

      <!-- 导航tab -->
      <Tab></Tab>
      <!-- 导航tab end -->

      <!-- content -->
      <MainContent :isSiderCollapsed="isSiderCollapsed"></MainContent>
      <!-- content end-->
    </Layout>

  </Layout>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

import SiderMenu from "@/components/main/SiderMenu";
import MainHeader from "@/components/main/Header";
import Tab from '@/components/main/Tab'
import MainContent from "@/components/main/Content";

export default {
  name: "Index",
  components: {
    SiderMenu,
    MainHeader,
    Tab,
    MainContent
  },
  data() {
    return {
      isSiderCollapsed: false //是否收起边栏
    };
  },
  computed: {
    ...mapGetters(["token", "userInfo", "openTabs", "activeTab"]),
    mainCss() {
      return ["main", this.isSiderCollapsed ? "main-collapse" : ""];
    }
  },
  watch: {
    openTabs() {
      if (this.openTabs.length == 0) this.$router.push({ path: "/" });
    },
    $route(to) {
      let newTabObj = {
        path: to.path,
        name: to.name,
        title: to.meta.title,
        parentName: to.parentName
      };

      let inTabObj = this.openTabs.find(el => {
        return el.name === newTabObj.name;
      });

      if (!inTabObj) {
        this.$refs.siderMenu.updateTabs(newTabObj, 0);
      } else {
        this.updateActiveTab(inTabObj);
      }

      this.$refs.siderMenu.updateOpenedAndActiveName();
    }
  },
  methods: {
    ...mapMutations(["updateOpenTabs", "updateActiveTab"]),
    ...mapActions(["loginOut"]),
    changeSiderCollapsed() {
      this.isSiderCollapsed = !this.isSiderCollapsed;
    },
    //收起边栏
    toggleSiderMenu() {
      this.changeSiderCollapsed();
      this.$refs.siderMenu.toggleSider();
    },
    //增加激活的tab
    addTab(tabObj) {
      this.$refs.siderMenu.updateTabs(tabObj, 0);
    }
  }
};
</script>
