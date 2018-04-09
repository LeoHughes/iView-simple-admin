<template>
  <Row type="flex" justify="center" class="code-row-bg">
    <i-col :xs="22" :sm="18" :md="12" :lg="8">
     <section class="formContent">
        <h2 class="title">Login</h2>
        <Form ref="formData" :model="formData" label-position="left" :rules="validate">
              <FormItem label="Account" prop="userName"> 
                <Row>
                  <Col span="24">
                    <Input v-model="formData.userName" type="text" placeholder="please enter account" :maxlength=10></Input>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="password" prop="passWord">
                <Row>
                  <Col span="24">
                    <Input v-model="formData.passWord" type="password" placeholder="please enter password" :maxlength=16></Input>
                  </Col>
                </Row>
              </FormItem>
              <Button type="primary" @click="formSumbit('formData')">Submit</Button>
              <Button type="ghost" @click="formRest" style="margin-left: 8px">Reset</Button>
      </Form>
    </section>
    </i-col>
  </Row>
</template>

<style lang="less" scoped>
.formContent {
  width: 100%;
  min-width: 300px;
  max-width: 700px;
  margin-top: 150px;
  padding:35px 0;
  .title{
    padding: 15px 0;
  }
}

</style>

<script>
import { mapActions } from 'vuex'

export default {
  name: "Login",
  data() {
    return {
      //表单数据
      formData: {
        userName: "",
        passWord: ""
      },
      //校验规则
      validate: {
        userName: [{ required: true, min: 6, message: "请输入用户名!" }],
        passWord: [{ required: true, min: 6, message: "请输入密码!" }]
      }
    };
  },
  methods: {
    ...mapActions(['login']),
    formSumbit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {

          // this.$store.dispatch("login", {
          //     userName: this.formData.userName,
          //     passWord: this.formData.passWord
          //   })
          //   .then(() => {
          //     this.$router.push({ path: "/" });
          //   });

          this.login({
              userName: this.formData.userName,
              passWord: this.formData.passWord
            })
            .then(() => {
              this.$router.push({ path: "/" });
            });

        }
      });
    },
    formRest() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
