<template>
  <Row type="flex" justify="center" class="code-row-bg">
    <i-col :xs="22" :sm="18" :md="12" :lg="8">
     
     <section class="formContent">
         <h1 class="title">Login in Management</h1>
        <Form class="formBody" ref="formData" :model="formData" label-position="left" :rules="validate">
              <FormItem label="Account" prop="userName"> 
                <Row>
                  <Col span="24">
                    <Input v-model="formData.userName" type="text" size="large" placeholder="please enter account" :maxlength=10></Input>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="password" prop="passWord">
                <Row>
                  <Col span="24">
                    <Input v-model="formData.passWord" type="password" size="large" placeholder="please enter password" :maxlength=16></Input>
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
  margin-top: 160px;
  text-align: center;
  .formBody{
    background-color:#fff;
    display: inline-block;
    width: 340px;
    padding:25px 30px;
    border: 1px solid #d8dee2;
    border-radius: 4px;
    margin-top:35px;
  }

  .title{
    width: 100%;
    font-size: 24px;
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
