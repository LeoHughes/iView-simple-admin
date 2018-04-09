<template>
  <section class="formContent">
    <Form ref="formData" :model="formData" :label-width="150" label-position="right" :rules="validate">
      <FormItem label="账号" prop="userName">
        <Input v-model="formData.userName" type="text" placeholder="请输入账号" :maxlength=10></Input>
      </FormItem>
      <FormItem label="密码" prop="passWord">
        <Input v-model="formData.passWord" type="password" placeholder="请输入密码" :maxlength=16></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="formSumbit('formData')">Submit</Button>
        <Button type="ghost" @click="formRest" style="margin-left: 8px">Reset</Button>
      </FormItem>
    </Form>
  </section>
</template>

<style lang="less" scoped>
.formContent {
  padding: 32px;
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
