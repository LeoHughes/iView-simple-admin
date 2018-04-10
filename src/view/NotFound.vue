<template>
<Row type="flex" justify="center" class="code-row-bg">
  <Col :lg="6">
    <div id="notFound">
      <countDown></countDown>
      <Alert type="error" show-icon>
            {{title}}
            <span slot="desc">
                {{desc}}
            </span>
        </Alert>
    </div>
  </Col>
</Row>
</template>

<script>
  import countDown from './countDown.vue'

  export default {
    data(){
      return{
        title:"An error prompt 404 NOT FOUND",
        desc:'Page not found or Routing does not exist.'
      }
    },
    components:{
      countDown
    }
  }
</script>

<style lang="less" scoped>
  #notFound{
    text-align: left;
    margin-top: 150px;
  }
</style>
