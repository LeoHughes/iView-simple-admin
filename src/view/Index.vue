<style lang="less">

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
import "@/style/Index.less";
import { mapGetters, mapMutations, mapActions } from "vuex";

import SiderMenu from "@/components/main/SiderMenu";
import MainHeader from '@/components/main/Header';

export default {
  name: "Index",
  components: {
    SiderMenu,
    MainHeader
  },
  data() {
    return {
      isSiderCollapsed: false //是否收起边栏
    };
  },
  computed: {
    ...mapGetters(["token", "userInfo"]),
    mainCss() {
      return ["main", this.isSiderCollapsed ? "main-collapse" : ""];
    }
  },
  beforeMount() {
    this.$Spin.show();
  },
  mounted() {
    setTimeout(() => {
      this.$Spin.hide();
    }, 1000);
  },
  methods: {
    ...mapActions(["loginOut"]),
    //收起边栏
    toggleSiderMenu() {
      this.changeSiderCollapsed();
      this.$refs.siderMenu.toggleSider();
    },
    changeSiderCollapsed() {
      this.isSiderCollapsed = !this.isSiderCollapsed;
    }
  }
};
</script>
