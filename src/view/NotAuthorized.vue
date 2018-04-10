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
        title:"An error prompt 403 NOT AUTHORIZIZED",
        desc:'You don\'t have access to visit.'
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
