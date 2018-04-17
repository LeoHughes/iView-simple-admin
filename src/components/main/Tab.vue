<style lang="less" scoped>
.tabs-view {
  position: relative;
  width: 100%;
  height: 50px;

  .tabs{
    position: absolute;
    top:10px;
    left:10px;
    width: 100%;
    overflow-y: auto;
    text-align: left;
    white-space: nowrap;
  }
}
</style>

<template>
  <div class="tabs-view">
    <div class="tabs">
      <template v-for="(item,i) in openTabs">
        <Tag type="dot" :closable="item.path !== '/'" :color="activeName === item.title ? 'blue':''" @click.native="changeTab(item,$event)" @on-close="delTab(item,1)">
          {{ item.title }}
        </Tag>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Tab",
  data() {
    return {
      
    };
  },
  computed: {
    ...mapGetters(["openTabs", "activeTab"]),
    activeName() {
      return this.activeTab !== null ? this.activeTab.title : "";
    },
    
  },
  methods: {
    ...mapMutations(["updateOpenTabs", "updateActiveTab"]),
    //tab切换
    changeTab(tab,e) {
      if (tab.path === "/") {
        this.$router.push({ path: "/home" });
      } else {
        this.updateActiveTab(tab);
        this.$router.push({ path: tab.path });
      }
    },
    //关闭已激活的tab
    delTab(tabObj, type) {
      this.updateOpenTabs({ tabObj, type });

      let path = this.activeTab !== null ? this.activeTab.path : "/";
      this.$router.push({ path });
    }
  }
};
</script>