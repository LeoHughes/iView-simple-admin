<style lang="less" scoped>
.content {
  position: relative;
  padding: 10px;
  min-height: 50vh;
}
</style>

<template>
  <Content class="content">
    <Card dis-hover>
      <router-view></router-view>
    </Card>
  </Content>
</template>

<script>
export default {
  name: "MainContent",
  data() {
    return {
      
    };
  },
  mounted(){
    this.loading = !this.loading;
  },
  methods: {}
};
</script>