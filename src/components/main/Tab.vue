<style lang="less" scoped>
@import url("../../assets/style/variable.less");

.tabs-view {
  position: relative;
  width: 100%;
  height: 50px;
  overflow: hidden;

  .tabs {
    position: absolute;
    top: 10px;
    left: 40px;
    right: 40px;
    text-align: left;
    white-space: nowrap;
    z-index: 5;
  }

  .jump {
    position: absolute;
    background-color: @layout-bg;
    z-index: 9;
    &:hover,
    &:focus {
      box-shadow: none;
      color: @dark;
    }

    &.pre {
      top: 10px;
      left: 0;
    }

    &.next {
      top: 10px;
      right: 0;
    }
  }
}
</style>

<template>
  <div ref="tabsView" class="tabs-view">
    <Button class="jump pre" type="text" icon="ios-arrow-left" size="large" @click="pre"></Button>

    <div ref="tabs" class="tabs" :style="{left:tabsLeft+'px',transition:'left 1s ease'}">
        <Tag ref="tagOpened" v-for="(item,i) in openTabs" :key="item.name+i" :name="item.name" type="dot" :closable="item.path !== '/'" :color="activeName === item.title ? 'blue':''" @click.native="changeTab(item)" @on-close="delTab(item,1)">
          {{ item.title }}
        </Tag>
    </div>

    <Button class="jump next" type="text" icon="ios-arrow-right" size="large" @click="next"></Button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Tab",
  data() {
    return {
      tabsLeft: 40,
      tagRefs: [],
      visiableWidth:0
    };
  },
  computed: {
    ...mapGetters(["openTabs", "activeTab"]),
    activeName() {
      return this.activeTab !== null ? this.activeTab.title : "";
    }
  },
  mounted() {
    this.tagRefs = this.$refs.tagOpened;
    this.visiableWidth = this.$refs.tabsView.clientWidth -40;
  },
  watch: {
    $route(to){
      let routerObj = {
        name:to.name,
        path:to.path,
        title:to.meta.title
      }
      this.moveTo(routerObj);
    }
  },
  methods: {
    ...mapMutations(["updateOpenTabs", "updateActiveTab"]),
    //tab切换
    changeTab(tab) {
      if (tab.path === "/") {
        this.$router.push({ path: "/home" });
      } else {
        this.updateActiveTab(tab);
        this.$router.push({ path: tab.path });
      }

      this.moveTo(tab);
    },
    //关闭已激活的tab
    delTab(tabObj, type) {
      this.updateOpenTabs({ tabObj, type });

      let path = this.activeTab !== null ? this.activeTab.path : "/";
      this.$router.push({ path });
    },
    moveTo(tab) {
      // let scrollWidth = this.$refs.tabs.scrollWidth;

      // let { $el } = this.tagRefs.find(item => {
      //   return item.name === tab.name;
      // });

      // let offsetLeft = $el.offsetLeft;

      // let preOffsetLeft = $el.previousSibling !== null ? $el.previousSibling.clientWidth : 40;

      // let moveLeft = offsetLeft - preOffsetLeft;

      // if(offsetLeft >= (this.visiableWidth - $el.clientWidth)){

      //   this.tabsLeft = moveLeft === 0 || moveLeft < 50 ? 40 : -moveLeft;

      // }else{

      //   this.tabsLeft = 40;

      // }

    },
    pre(){
      this.tabsLeft =  40;
    },
    next(){
      let scrollWidth = this.$refs.tabs.scrollWidth;
      this.tabsLeft = -(scrollWidth - this.visiableWidth)
    }
  }
};
</script>