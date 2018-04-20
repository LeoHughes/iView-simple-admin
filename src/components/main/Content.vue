<style lang="less" scoped>
.content {
  position: absolute;
  top: 120px;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  left: 200px;
  transition: left 0.4s ease;
  
  &.mini{
    left: 80px;
  }
}
</style>

<template>
  <Content class="content" :class="{mini:isCollapsed}">
    <router-view></router-view>
  </Content>
</template>

<script>
export default {
  name: "MainContent",
    props: {
    isSiderCollapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed:{
    isCollapsed() {
      return this.isSiderCollapsed;
    },
  },
  mounted() {
    this.loading = !this.loading;
  },
  methods: {}
};
</script>