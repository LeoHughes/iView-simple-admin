<template>
  <section>
    <Spin fix size="large" v-show="loading"></Spin>
    <Row :gutter="14">
      <Col span="24" :style="{textAlign:'left',padding:'10px'}">
        <RadioGroup v-model="type" type="button">
          <Radio label="unread">未读</Radio>
          <Radio label="read">已读</Radio>
        </RadioGroup>
      </Col>

      <Col span="4" v-for="(item,i) in messages" :key="i" :class="{'read':type==='read'}">
        <Card>
          <p slot="title">
            <Checkbox v-show="type === 'unread'" :label="item.id" @on-change="updateMessageStatus"></Checkbox>
            {{ item.title }}
          </p>
          <p>{{ item.detail }}</p>
        </Card>
      </Col>

      <Col span="24" :style="{textAlign:'center',padding:'10px 0'}">
        <Page :current="page" :page-size="1" :total="messages.length" @on-change="turnPage"></Page>
      </Col>
    </Row>
  </section>
</template>

<script>
import { mapGetters,mapMutations,mapActions } from "vuex";

export default {
  name: "Message",
  data() {
    return {
      loading:true,
      type: 'unread',
      page:1,
      total:1
    };
  },
  computed: {
    ...mapGetters(["messages"])
  },
  beforeMount() {
    this.getMessages({
      type:this.type,
      page:this.page
    });
  },
  mounted(){
    this.loading = !this.loading;
  },
  watch:{
    type(val){

      this.loading = !this.loading;

      this.getMessages({
        type:this.type,
        page:this.page
      });

      this.$nextTick(() => {
        setTimeout(() => {
          this.loading = !this.loading;
        },1000)
      })
    }
  },
  methods:{
    ...mapMutations(['clearMessages']),
    ...mapActions(['getMessages']),
    //翻页
    turnPage(page){
      this.getMessages({
        type:this.type,
        page:page
      });
    },
    updateMessageStatus(v){
      console.log(v);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.read{
  opacity: 0.6;
}
</style>
