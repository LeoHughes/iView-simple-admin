<template>
  <section>
    <Spin fix size="large" v-show="loading"></Spin>
    <Row :gutter="14">
      <Col span="24" class="text-left p-10">
      <RadioGroup v-model="type">
        <Radio label="unread">未读</Radio>
        <Radio label="read">已读</Radio>
      </RadioGroup>
      </Col>

      <Col span="4" v-for="(item,i) in messages" :key="i">
      <Card :class="{'read':type==='read'}">
        <p slot="title">{{ item.title }}</p>
        <a href="#" slot="extra" @click.prevent="showMessage(item)">详情</a>
        <p class="content">{{ item.detail }}</p>
      </Card>
      </Col>

      <Col span="24" class="text-center p-10-ud">
      <Page :current="page" :page-size="1" :total="messages.length" @on-change="turnPage"></Page>
      </Col>
    </Row>

    <Modal :value="showModal" @on-cancel="showModal = false">
      <p slot="header">{{ selectedMsg && selectedMsg.title }}</p>
      <div>
        {{ selectedMsg && selectedMsg.detail }}
      </div>
      <div slot="footer">
        <Button v-show="selectedMsg && selectedMsg.status === 0" type="primary" size="large" long @click="updateMessageStatus">已读</Button>
      </div>
    </Modal>
  </section>
</template>

<script>

import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Message",
  data() {
    return {
      loading: true,
      type: "unread",
      page: 1,
      showModal:false,
      selectedMsg:null
    };
  },
  computed: {
    ...mapGetters(["messages"])
  },
  beforeMount() {
    this.getMessages({
      type: this.type,
      page: this.page
    });
  },
  mounted() {
    this.loading = !this.loading;
  },
  watch: {
    type(val) {
      this.loading = !this.loading;

      this.getMessages({
        type: this.type,
        page: this.page
      });

      this.$nextTick(() => {
        setTimeout(() => {
          this.loading = !this.loading;
        }, 1000);
      });
    }
  },
  methods: {
    ...mapMutations(["clearMessages"]),
    ...mapActions(["getMessages"]),
    //翻页
    turnPage(page) {
      this.getMessages({
        type: this.type,
        page: page
      });
    },
    //查看消息详细
    showMessage(msg){
      this.showModal = true;
      this.selectedMsg = msg;
      console.log(msg);
    },
    //更新消息状态
    updateMessageStatus() {
      this.showModal = false;
      console.log(this.selectedMsg);

      //some update code
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.content {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.read {
  opacity: 0.6;
}
</style>
