<style lang="less" scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;

  .main {
    margin-left: 205px;

    &-collapse {
      margin-left: 80px;
      transition: margin 0.4s ease;
    }

    .tabs {
      width: 100%;
      padding: 10px;
      text-align: left;
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

      <div class="tabs">
          <Tag v-for="(item,i) in openTabs" :key="i" type="dot" closable :color="activeName === item.name ? 'blue':''" @click.native="changeTab(item)" @on-close="delTab(item,1)">{{ item.title }}
          </Tag>
      </div>

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
import MainContent from "@/components/main/Content";

export default {
  name: "Index",
  components: {
    SiderMenu,
    MainHeader,
    MainContent
  },
  data() {
    return {
      isSiderCollapsed: false //是否收起边栏
    };
  },
  computed: {
    ...mapGetters([
      "token",
      "userInfo",
      "menuItemList",
      "openTabs",
      "activeTab"
    ]),
    mainCss() {
      return ["main", this.isSiderCollapsed ? "main-collapse" : ""];
    },
    activeName() {
      return this.activeTab !== null ? this.activeTab.name : "";
    }
  },
  watch: {
    openTabs() {
      if (this.openTabs.length == 0) this.$router.push({ path: "/" });
    },
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
    //tab切换
    changeTab(tab) {
      this.updateActiveTab(tab);

      this.$router.push({path:tab.path});
    },
    //关闭已激活的tab
    delTab(tabObj, type) {
      this.updateOpenTabs({ tabObj, type });

      let path = this.activeTab !== null ? this.activeTab.path : '/';
      this.$router.push({path});
    },
    //增加激活的tab
    addTab(tabObj){
      this.$refs.siderMenu.updateTabs(tabObj, 0);
    }
  }
};
</script>
