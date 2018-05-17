<template>
  <Row type="flex" justify="center" class="code-row-bg">
    <Col :lg="6">
    <div id="notFound">
      <CountDown></CountDown>
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
import CountDown from "@/components/main/CountDown";

export default {
  data() {
    return {
      title: "An error prompt 404 NOT FOUND",
      desc: "Page not found or Routing does not exist."
    };
  },
  components: {
    CountDown
  }
};
</script>

<style lang="less" scoped>
#notFound {
  text-align: left;
  margin-top: 150px;
}
</style>
